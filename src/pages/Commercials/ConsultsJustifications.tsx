import { Message, useToaster } from "rsuite";
import FileDownloadIcon from '@rsuite/icons/FileDownload';

import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi, useApiDownload } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { DateToString } from "../../services/Date";
import { ColumnsInterface, DeliveryHistoryInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Global/Panel";
import { MainMessage } from "../../components/Global/Message";
import { MainTable } from "../../components/Global/Table";
import { ConsultJustification } from "../../components/ConsultJustification";

import FileDownload from 'js-file-download';

interface Filter {
    date_emission: any;
    date_emission__gte: any;
    date_emission__lte: any;
    branch_destination: number | null;
}


export default function ConsultsJustifications() {
    const { }: any = useContext(UserContext)
    const api = useApi()
    const apiDownload = useApiDownload()
    const toaster = useToaster()


    // FILTER
    const initialFilter = {
        date_emission: null,
        date_emission__gte: null,
        date_emission__lte: null,
        branch_destination: null,
    }
    const [filter, setFilter] = useState<Filter>({ ...initialFilter })
    const clear = () => {
        setFilter(initialFilter)
    }


    // DATA
    const [data, setData] = useState([])
    const searchData = async () => {
        let filter_ = { ...filter }

        if (filter_.date_emission) {
            filter_.date_emission__gte = DateToString(filter_.date_emission[0])
            filter_.date_emission__lte = DateToString(filter_.date_emission[1])

            delete filter_.date_emission
        } else {
            let message = (
                <Message showIcon type="error" closable >
                    Selecione um Período.
                </ Message>
            )
            throw toaster.push(message, { placement: "topEnd", duration: 4000 })
        }
        if (!filter_.branch_destination) {
            let message = (
                <Message showIcon type="error" closable >
                    Selecione uma Filial.
                </ Message>
            )
            throw toaster.push(message, { placement: "topEnd", duration: 4000 })
        }

        const response = await api.get<DeliveryHistoryInterface[]>("/deliveries-histories/consult/", { params: { ...filter_ } })

        let dataRes = response.data

        for (const res in dataRes) {
            if (Object.prototype.hasOwnProperty.call(dataRes, res)) {
                let line = { status: "", ...dataRes[res] }

                if (line.date_delivery === "01/01/0001" || line.date_delivery === "01/01/1") line.date_delivery = null
                if (line.lead_time === "01/01/0001" || line.lead_time === "01/01/1") line.lead_time = null

                if (line.date_emission && line.opened <= 0) line.status = "NO PRAZO"
                else if (line.opened > 0) line.status = "FORA DO PRAZO"
                else if (!line.date_emission) line.status = "NÃO ENTREGUE"

                dataRes[res] = line

            }
        }
        return response.data
    }
    const { isLoading, refetch } = useQuery({
        queryKey: ["consult-justification"],
        queryFn: searchData,
        onSuccess: (response: any) => {
            setData(response)
        },
        onError: (error: AxiosError) => {
            MainMessage.Error400(toaster, error, {})
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
        enabled: false
    })

    // DOWNLOAD
    const download = async (rowData: any) => {
        await apiDownload.post(rowData.file + "/").then((response: any) => {
            let file = rowData.file.split("/")[6]

            FileDownload(response.data, file)
        }).catch(() => {
            let message = (
                <Message showIcon type="error" closable >
                    Ocorreu um erro ao buscar o arquivo.
                </ Message>
            )
            throw toaster.push(message, { placement: "topEnd", duration: 4000 })
        })

    }


    // TABLE
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "CTE": { dataKey: "cte", propsColumn: { width: 150 } },
            "Remetente": { dataKey: "sender", propsColumn: { width: 200 } },
            "Destinatário": { dataKey: "recipient", propsColumn: { width: 150 } },
            "Data Emissão": { dataKey: "date_emission", propsColumn: { width: 130 } },
            "Lead Time": { dataKey: "lead_time", propsColumn: { width: 130 } },
            "Data Entrega": { dataKey: "date_delivery", propsColumn: { width: 130 } },
            "Status": { dataKey: "status", propsColumn: { width: 150 } },
            "Nota Fiscal": { dataKey: "nf", propsColumn: { width: 150 } },
            "Peso": { dataKey: "weight", propsColumn: { width: 150 } },
            "Justificativa": { dataKey: "description_justification", propsColumn: { width: 200, fixed: "right" } },
            "Anexo": { dataKey: "button", propsColumn: { width: 150, fixed: "right" }, click: download, icon: FileDownloadIcon },
        }
    }, [])


    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="Consulta de Justificativas">
                <ConsultJustification.Header />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                <ConsultJustification.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data} columns={columns} isLoading={isLoading} wordWrap="break-word" limit={75} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
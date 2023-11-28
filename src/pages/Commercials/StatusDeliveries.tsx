import { Message, useToaster } from "rsuite";

import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { DateToString } from "../../services/Date";
import { ColumnsInterface, DeliveryHistoryInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Global/Panel";
import { MainMessage } from "../../components/Global/Message";
import { MainTable } from "../../components/Global/Table";
import { StatusDelivery } from "../../components/Commercial/StatusDelivery";


interface Filter {
    recipient__contains: string;
    sender__contains: string;
    date_emission: any;
    date_emission__gte: any;
    date_emission__lte: any;
    branch_destination: number | null;
}


export default function StatusDeliveries() {
    const api = useApi()
    const toaster = useToaster()


    // FILTER
    const initialFilter = {
        recipient__contains: "",
        sender__contains: "",
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

        filter_.recipient__contains = filter_.recipient__contains.toUpperCase()
        filter_.sender__contains = filter_.sender__contains.toUpperCase()

        const response = await api.get<DeliveryHistoryInterface[]>("/deliveries-histories/status/", { params: { ...filter_ } })

        let dataRes = response.data

        for (const res in dataRes) {
            if (Object.prototype.hasOwnProperty.call(dataRes, res)) {
                let line = { status: "", ...dataRes[res] }

                if (line.date_delivery === "01/01/0001" || line.date_delivery === "01/01/1") line.date_delivery = null
                if (line.lead_time === "01/01/0001" || line.lead_time === "01/01/1") line.lead_time = null

                if (line.date_delivery && line.opened <= 0) line.status = "NO PRAZO"
                else if (line.opened == 999) line.status = "SEM LEADTIME DEFINIDO"
                else if (line.opened > 0) line.status = "FORA DO PRAZO"
                else if (!line.date_delivery) line.status = "EM ANDAMENTO"

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


    // TABLE
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "CTE": { dataKey: "cte", propsColumn: { width: 120 } },
            "Remetente": { dataKey: "sender", propsColumn: { width: 200 } },
            "Destinatário": { dataKey: "recipient", propsColumn: { width: 200 } },
            "Data Emissão": { dataKey: "date_emission", propsColumn: { width: 130 } },
            "Lead Time": { dataKey: "lead_time", propsColumn: { width: 130 } },
            "Nota Fiscal": { dataKey: "nf", propsColumn: { width: 170 } },
            "Peso": { dataKey: "weight", propsColumn: { width: 100 } },
            "Filial Origem": { dataKey: "branch_issuing.abbreviation", propsColumn: { width: 100 } },
            "Cidade": { dataKey: "branch_destination.name", propsColumn: { width: 100 } },
            "UF": { dataKey: "branch_destination.uf", propsColumn: { width: 70 } },
            "Filial": { dataKey: "branch_destination.abbreviation", propsColumn: { width: 100 } },
            "Status": { dataKey: "last_occurrence.occurrence_description", propsColumn: { width: 150, fixed: "right" } },
            "Data Ocorrência": { dataKey: "last_occurrence.date_emission", propsColumn: { width: 150, fixed: "right" } },
        }
    }, [])


    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="Status das Entregas">
                <StatusDelivery.Header filter={filter} />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                <StatusDelivery.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data} columns={columns} isLoading={isLoading} wordWrap="break-word" limit={75} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
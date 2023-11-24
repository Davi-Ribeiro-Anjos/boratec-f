import { Message, useToaster } from "rsuite";
import DocPassIcon from '@rsuite/icons/DocPass';
import DetailIcon from '@rsuite/icons/Detail';

import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { ColumnsInterface, QueryNFInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Global/Panel";
import { MainTable } from "../../components/Global/Table";
import { useApi } from "../../hooks/Api";
import { QueryNF } from "../../components/QueryNF";
import { MainMessage } from "../../components/Global/Message";
import { AxiosError } from "axios";

interface Filter {
    nf: number | null;
}

const initialFilter: Filter = {
    nf: null,
}


export default function QueriesNFs() {
    const api = useApi()
    const toaster = useToaster()


    // FILTER
    const [filter, setFilter] = useState(initialFilter)
    const clear = () => {
        setFilter(initialFilter)
    }


    // DATA
    const searchData = async () => {
        if (filter.nf === null) {
            let message = (
                <Message showIcon type="error" closable >
                    Erro - Preencha o campo Nota Fiscal.
                </ Message>
            )
            throw toaster.push(message, { placement: "topEnd", duration: 4000 })
        }

        const response = await api.get(`deliveries-histories/nf/${filter.nf}/`)

        return response.data
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["query-nf"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error)
        },
        enabled: false
    })


    // TABLE
    const [row, setRow] = useState<any>({})
    const [openOccurrence, setOpenOccurrence] = useState(false)
    const modalOccurrence = (rowData: QueryNFInterface) => {
        for (const line in rowData.occurrences) {
            if (Object.hasOwnProperty.call(rowData.occurrences, line)) {
                const element: any = rowData.occurrences[line];
                element.description_occurrence = element.description_occurrence.toUpperCase()
            }
        }
        setRow(rowData.occurrences)
        setOpenOccurrence(true)
    }
    const [openPacking, setOpenPacking] = useState(false)
    const modalPacking = (rowData: QueryNFInterface) => {
        setRow(rowData.packing_list)
        setOpenPacking(true)
    }
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "CTE": { dataKey: "knowledge", propsColumn: { width: 120 } },
            "Data Emissão": { dataKey: "date_emission", propsColumn: { width: 120 } },
            "Remetente": { dataKey: "sender", propsColumn: { width: 150, fullText: true } },
            "Destinatário": { dataKey: "recipient", propsColumn: { width: 130, fullText: true } },
            "Peso": { dataKey: "weight", propsColumn: { width: 100 } },
            "Previsão Entrega": { dataKey: "date_forecast", propsColumn: { width: 130 } },
            "Local Entrega": { dataKey: "delivery_location", propsColumn: { width: 130, fullText: true } },
            "Nota Fiscal": { dataKey: "nf", propsColumn: { width: 120 } },
            "Ocorrências": { dataKey: "button", propsColumn: { width: 110 }, click: modalOccurrence, icon: DetailIcon },
            "Romaneio": { dataKey: "button", propsColumn: { width: 110 }, click: modalPacking, icon: DocPassIcon }
        }
    }, [])


    return (
        <MainPanel.Root>

            <MainPanel.Header title="Consulta de NF's">
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                <QueryNF.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} />
                <QueryNF.Occurrence row={row} open={openOccurrence} setOpen={setOpenOccurrence} />
                <QueryNF.Packing row={row} open={openPacking} setOpen={setOpenPacking} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
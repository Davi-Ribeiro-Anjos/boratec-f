import { Message, useToaster } from "rsuite";
import DocPassIcon from '@rsuite/icons/DocPass';
import DetailIcon from '@rsuite/icons/Detail';

import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useApi } from "../../hooks/Api";
import { FormatDate } from "../../services/Date";
import { ColumnsInterface, QueryNFInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Panel";
import { MainTable } from "../../components/Table";
import { QueryNF } from "../../components/QueryNF";

interface Filter {
    nf: number | null;
}

const initialFilter: Filter = {
    nf: null,
}


export default function EPIsRequests() {
    const api = useApi()
    const toaster = useToaster()


    // FILTER
    const [filter, setFilter] = useState(initialFilter)
    const clear = () => {
        setFilter(initialFilter)
    }


    // DATA
    const searchData = async () => {
        // if (filter.nf === null) {
        //     let message = (
        //         <Message showIcon type="error" closable >
        //             Erro - Preencha o campo Nota Fiscal.
        //         </ Message>
        //     )
        //     throw toaster.push(message, { placement: "topEnd", duration: 4000 })
        // }

        // const response = await api.get(`deliveries-histories/nf/${filter.nf}/`)

        // return response.data
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["epis-requests"],
        queryFn: searchData,
        onError: () => { },
        enabled: false
    })


    // TABLE
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Id": { dataKey: "knowledge", propsColumn: { width: 120 } },
            "Funcionário": { dataKey: "date_emission", propsColumn: { width: 120 } },
            "Filial": { dataKey: "sender", propsColumn: { width: 150, fullText: true } },
            "Data Solicitação": { dataKey: "recipient", propsColumn: { width: 130, fullText: true } },
            "Solicitante": { dataKey: "weight", propsColumn: { width: 100 } },
            "Vizualizar": { dataKey: "button", propsColumn: { width: 110 }, click: () => { }, icon: DetailIcon, needAuth: false },
            "Editar": { dataKey: "button", propsColumn: { width: 110 }, click: () => { }, icon: DocPassIcon, needAuth: false }
        }
    }, [])


    return (
        <MainPanel.Root>

            <MainPanel.Header title="Solicitações EPI's">
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                <QueryNF.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
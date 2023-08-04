import { useToaster } from "rsuite";
import ListIcon from "@rsuite/icons/List";
import EditIcon from "@rsuite/icons/Edit";

import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { ColumnsInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Panel";
import { MainTable } from "../../components/Table";
import { Employee } from "../../components/Employee";

interface Filter {
    numero_solicitacao: string | number | null,
    data_solicitacao_bo: string | null,
    status: string | null,
    filial: number | null,
    solicitante: number | null,
}

const initialFilter = {
    numero_solicitacao: null,
    data_solicitacao_bo: null,
    status: null,
    filial: null,
    solicitante: null,
}


export default function Employees() {
    console.log("funcionarios pj")

    const { token }: any = useContext(UserContext)
    const api = useApi(token)
    const toaster = useToaster()

    const [filter, setFilter] = useState<Filter>({ ...initialFilter })

    const searchData = () => {

    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["employees"],
        queryFn: searchData
    })

    const clear = () => { }

    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Nome": { dataKey: "nome", width: 250 },
            "Filial": { dataKey: "filial.sigla", width: 120 },
            "CNPJ": { dataKey: "cnpj", width: 150 },
            "Dados Bancários": { dataKey: "dados_bancarios", width: 300 },
            "Serviços": { dataKey: "botao", width: 130, click: () => { }, icon: ListIcon },
            "Editar": { dataKey: "botao", width: 130, click: () => { }, icon: EditIcon }
        }
    }, [])


    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="Funcionários PJ">
                <Employee.Header />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                <Employee.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} />
            </MainPanel.Body>
        </MainPanel.Root>
    )
}
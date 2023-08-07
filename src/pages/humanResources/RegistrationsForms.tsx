import { useToaster } from "rsuite";
import ListIcon from "@rsuite/icons/List";
import EditIcon from "@rsuite/icons/Edit";
import PageIcon from "@rsuite/icons/Page";

import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { ColumnsInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Panel";
import { MainTable } from "../../components/Table";
import { UserContext } from "../../providers/UserProviders";
import { useApi } from "../../hooks/Api";
import { RegistrationForm } from "../../components/RegistrationForm";

export default function RegistrationsForms() {
    console.log("ficha cadastral")

    const { token }: any = useContext(UserContext)
    const api = useApi(token)
    const toaster = useToaster()


    const [filter, setFilter] = useState({})

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["registration-form"],
        queryFn: () => { }
    })

    const clear = () => { }

    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Nome": { dataKey: "nome", width: 250 },
            "Filial": { dataKey: "filial.sigla", width: 120 },
            "CNPJ/ CPF": { dataKey: "cnpj", width: 150 },
            "Tipo Contrato": { dataKey: "dados_bancarios", width: 130 },
            "Documento": { dataKey: "link", width: 130, url: "", icon: PageIcon },
            "EPI's": { dataKey: "botao", width: 130, click: () => { }, icon: EditIcon, needAuth: false },
            "Detalhes": { dataKey: "botao", width: 130, click: () => { }, icon: ListIcon, needAuth: false }
        }
    }, [])

    return (
        <MainPanel.Root>

            <MainPanel.Header title="Ficha Cadastral">

            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch}>
                <RegistrationForm.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : [{}]} isLoading={isLoading} columns={columns} />
            </MainPanel.Body>
        </MainPanel.Root>
    )
}
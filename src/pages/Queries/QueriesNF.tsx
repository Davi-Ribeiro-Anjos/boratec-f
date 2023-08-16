import { Message, useToaster } from "rsuite";
import ListIcon from "@rsuite/icons/List";
import EditIcon from "@rsuite/icons/Edit";
import PageIcon from "@rsuite/icons/Page";

import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { ColumnsInterface, EmployeesInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Panel";
import { MainTable } from "../../components/Table";
import { UserContext } from "../../providers/UserProviders";
import { baseUrl, useApi } from "../../hooks/Api";
import { RegistrationForm } from "../../components/RegistrationForm";
import { AxiosError } from "axios";
import { MainMessage } from "../../components/Message";

interface Filter {
    id: number | null;
    cnpj_cpf: any;
    cnpj: string | null;
    cpf: string | null;
    branch: number | null;
    type_contract: string | null;
}

const initialFilter: Filter = {
    id: null,
    cnpj_cpf: "",
    cnpj: null,
    cpf: null,
    branch: null,
    type_contract: null,
}



export default function QueriesNFs() {

    const { token }: any = useContext(UserContext)
    const api = useApi(token)
    const toaster = useToaster()

    // FILTER
    const [filter, setFilter] = useState(initialFilter)
    const clear = () => {
        setFilter(initialFilter)
    }

    const refetch = () => { }

    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Nome": { dataKey: "name", width: 300 },
            "Filial": { dataKey: "branch.abbreviation", width: 120 },
            "CNPJ/ CPF": { dataKey: "cnpj_cpf", width: 150 },
            "Tipo Contrato": { dataKey: "type_contract", width: 130 },
            "Documento": { dataKey: "link", width: 130, url: `${baseUrl}/api/employees/document/`, icon: PageIcon },
            "EPI's": { dataKey: "button", width: 130, click: () => { }, icon: EditIcon, needAuth: false },
            "Detalhes": { dataKey: "button", width: 130, click: () => { }, icon: ListIcon, needAuth: false }
        }
    }, [])

    return (
        <MainPanel.Root>

            <MainPanel.Header title="Consulta NF">
                <RegistrationForm.Header />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch}>
                <RegistrationForm.Filter cnpj_cpf={filter.cnpj_cpf} />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
import { useToaster } from "rsuite";
import ListIcon from "@rsuite/icons/List";
import EditIcon from "@rsuite/icons/Edit";
import PageIcon from "@rsuite/icons/Page";

import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { ColumnsInterface, EmployeesInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Panel";
import { MainTable } from "../../components/Table";
import { UserContext } from "../../providers/UserProviders";
import { useApi } from "../../hooks/Api";
import { RegistrationForm } from "../../components/RegistrationForm";
import { AxiosError } from "axios";
import { MainMessage } from "../../components/Message";

interface Filter {
    id: number | null;
    cnpj_cpf: string | null;
    branch: number | null;
    type_contract: string | null;
}

const initialFilter: Filter = {
    id: null,
    cnpj_cpf: "",
    branch: null,
    type_contract: null,
}



export default function RegistrationsForms() {
    console.log("ficha cadastral")

    const { token }: any = useContext(UserContext)
    const api = useApi(token)
    const toaster = useToaster()


    const [filter, setFilter] = useState(initialFilter)

    const searchData = async () => {
        if (filter.cnpj_cpf === "") filter.cnpj_cpf = null

        const response = await api.get<EmployeesInterface[]>("employees/", { params: { ...filter } })

        let dataRes = response.data
        for (const line in dataRes) {
            if (Object.hasOwnProperty.call(dataRes, line)) {
                const element = dataRes[line];

                element.cnpj_cpf = element.cnpj !== "" ? element.cnpj : element.cpf
            }
        }

        return dataRes
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["registration-form"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            const message = {
                id: "Funcionário",
                cnpj: "CNPJ",
                cpf: "CPF",
                branch: "Filial",
                type_contract: "Tipo Contrato",
            }

            MainMessage.Error400(toaster, error, message)
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
        enabled: false
    })

    const clear = () => {
        setFilter(initialFilter)
    }

    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Nome": { dataKey: "name", width: 250 },
            "Filial": { dataKey: "branch.abbreviation", width: 120 },
            "CNPJ/ CPF": { dataKey: "cnpj_cpf", width: 150 },
            "Tipo Contrato": { dataKey: "type_contract", width: 130 },
            "Documento": { dataKey: "link", width: 130, url: "", icon: PageIcon },
            "EPI's": { dataKey: "button", width: 130, click: () => { }, icon: EditIcon, needAuth: false },
            "Detalhes": { dataKey: "button", width: 130, click: () => { }, icon: ListIcon, needAuth: false }
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
                <MainTable.Root data={data ? data : []} isLoading={isLoading} columns={columns} />
            </MainPanel.Body>
        </MainPanel.Root>
    )
}
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
    name__contains: string;
    cnpj_cpf: any;
    cnpj: string | null;
    cpf: string | null;
    branch: number | null;
    type_contract: string | null;
}

const initialFilter: Filter = {
    name__contains: "",
    cnpj_cpf: "",
    cnpj: null,
    cpf: null,
    branch: null,
    type_contract: null,
}



export default function RegistrationsForms() {

    const { token }: any = useContext(UserContext)
    const api = useApi(token)
    const toaster = useToaster()

    // FILTER
    const [filter, setFilter] = useState(initialFilter)
    const clear = () => {
        setFilter(initialFilter)
    }

    // DATA
    const searchData = async () => {
        let fil = { ...filter }
        if (fil.cnpj_cpf === "") fil.cnpj_cpf = null
        else {
            fil.cnpj_cpf = fil.cnpj_cpf.replaceAll('.', '').replace('-', '').replace('/', '')
            if (fil.cnpj_cpf.length === 15) fil.cnpj_cpf = fil.cnpj_cpf.slice(0, -1)
            if (fil.cnpj_cpf.length !== 14 && fil.cnpj_cpf.length !== 11) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Complete o campo CNPJ / CPF corretamente.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }

            if (fil.cnpj_cpf.length === 11) {
                fil.cpf = fil.cnpj_cpf
            } else {
                fil.cnpj = fil.cnpj_cpf
            }

            delete fil.cnpj_cpf
        }

        const response = await api.get<EmployeesInterface[]>("employees/", { params: { ...fil } })

        let dataRes = response.data
        for (const line in dataRes) {
            if (Object.hasOwnProperty.call(dataRes, line)) {
                const element = dataRes[line];
                element.cnpj_cpf = Boolean(element.cnpj) == false ? element.cpf : element.cnpj
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

    // TABLE
    const [row, setRow] = useState<any>({})
    const [openPJ, setOpenPJ] = useState(false)
    const [openCLT, setOpenCLT] = useState(false)
    const details = (rowData: EmployeesInterface) => {
        if (rowData.type_contract === "CLT") setOpenCLT(true)
        else setOpenPJ(true)

        setRow(rowData)
    }

    const [openEPI, setOpenEPI] = useState(false)
    const [dataEPI, setDataEPI] = useState<any>({})
    const epis = async (rowData: EmployeesInterface) => {
        setRow(rowData)
        await getEPI(rowData.id)

        setOpenEPI(true)
    }

    const getEPI = async (id: any) => {
        await api.get(`employees-epis/${id}/`).then(response => {
            let dataRes = response.data

            if (dataRes.phone_code == null) dataRes.phone_code = ""
            if (dataRes.notebook_code == null) dataRes.notebook_code = ""

            setDataEPI(response.data)
        })
    }

    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Nome": { dataKey: "name", propsColumn: { width: 300 } },
            "Filial": { dataKey: "branch.abbreviation", propsColumn: { width: 120 } },
            "CNPJ/ CPF": { dataKey: "cnpj_cpf", propsColumn: { width: 150 } },
            "Tipo Contrato": { dataKey: "type_contract", propsColumn: { width: 130 } },
            "Documento": { dataKey: "link", propsColumn: { width: 130 }, url: `${baseUrl}/api/employees/document/`, icon: PageIcon },
            "Acessórios": { dataKey: "button", propsColumn: { width: 130 }, click: epis, icon: EditIcon },
            "Detalhes": { dataKey: "button", propsColumn: { width: 130 }, click: details, icon: ListIcon }
        }
    }, [])

    return (
        <MainPanel.Root>

            <MainPanel.Header title="Ficha Cadastral">
                <RegistrationForm.Header />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch}>
                <RegistrationForm.Filter cnpj_cpf={filter.cnpj_cpf} />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} isLoading={isLoading} columns={columns} virtualized />
                <RegistrationForm.EPI row={row} data={dataEPI} setData={setDataEPI} open={openEPI} setOpen={setOpenEPI} />
                <RegistrationForm.DetailCLT data={row} open={openCLT} setOpen={setOpenCLT} />
                <RegistrationForm.DetailPJ data={row} open={openPJ} setOpen={setOpenPJ} />
            </MainPanel.Body>
        </MainPanel.Root>
    )
}
import { useToaster } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";

import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { ColumnsInterface, EmployeesInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Panel";
import { MainTable } from "../../components/Table";
import { Employee } from "../../components/Employee";
import { AxiosError } from "axios";
import { MainMessage } from "../../components/Message";

interface Filter {
    id: number | null,
    branch: number | null,
    type_contract: string
}

const initialFilter = {
    id: null,
    branch: null,
    type_contract: "PJ"
}


export default function Employees() {
    console.log("employees pj")

    const { token }: any = useContext(UserContext)
    const api = useApi()
    const toaster = useToaster()

    // FILTER
    const [filter, setFilter] = useState<Filter>({ ...initialFilter })
    const clear = () => {
        setFilter(initialFilter)
    }


    // DATA
    const searchData = async () => {
        const response = await api.get("employees/", { params: { ...filter } })

        let dataRes = response.data
        for (const line in dataRes) {
            if (Object.hasOwnProperty.call(dataRes, line)) {
                const element = dataRes[line];

                element["bank_details"] = `BCO: ${element.bank} | AG: ${element.agency} | CC: ${element.account}`
            }
        }

        return dataRes
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["employees"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
        enabled: false
    })


    // EDIT
    const [row, setRow] = useState<EmployeesInterface>()
    const [openEdit, setOpenEdit] = useState(false)
    const modalEdit = (rowData: any) => {
        setOpenEdit(true)
    }


    // TABLE
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Nome": { dataKey: "name", propsColumn: { width: 300 } },
            "Filial": { dataKey: "branch.abbreviation", propsColumn: { width: 120 } },
            "CNPJ": { dataKey: "cnpj", propsColumn: { width: 150 } },
            "Dados Bancários": { dataKey: "bank_details", propsColumn: { width: 350 } },
            "Editar": { dataKey: "button", propsColumn: { width: 130 }, click: modalEdit, icon: EditIcon }
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
                <Employee.Edit open={openEdit} setOpen={setOpenEdit} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
import { useToaster } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";

import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useApi } from "../../../hooks/Api";
import { UserContext } from "../../../providers/UserProviders";
import { ColumnsInterface, EmployeesInterface } from "../../../services/Interfaces";

import { MainPanel } from "../../../components/Global/Panel";
import { MainTable } from "../../../components/Global/Table";
import { Employee } from "../../../components/Employee";
import { AxiosError } from "axios";
import { MainMessage } from "../../../components/Global/Message";
import { StringToDate } from "../../../services/Date";

interface Filter {
    name__contains: string,
    branch: number | null,
    type_contract: string
}

const initialFilter = {
    name__contains: "",
    branch: null,
    type_contract: "PJ"
}


export default function Employees() {
    const { }: any = useContext(UserContext)
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
        let row_ = { ...rowData }

        row_.branch = rowData.branch.id
        row_.date_admission = StringToDate(rowData.date_admission)

        // COMPLEMENTS
        row_.salary = rowData.pj_complements.salary || null
        row_.college = rowData.pj_complements.college || null
        row_.allowance = rowData.pj_complements.allowance || null
        row_.housing_allowance = rowData.pj_complements.housing_allowance || null
        row_.covenant_credit = rowData.pj_complements.covenant_credit || null
        row_.others_credits = rowData.pj_complements.others_credits || null
        row_.advance_money = rowData.pj_complements.advance_money || null
        row_.covenant_discount = rowData.pj_complements.covenant_discount || null
        row_.others_discounts = rowData.pj_complements.others_discounts || null
        row_.observation = rowData.pj_complements.observation || null

        setRow(row_)
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
                <Employee.Edit open={openEdit} setOpen={setOpenEdit} row={row} setRow={setRow} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
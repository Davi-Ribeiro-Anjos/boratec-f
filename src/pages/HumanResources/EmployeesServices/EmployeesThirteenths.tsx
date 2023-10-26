import { useToaster } from "rsuite";

import { useContext, useState, useMemo } from "react";
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../../hooks/Api";
import { UserContext } from "../../../providers/UserProviders";
import { ColumnsInterface } from "../../../services/Interfaces";

import { MainPanel } from "../../../components/Global/Panel";
import { MainMessage } from "../../../components/Global/Message";
import { Thirteenth } from "../../../components/EmployeeService/Thirteenth";
import { MainTable } from "../../../components/Global/Table";

interface EmployeesThirteenthsProps { }


export default function EmployeesThirteenths({ }: EmployeesThirteenthsProps) {

    const { }: any = useContext(UserContext)
    const api = useApi()
    const toaster = useToaster()

    // FILTER
    const initialFilter = {

    }
    const [filter, setFilter] = useState(initialFilter)


    // DATA
    const searchData = async () => {
        const response = await api.get("employees/payments/")

        return response.data
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["employees-payments"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
    })


    // TABLE
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Funcionário": { dataKey: "employee.name", propsColumn: { flexGrow: 3 } },
            "Valor": { dataKey: "value", propsColumn: { flexGrow: 1 } },
            "Meses": { dataKey: "month", propsColumn: { flexGrow: 1 } },
            "Data Adiantamento": { dataKey: "date_payment", propsColumn: { flexGrow: 2 } },
            "Data Total": { dataKey: "bank_details", propsColumn: { flexGrow: 2 } },
        }
    }, [])

    const clear = () => {
        setFilter(initialFilter)
    }

    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="13º Salários">
                <Thirteenth.Header />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                <Thirteenth.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}

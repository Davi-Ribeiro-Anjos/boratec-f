import { useToaster } from "rsuite";

import { useContext, useState } from "react";
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../../hooks/Api";
import { UserContext } from "../../../providers/UserProviders";
import { EmployeesInterface } from "../../../services/Interfaces";
import { queryClient } from "../../../services/QueryClient";

import { MainPanel } from "../../../components/Global/Panel";
import { MainMessage } from "../../../components/Global/Message";
import { Payment } from "../../../components/HumanResource/EmployeeService/Payment";
import { PaymentTable } from "../../../components/HumanResource/EmployeeService/Payment/PaymentTable";

interface EmployeePaymentProps { }


export default function EmployeesPayments({ }: EmployeePaymentProps) {

    const { }: any = useContext(UserContext)
    const api = useApi()
    const toaster = useToaster()


    // DATA
    const [data, setData] = useState<EmployeesInterface[]>(queryClient.getQueryData(["employees-payments"]) || [])
    const searchData = async () => {
        const response = await api.get("employees/payments/")

        return response.data
    }
    const { isLoading } = useQuery({
        queryKey: ["employees-payments"],
        queryFn: searchData,
        onSuccess: (response: any) => {
            setData(response)
        },
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
    })


    // TABLE
    const [checkedKeys, setCheckedKeys] = useState([])

    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="Pagamento Funcionários">
                <Payment.Header checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} />
            </MainPanel.Header>

            <br />
            <br />

            <MainPanel.Body>
                <PaymentTable data={data} isLoading={isLoading} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}

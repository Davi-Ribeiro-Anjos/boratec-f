import { useToaster } from "rsuite";

import { useContext, useState } from "react";
import { useQuery } from "react-query";

import { useApi } from "../../../hooks/Api";
import { UserContext } from "../../../providers/UserProviders";
import { EmployeesInterface } from "../../../services/Interfaces";

import { MainPanel } from "../../../components/Panel";
import { AxiosError } from "axios";
import { MainMessage } from "../../../components/Message";
import { queryClient } from "../../../services/QueryClient";
import { Payment } from "../../../components/EmployeePayment";
import { PaymentTable } from "../../../components/EmployeePayment/PaymentTable";

interface EmployeePaymentProps { }


export default function EmployeesPayments({ }: EmployeePaymentProps) {
    console.log("payment")

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
                <Payment.Header checkedKeys={checkedKeys} />
            </MainPanel.Header>

            <br />
            <br />

            <MainPanel.Body>
                <PaymentTable data={data} isLoading={isLoading} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}

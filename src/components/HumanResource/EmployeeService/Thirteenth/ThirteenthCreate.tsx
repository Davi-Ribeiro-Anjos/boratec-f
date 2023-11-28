import { Form, useToaster } from "rsuite";

import { memo, useState, useContext } from "react";
import { useMutation, useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../../../hooks/Api";
import { UserContext } from "../../../../providers/UserProviders";
import { DateToString } from "../../../../services/Date";

import { MainMessage } from "../../../Global/Message";
import { MainModal } from "../../../Global/Modal";
import { MainFormComponent } from "../../../Global/Component/Form";
import { queryClient } from "../../../../services/QueryClient";

interface Form {
    value: number | null;
    months: number | null;
    date_payment: any | null;
    employee: number | null;
    author: number;
    type_payment: string | null;
}

interface ThirteenthCreateProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}


export const ThirteenthCreate = memo(
    function ThirteenthCreate({ open, setOpen }: ThirteenthCreateProps) {
        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const getEmployees = async () => {
            const response = await api.get("employees/", { params: { status: "ATIVO", type_contract: "PJ" } })

            return response.data.map((item: any) => ({ label: item.name, value: item.id }))
        }
        const { data: EmployeesChoices } = useQuery({
            queryKey: ["employees-pjs"],
            queryFn: getEmployees,
            onError: (error: AxiosError) => {
                MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os Funcionários, APERTE 'F5'.")
            },
            enabled: true,
        })

        // DATA
        const initialData = {
            value: null,
            months: null,
            date_payment: null,
            employee: null,
            author: me.id,
            type_payment: null,
        }
        const [data, setData] = useState<Form>(initialData)

        // THIRTEENTH
        const send = async (advance: boolean) => {
            let body = { ...data }

            if (body.date_payment) body.date_payment = DateToString(body.date_payment)

            if (advance) body.type_payment = "ADIANTAMENTO"
            else body.type_payment = "PAGAMENTO"

            return await api.post('pj/thirteenths/', body)
        }

        const { mutate } = useMutation({
            mutationKey: ["pj-thirteenth"],
            mutationFn: send,
            onSuccess: () => {
                queryClient.invalidateQueries(["pj-thirteenth"])

                close()
            },
            onError: (error: AxiosError) => {
                const message = {
                    value: "Valor",
                    months: "Meses Trabalhados",
                    date_advance: "Data Adiantamento",
                    date_payment: "Data Pagamento",
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
            }
        })

        const close = () => {
            setOpen(false)

            setData(initialData)
        }

        return (
            <MainModal.Form open={open} close={close} send={() => mutate(false)} data={data} setData={setData} size="md" overflow={false} >
                <MainModal.Header title="Adicionar 13º Salário" />
                <MainModal.Body>
                    <MainFormComponent.Row>
                        <MainFormComponent.SelectPicker text="Funcionário:" name="employee" data={EmployeesChoices} />
                        <MainFormComponent.InputNumber text="Valor:" name="value" />
                    </MainFormComponent.Row>
                    <MainFormComponent.Row>
                        <MainFormComponent.InputNumber text="Meses Trabalhados:" name="months" />
                        <MainFormComponent.DatePicker text="Data Pagamento:" name="date_payment" showHelpText />
                    </MainFormComponent.Row>
                </MainModal.Body>
                <MainModal.FooterThree name1="Pagamento" name2="Adiantamento" color="cyan" otherFunction={() => mutate(true)} close={close} />
            </MainModal.Form>
        );
    });

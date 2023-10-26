import { Form, useToaster } from "rsuite";

import { memo, useState, useContext } from "react";
import { useMutation, useQuery } from "react-query";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../../hooks/Api";
import { UserContext } from "../../../providers/UserProviders";
import { DateToString } from "../../../services/Date";

import { MainMessage } from "../../Global/Message";
import { MainModal } from "../../Global/Modal";
import { MainFormComponent } from "../../Global/Component/Form";

interface Form {
    value: number | null;
    months: number | null;
    date_advance: any | null;
    date_payment: any | null;
    author: number;
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

        const [EmployeesChoices, SetEmployeesChoices] = useState<any[]>([])
        const getEmployees = async () => {
            const response = await api.get("employees/", { params: { status: "ATIVO", type_contract: "PJ" } })

            return response.data
        }
        const { } = useQuery({
            queryKey: ["employees-pjs"],
            queryFn: getEmployees,
            onSuccess: (response: any[]) => {
                SetEmployeesChoices(response.map(item => ({ label: item.name, value: item.id })))
            },
            onError: (error: AxiosError) => {
                MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os Funcionários.")
            },
            enabled: true,
        })

        // DATA
        const initialData = {
            value: null,
            months: null,
            date_advance: null,
            date_payment: null,
            author: me.id
        }
        const [data, setData] = useState<Form>(initialData)

        // EMPLOYEES
        const send = async () => {
            let body: any = { ...data }

            if (body.date_advance) body.date_advance = DateToString(body.date_advance)
            if (body.date_payment) body.date_payment = DateToString(body.date_payment)

            return await api.post('/', body)
        }

        const { mutate } = useMutation({
            mutationKey: ["pj-thirteenth"],
            mutationFn: send,
            onSuccess: (response: AxiosResponse) => {
                console.log(response)
                // const dataRes = response.data

                // setData({ ...data, pj_complements: dataRes.id })

                // employeesMutate()
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
            setOpen(false);

            setData(initialData)
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size="md" overflow={false} >
                <MainModal.Header title="Adicionar 13º Salário" />
                <MainModal.Body>
                    <MainFormComponent.Row>
                        <MainFormComponent.InputNumber text="Valor:" name="value" />
                        <MainFormComponent.InputNumber text="Meses Trabalhados:" name="months" />
                    </MainFormComponent.Row>
                    <MainFormComponent.Row>
                        <MainFormComponent.DatePicker text="Data Adiantamento:" name="date_advance" />
                        <MainFormComponent.DatePicker text="Data Pagamento:" name="date_payment" showHelpText />
                    </MainFormComponent.Row>
                    <MainFormComponent.Row>
                        <MainFormComponent.SelectPicker text="Funcionário:" name="employee" data={EmployeesChoices} />
                    </MainFormComponent.Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Criar" close={close} />
            </MainModal.Form>
        );
    });

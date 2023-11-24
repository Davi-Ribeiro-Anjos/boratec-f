import { useToaster } from "rsuite";

import { memo } from "react";
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../../../hooks/Api";
import { DateToString } from "../../../../services/Date";
import { queryClient } from "../../../../services/QueryClient";

import { MainMessage } from "../../../Global/Message";
import { MainModal } from "../../../Global/Modal";
import { MainFormComponent } from "../../../Global/Component/Form";


interface ThirteenthEditProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    row: any | undefined;
    setRow: (value: any) => void;
}


export const ThirteenthEdit = memo(
    function ThirteenthEdit({ open, setOpen, row, setRow }: ThirteenthEditProps) {
        const api = useApi()
        const toaster = useToaster()

        // EMPLOYEES
        const send = async () => {
            let body = { ...row }

            if (body.date_payment) body.date_payment = DateToString(body.date_payment)

            delete body.employee

            return await api.patch(`pj/thirteenths/${row.id}/`, body)
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
                    date_payment: "Data Pagamento",
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
            }
        })

        const close = () => {
            setOpen(false)
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={row} setData={setRow} size="md" overflow={false} >
                <MainModal.Header title={`Editar 13º Salário - ${row?.employee.name}`} />
                <MainModal.Body>
                    <MainFormComponent.Row>
                        <MainFormComponent.InputNumber text="Valor:" name="value" showHelpText={false} />
                        <MainFormComponent.InputNumber text="Meses Trabalhados:" name="months" showHelpText={false} />
                    </MainFormComponent.Row>
                    <MainFormComponent.Row>
                        <MainFormComponent.DatePicker text="Data Pagamento:" name="date_payment" showHelpText={false} />
                    </MainFormComponent.Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Editar" close={close} />
            </MainModal.Form>
        );
    });

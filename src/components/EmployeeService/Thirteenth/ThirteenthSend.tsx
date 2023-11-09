import { Message, useToaster } from "rsuite";

import { memo, useState } from "react";
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../../hooks/Api";
import { queryClient } from "../../../services/QueryClient";

import { MainMessage } from "../../Global/Message";
import { MainModal } from "../../Global/Modal";
import { MainFormComponent } from "../../Global/Component/Form";
import { DateToString, FormatDate } from "../../../services/Date";


interface ThirteenthSendProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    checkedKeys: number[];
    setCheckedKeys: (value: any) => void;
}


export const ThirteenthSend = memo(
    function ThirteenthSend({ open, setOpen, checkedKeys, setCheckedKeys }: ThirteenthSendProps) {
        const api = useApi()
        const toaster = useToaster()

        const initialData: any = {
            date_emission: null
        }
        const [data, setData] = useState(initialData)

        const send = async () => {
            let body = {
                ...data,
                ids: checkedKeys
            }

            body.date_emission = FormatDate(DateToString(body.date_emission))


            if (body.ids.length === 0) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Marque pelo menos uma linha.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })

            }
            if (!body.date_emission) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Selecione uma Data.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })

            }

            MainMessage.Info(toaster, "Aguarde, os e-mails estão sendo enviados...")

            return await api.post('pj/thirteenths/send/', body)
        }

        const { mutate } = useMutation({
            mutationKey: ["pj-thirteenth"],
            mutationFn: send,
            onSuccess: () => {

                MainMessage.Ok(toaster, "Sucesso - Emails foram enviados.")

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
            setCheckedKeys([])
            setData(initialData)
            setOpen(false)
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size="sm" overflow={false} >
                <MainModal.Header title="Enviar emails" />
                <MainModal.Body>
                    <MainFormComponent.Row>
                        <MainFormComponent.DatePicker text="Data Limite Emissão:" name="date_emission" />
                    </MainFormComponent.Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Enviar" close={close} />
            </MainModal.Form>
        );
    });

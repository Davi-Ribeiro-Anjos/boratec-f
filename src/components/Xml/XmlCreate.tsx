import { Message, useToaster } from "rsuite";

import { useState, memo } from "react"
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { queryClient } from "../../services/QueryClient";

import { MainModal } from "../Global/Modal";
import { MainMessage } from "../Global/Message";
import { MainComponent } from "../Global/Component";

interface XmlCreateProps {
    open: boolean;
    setOpen: (value: any) => void;
}

interface Data {
    attachment: any[];
}


export const XmlCreate = memo(
    function XmlCreate({ open, setOpen }: XmlCreateProps) {
        const api = useApi(true)
        const toaster = useToaster()

        const initialData = { attachment: [] }
        const [data, setData] = useState<Data>(initialData)

        const send = async () => {
            let form: any = { ...data }

            if (form.attachment.length <= 0) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Adicione algum arquivo.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }

            if (Boolean(form.attachment.length)) {
                for (let index in form.attachment) {
                    if (form.attachment[index].blobFile) form.attachment[parseInt(index)] = form.attachment[index].blobFile
                }
            }

            return api.post("xmls/send/", { ...form })
        }

        const { mutate } = useMutation({
            mutationKey: ["xmls"],
            mutationFn: send,
            onSuccess: () => {
                queryClient.invalidateQueries(["xmls"])

                MainMessage.Ok(toaster, "Sucesso - XMLS importados.")

                close()
            },
            onError: (error: AxiosError) => {
                let message = {
                    current_location: "Filial",
                    quantity_pallets: "Quantidade de Paletes",
                    type_pallet: 'Tipo Palete',
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
            <MainModal.Form open={open} close={close} data={data} setData={setData} send={mutate} overflow={false} size="sm" >
                <MainModal.Header title="Importar XMLS" />
                <MainModal.Body>
                    <MainComponent.Row>
                        <MainComponent.Uploader text="Anexos:" name="attachment" helpText="Quantidade máxima de 50 arquivos" multiple={true} tooltip={false} />
                    </MainComponent.Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Importar" close={close} />
            </MainModal.Form>
        )
    }
)
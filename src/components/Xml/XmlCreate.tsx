import { useToaster } from "rsuite";

import { useState, memo, useContext } from "react"
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
// import { queryClient } from "../../services/QueryClient";
// import { PalletControlInterface } from "../../services/Interfaces";

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
        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const initialData = { attachment: [] }
        const [data, setData] = useState<Data>(initialData)

        const send = async () => {
            let form = { ...data }

            if (Boolean(form.attachment.length)) {
                for (let file in form.attachment) {
                    console.log(file)
                    console.log(me)
                    console.log(api)
                    // form[parseInt(index)] = form.attachment[index].blobFile
                }
            }
            // delete form.attachment

            console.log(form)
        }

        const { mutate } = useMutation({
            mutationKey: ["xmls"],
            mutationFn: send,
            onSuccess: () => {
                MainMessage.Ok(toaster, "Sucesso - Paletes criados.")

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
            <MainModal.Form open={open} close={close} data={data} setData={setData} send={mutate} overflow={false} size="md" >
                <MainModal.Header title="Adicionar XMLS" />
                <MainModal.Body>
                    <MainComponent.Row>
                        <MainComponent.Uploader text="Anexos:" name="xml_file" helpText="Quantidade máxima de 50 arquivos" multiple={true} tooltip={false} />
                    </MainComponent.Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Adicionar" close={close} />
            </MainModal.Form>
        )
    }
)
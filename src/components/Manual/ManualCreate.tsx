import { useToaster } from "rsuite";

import { useState, memo, useContext } from "react"
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { queryClient } from "../../services/QueryClient";
import { ManualInterface } from "../../services/Interfaces";

import { MainModal } from "../Global/Modal";
import { MainMessage } from "../Global/Message";
import { MainComponent } from "../Global/Component";

interface ManualCreateProps {
    open: boolean;
    setOpen: (value: any) => void;
}

interface Data {
    title: string,
    file: any,
    system: string,
    module: string,
    author: number;
}


export const ManualCreate = memo(
    function ManualCreate({ open, setOpen }: ManualCreateProps) {
        const { me }: any = useContext(UserContext)
        const api = useApi(true)
        const toaster = useToaster()

        const initialData = {
            title: '',
            file: null,
            system: '',
            module: '',
            author: me.id

        }
        const [data, setData] = useState<Data>(initialData)

        const send = async () => {
            let form = { ...data }

            form.title = form.title.toUpperCase()
            form.system = form.system.toUpperCase()
            form.module = form.module.toUpperCase()

            if (form.file && form.file.length > 0) {
                form.file = form.file[0].blobFile
            }

            return await api.post<ManualInterface>('queries/manuals/', form)
        }

        const { mutate } = useMutation({
            mutationKey: ["query-manual"],
            mutationFn: send,
            onSuccess: () => {
                queryClient.invalidateQueries(["query-manual"])

                MainMessage.Ok(toaster, "Sucesso - Manual Criado.")

                close()
            },
            onError: (error: AxiosError) => {
                let message = {
                    title: "Título",
                    system: "Sistema",
                    module: "Módulo",
                    file: "Arquivo",
                    author: 'Autor',
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
                <MainModal.Header title="Adicionar Manual" />
                <MainModal.Body>
                    <MainComponent.Row>
                        <MainComponent.Input text="Título:" name="title" />
                        <MainComponent.Input text="Sistema:" name="system" />
                    </MainComponent.Row>
                    <MainComponent.Row>
                        <MainComponent.Input text="Módulo:" name="module" />
                        <MainComponent.Uploader text="Arquivo:" name="file" />
                    </MainComponent.Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Adicionar" close={close} />
            </MainModal.Form>
        )
    }
)
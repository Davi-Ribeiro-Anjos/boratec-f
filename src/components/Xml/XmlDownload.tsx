import { Message, useToaster } from "rsuite";

import { useState, memo } from "react"
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApiDownload } from "../../hooks/Api";

import { MainModal } from "../Global/Modal";
import { MainMessage } from "../Global/Message";
import { MainComponent } from "../Global/Component";

import FileDownload from 'js-file-download';

interface XmlDownloadProps {
    open: boolean;
    setOpen: (value: any) => void;
    checkedKeys: number[];
}

interface DataInterface {
    type_download: string | null;
}


export const TypeChoices = [
    "SIMPLES", "COMPLETO", "REMETENTE", "DESTINATÁRIO", "XMLS"
].map(item => ({ label: item, value: item }))


export const XmlDownload = memo(
    function XmlDownload({ open, setOpen, checkedKeys }: XmlDownloadProps) {
        const api = useApiDownload()
        const toaster = useToaster()

        const initialFilter = { type_download: null }
        const [data, setData] = useState<DataInterface>(initialFilter)

        const send = async () => {
            let form: any = { ...data }

            if (checkedKeys.length <= 0) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Selecione os arquivos na tabela.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }
            if (!form.type_download) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Selecione o tipo de download.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }

            form.list_rom_id = checkedKeys

            return api.post("xmls/download/", { ...form })
        }

        const { mutate } = useMutation({
            mutationKey: ["xmls"],
            mutationFn: send,
            onSuccess: (response) => {
                if (data.type_download === "XMLS") {
                    FileDownload(response.data, data.type_download + ' - ' + 'report.zip');
                } else {
                    FileDownload(response.data, data.type_download + ' - ' + 'report.xlsx');
                }

                MainMessage.Ok(toaster, "Sucesso - XMLS importados.")

                close()
            },
            onError: (error: AxiosError) => {
                let message = {
                    message: "Mensagem"
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
            }
        })

        const close = () => {
            setOpen(false)
            setData(initialFilter)
        }

        return (
            <MainModal.Form open={open} close={close} data={data} setData={setData} send={mutate} overflow={false} size="sm" >
                <MainModal.Header title="Download XMLS" />
                <MainModal.Body>
                    <MainComponent.Row>
                        <MainComponent.SelectPicker text="Tipo de Download:" name="type_download" data={TypeChoices} tooltip={false} />
                    </MainComponent.Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Download" close={close} />
            </MainModal.Form>
        )
    }
)
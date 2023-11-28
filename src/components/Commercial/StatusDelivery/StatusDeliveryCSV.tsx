import { useToaster } from "rsuite";
import isAfter from "date-fns/isAfter";

import { memo, useState } from "react";
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApiDownload } from "../../../hooks/Api";
import { DateToString } from "../../../services/Date";
import { BranchesChoices } from "../../../services/Choices";

import { MainMessage } from "../../Global/Message";
import { MainModal } from "../../Global/Modal";
import { MainFormComponent } from "../../Global/Component/Form";

import FileDownload from 'js-file-download';


interface Form {
    date_selected: any;
    branch: typeof BranchesChoices | null;
}

interface StatusDeliveryCSVProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}


export const StatusDeliveryCSV = memo(
    function StatusDeliveryCSV({ open, setOpen }: StatusDeliveryCSVProps) {
        const api = useApiDownload()
        const toaster = useToaster()

        const initialData = {
            date_selected: null,
            branch: null,
        }

        const [data, setData] = useState<Form>(initialData)

        const generate = async () => {
            let body: any = { ...data }

            if (body.date_selected) body.date_selected = DateToString(body.date_selected)

            return await api.post('deliveries-histories/status/export/', body)
        }

        const { mutate } = useMutation({
            mutationKey: ["performance-csv"],
            mutationFn: generate,
            onSuccess: (response) => {
                FileDownload(response.data, "Relatório de Justificativas.csv")

                close()
            },
            onError: (error: AxiosError) => {
                const message = {
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
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size="md" overflow={false}>
                <MainModal.Header title="Exportar CSV" />
                <MainModal.Body>
                    <MainFormComponent.Row>
                        <MainFormComponent.DatePicker text="Data de Emissão:" name="date_selected" format="MM/yyyy" shouldDisableDate={(date: any) => isAfter(date, new Date())} />
                        <MainFormComponent.SelectPicker text="Filial:" name="branch" data={BranchesChoices} tooltip={false} helpText="Caso esteja em branco irá buscar de todas as filiais." />
                    </MainFormComponent.Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Gerar" close={close} />
            </MainModal.Form>
        );
    });

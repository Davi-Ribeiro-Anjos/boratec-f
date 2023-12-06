import { useToaster } from 'rsuite';
import DetailIcon from '@rsuite/icons/Detail';

import { useMutation } from 'react-query';
import { memo } from "react";

import { MainComponent } from "../../Global/Component";
import { MainMessage } from '../../Global/Message';
import { useApiDownload } from '../../../hooks/Api';

import FileDownload from 'js-file-download';
import { AxiosError } from 'axios';
import { DateToString } from '../../../services/Date';


interface StatusDeliveryHeaderProps {
    filter: any;
}


export const StatusDeliveryHeader = memo(function StatusDeliveryHeader({ filter }: StatusDeliveryHeaderProps) {
    const api = useApiDownload()
    const toaster = useToaster()

    const generate = async () => {
        let body: any = { ...filter }

        if (body.date_emission) {
            body.date_emission__gte = DateToString(body.date_emission[0])
            body.date_emission__lte = DateToString(body.date_emission[1])

            delete body.date_emission
        }

        body.recipient__contains = body.recipient__contains.toUpperCase()
        body.sender__contains = body.sender__contains.toUpperCase()

        MainMessage.Info(toaster, "Gerando relatório...")

        return await api.post('deliveries-histories/status/export/', body)
    }

    const { mutate } = useMutation({
        mutationKey: ["performance-csv"],
        mutationFn: generate,
        onSuccess: (response) => {
            MainMessage.Ok(toaster, "Relatório extraido com sucesso.")

            FileDownload(response.data, "Relatório de Status de Entrega.csv")

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


    return (
        <div>
            <MainComponent.ButtonHeader name="Extrair Relatório" func={mutate} icon={<DetailIcon />} color="blue" />
        </div>
    )
})
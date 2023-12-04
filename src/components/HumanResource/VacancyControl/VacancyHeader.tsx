import DetailIcon from '@rsuite/icons/Detail';

import { memo } from "react";

import { MainComponent } from "../../Global/Component";
import { MainMessage } from '../../Global/Message';
import { AxiosError } from 'axios';

import FileDownload from 'js-file-download';
import { useApiDownload } from '../../../hooks/Api';
import { useToaster } from 'rsuite';
import { useMutation } from 'react-query';
interface VacancyHeaderProps {
    filter: any;
}


export const VacancyHeader = memo(function VacancyHeader({ filter }: VacancyHeaderProps) {
    const api = useApiDownload()
    const toaster = useToaster()

    const generate = async () => {
        let body: any = { ...filter }

        if (body.author__name__contains) body.author__name__contains = body.author__name__contains.toUpperCase()

        return await api.post('vacancies/export/', body)
    }

    const { mutate } = useMutation({
        mutationKey: ["vacancy-csv"],
        mutationFn: generate,
        onSuccess: (response) => {
            FileDownload(response.data, "Relatório de Vagas.csv")

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
            <MainComponent.ButtonHeader name="Baixar CSV" func={mutate} icon={<DetailIcon />} color="blue" />
        </div>
    )
})
import { IconButton, Tooltip, Whisper, useToaster } from "rsuite";
import CheckIcon from '@rsuite/icons/Check';
import { styles } from "../../assets/styles";

import { memo } from "react";
import { DeliveryHistoryInterface } from "../../services/Interfaces";
import { useMutation } from "react-query";
import { MainMessage } from "../Global/Message";
import { useApi } from "../../hooks/Api";


interface JustificationHeaderProps {
    data: DeliveryHistoryInterface[];
}


export const JustificationHeader = memo(function JustificationHeader({ data }: JustificationHeaderProps) {
    const api = useApi()
    const toaster = useToaster()

    const send = async () => {
        let data_ = data.filter((value) => {
            return (Boolean(value.description_justification) && Boolean(value.file))
        })

        // await api.patch("", data_)

        return true
    }

    const { mutate } = useMutation({
        mutationKey: ["justification"],
        mutationFn: send,
        onSuccess: () => {
            MainMessage.Ok(toaster, "OK")
        },
        onError: () => { },
    })


    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Confirmar Lançamento</Tooltip>}>
                <IconButton icon={<CheckIcon />} appearance="primary" color="green" style={styles.iconButton} onClick={mutate} />
            </Whisper>
        </div>
    )
})
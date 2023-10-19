import { IconButton, Message, Tooltip, Whisper, useToaster } from "rsuite";
import SendIcon from '@rsuite/icons/Send';
import DocPassIcon from '@rsuite/icons/DocPass';
import { styles } from "../../assets/styles";

import { memo, useContext } from "react";
import { DeliveryHistoryInterface } from "../../services/Interfaces";
import { MainMessage } from "../Global/Message";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { queryClient } from "../../services/QueryClient";
import { useNavigate } from "react-router-dom";


interface JustificationHeaderProps {
    data: DeliveryHistoryInterface[];
}


export const JustificationHeader = memo(function JustificationHeader({ data }: JustificationHeaderProps) {
    const { me, verifyPermission }: any = useContext(UserContext)
    const api = useApi(true)
    const toaster = useToaster()
    const navigate = useNavigate()

    const send = () => {
        let data_ = data.filter((value: any) => {
            return (Boolean(value.description_justification) && Boolean(value.file))
        })

        if (data_.length <= 0) {
            let message = (
                <Message showIcon type="error" closable >
                    Preencha o campo Justificativa e Anexo de pelo menos 1 justificativa.
                </ Message>
            )
            throw toaster.push(message, { placement: "topEnd", duration: 4000 })
        }

        MainMessage.Info(toaster, "As Justificativas foram enviadas...")

        data_.map(async (value: any) => {
            let dt: any = {
                description_justification: value.description_justification,
                file: value.file,
                author: me.id,
            }

            await api.patch(`/deliveries-histories/${value.id}/`, { ...dt }).then((response) => {
                queryClient.setQueryData(["justification"], (currentData: any) => {
                    return currentData.filter((justification: any) => {
                        justification.id !== response.data.id
                    })
                })

            }).catch((error) => {
                let errorMessage = error.response.data.message

                if (error.status !== 200) {
                    let message = (
                        <Message showIcon type="error" closable >
                            {errorMessage ? errorMessage : `Ocorreu um erro com o CTE - ${value.cte}.`}
                        </ Message>
                    )
                    throw toaster.push(message, { placement: "topEnd", duration: 4000 })
                }
            })

        })

    }


    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Lançar Justificativa</Tooltip>}>
                <IconButton icon={<SendIcon />} appearance="primary" color="green" style={styles.iconButton} onClick={send} />
            </Whisper>
            {verifyPermission("delivery_history_admin") &&
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Confirmar Justificativa</Tooltip>}>
                    <IconButton icon={<DocPassIcon />} appearance="primary" color="cyan" style={styles.iconButton} onClick={() => navigate('/comercial/justificativas/confirmar')} />
                </Whisper>
            }
        </div>
    )
})
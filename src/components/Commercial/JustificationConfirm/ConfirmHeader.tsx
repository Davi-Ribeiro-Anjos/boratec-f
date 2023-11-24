import { Message, useToaster } from "rsuite";
import ArowBackIcon from '@rsuite/icons/ArowBack';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { useApi } from "../../../hooks/Api";
import { queryClient } from "../../../services/QueryClient";

import { MainComponent } from "../../Global/Component";


interface ConfirmHeaderProps {
    checkedKeys: number[];
}


export const ConfirmHeader = memo(function ConfirmHeader({ checkedKeys }: ConfirmHeaderProps) {
    const api = useApi()
    const navigate = useNavigate()
    const toaster = useToaster()


    const confirm = async () => {
        const data = {
            confirmed: true,
        }

        for (const id in checkedKeys) {
            if (Object.prototype.hasOwnProperty.call(checkedKeys, id)) {
                const element = checkedKeys[id]

                await api.patch(`/deliveries-histories/${element}/`, { ...data }).then(() => {
                }).catch((error) => {
                    if (error.status !== 200) {
                        let message = (
                            <Message showIcon type="error" closable >
                                Ocorreu um erro ao finalizar essa ação.
                            </ Message>
                        )
                        throw toaster.push(message, { placement: "topEnd", duration: 4000 })
                    }
                })
            }
        }

        queryClient.invalidateQueries(["justification-confirm"])
    }

    const refuse = async () => {
        const data = {
            refuse: true,
            file: null,
            description_justification: null
        }

        for (const id in checkedKeys) {
            if (Object.prototype.hasOwnProperty.call(checkedKeys, id)) {
                const element = checkedKeys[id]

                await api.patch(`/deliveries-histories/${element}/`, { ...data }).then(() => {
                }).catch((error) => {
                    if (error.status !== 200) {
                        let message = (
                            <Message showIcon type="error" closable >
                                Ocorreu um erro ao finalizar essa ação.
                            </ Message>
                        )
                        throw toaster.push(message, { placement: "topEnd", duration: 4000 })
                    }
                })
            }
        }
        queryClient.invalidateQueries(["justification-confirm"])
    }


    return (
        <div>
            <MainComponent.ButtonHeader name="Voltar para Justificativas" func={() => navigate("/comercial/justificativas")} icon={<ArowBackIcon />} color="cyan" />
            <MainComponent.ButtonHeader name="Confirmar" func={confirm} icon={<CheckIcon />} color="green" />
            <MainComponent.ButtonHeader name="Recusar" func={refuse} icon={<CloseIcon />} color="red" />
        </div>
    )
})
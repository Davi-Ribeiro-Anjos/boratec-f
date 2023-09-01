import { IconButton, Tooltip, Whisper } from "rsuite";
import ArowBackIcon from '@rsuite/icons/ArowBack';
import SendIcon from '@rsuite/icons/Send';
import { styles } from "../../assets/styles";

import { useState, memo } from "react";

import { useNavigate } from "react-router-dom";
import { Payment } from ".";

interface PaymentHeaderProps { }


export const PaymentHeader = memo(function PaymentHeader({ }: PaymentHeaderProps) {
    console.log("header - payment")

    const navigate = useNavigate()

    const [send, setSend] = useState(false)

    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Voltar para Funcionários</Tooltip>}>
                <IconButton icon={<ArowBackIcon />} appearance="primary" color="cyan" style={styles.iconButton} onClick={() => navigate("/rh/funcionarios-pj")} />
            </Whisper>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Enviar Email</Tooltip>}>
                <IconButton icon={<SendIcon />} appearance="primary" color="blue" style={styles.iconButton} onClick={() => setSend(true)} />
            </Whisper>
            <Payment.Send open={send} setOpen={setSend} />
        </div>
    )
})
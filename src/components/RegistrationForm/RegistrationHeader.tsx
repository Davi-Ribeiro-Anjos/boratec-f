import { IconButton, Tooltip, Whisper } from "rsuite";
import MinusIcon from '@rsuite/icons/Minus';

import { useState, memo } from "react";
import { RegistrationForm } from ".";
import { styles } from "../../assets/styles";


interface RegistrationHeaderProps { }


export const RegistrationHeader = memo(function RegistrationHeader({ }: RegistrationHeaderProps) {
    console.log("painel solicitacao compra")

    const [open, setOpen] = useState(false)
    const demissionModal = () => {
        setOpen(true)
    }

    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Checar Demissão</Tooltip>}>
                <IconButton icon={<MinusIcon />} appearance="primary" color="red" style={styles.iconButton} onClick={demissionModal} />
            </Whisper>
            <RegistrationForm.Dismissal open={open} setOpen={setOpen} />
        </div>
    )
})
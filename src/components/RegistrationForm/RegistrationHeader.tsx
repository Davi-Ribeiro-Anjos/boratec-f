import { IconButton, Tooltip, Whisper } from "rsuite";
import MinusIcon from '@rsuite/icons/Minus';
import { styles } from "../../assets/styles";

import { useState, memo, useContext } from "react";
import { UserContext } from "../../providers/UserProviders";

import { RegistrationForm } from ".";


interface RegistrationHeaderProps { }


export const RegistrationHeader = memo(function RegistrationHeader({ }: RegistrationHeaderProps) {
    console.log("painel solicitacao compra")

    const { verifyPermission }: any = useContext(UserContext)

    const [open, setOpen] = useState(false)
    const demissionModal = () => {
        setOpen(true)
    }

    return (
        <div>
            {verifyPermission("employee_admin") && (
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Checar Demissão</Tooltip>}>
                    <IconButton icon={<MinusIcon />} appearance="primary" color="red" style={styles.iconButton} onClick={demissionModal} />
                </Whisper>
            )}
            <RegistrationForm.Dismissal open={open} setOpen={setOpen} />
        </div>
    )
})
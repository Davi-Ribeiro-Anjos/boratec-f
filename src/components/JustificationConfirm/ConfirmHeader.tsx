import { IconButton, Tooltip, Whisper } from "rsuite";
import ArowBackIcon from '@rsuite/icons/ArowBack';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

import { styles } from "../../assets/styles";

import { memo } from "react";
import { useNavigate } from "react-router-dom";


interface ConfirmHeaderProps {
}


export const ConfirmHeader = memo(function ConfirmHeader({ }: ConfirmHeaderProps) {
    const navigate = useNavigate()

    // const [openSend, setOpenSend] = useState(false)


    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Voltar para Justificativas</Tooltip>}>
                <IconButton icon={<ArowBackIcon />} appearance="primary" color="cyan" style={styles.iconButton} onClick={() => navigate("/comercial/justificativas")} />
            </Whisper>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Confirmar</Tooltip>}>
                <IconButton icon={<CheckIcon />} appearance="primary" color="green" style={styles.iconButton} onClick={() => { }} />
            </Whisper>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Recusar</Tooltip>}>
                <IconButton icon={<CloseIcon />} appearance="primary" color="red" style={styles.iconButton} onClick={() => { }} />
            </Whisper>
        </div>
    )
})
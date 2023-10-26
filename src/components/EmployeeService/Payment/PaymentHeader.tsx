import { IconButton, Tooltip, Whisper } from "rsuite";
import ArowBackIcon from '@rsuite/icons/ArowBack';
import SendIcon from '@rsuite/icons/Send';
// import FileDownloadIcon from '@rsuite/icons/FileDownload';
import { styles } from "../../../assets/styles";

import { useState, memo } from "react";

import { useNavigate } from "react-router-dom";
import { Payment } from ".";

interface PaymentHeaderProps {
    checkedKeys: number[];
}


export const PaymentHeader = memo(function PaymentHeader({ checkedKeys }: PaymentHeaderProps) {
    const navigate = useNavigate()

    const [openSend, setOpenSend] = useState(false)
    // const [openXlsx, setOpenXlsx] = useState(false)

    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Voltar para Funcionários</Tooltip>}>
                <IconButton icon={<ArowBackIcon />} appearance="primary" color="cyan" style={styles.iconButton} onClick={() => navigate("/rh/funcionarios-pj")} />
            </Whisper>
            {/* <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Gerar XLSX</Tooltip>}>
                <IconButton icon={<FileDownloadIcon />} appearance="primary" color="blue" style={styles.iconButton} onClick={() => setOpenXlsx(true)} />
            </Whisper> */}
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Enviar Email</Tooltip>}>
                <IconButton icon={<SendIcon />} appearance="primary" color="green" style={styles.iconButton} onClick={() => setOpenSend(true)} />
            </Whisper>
            <Payment.Send open={openSend} setOpen={setOpenSend} checkedKeys={checkedKeys} />
            {/* <Payment.Xlsx open={openXlsx} setOpen={setOpenXlsx} checkedKeys={checkedKeys} /> */}
        </div>
    )
})
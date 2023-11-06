import ArowBackIcon from '@rsuite/icons/ArowBack';
import SendIcon from '@rsuite/icons/Send';
// import FileDownloadIcon from '@rsuite/icons/FileDownload';

import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";

import { Payment } from ".";
import { MainComponent } from "../../Global/Component";

interface PaymentHeaderProps {
    checkedKeys: number[];
}


export const PaymentHeader = memo(function PaymentHeader({ checkedKeys }: PaymentHeaderProps) {
    const navigate = useNavigate()

    const [openSend, setOpenSend] = useState(false)
    // const [openXlsx, setOpenXlsx] = useState(false)

    return (
        <div>
            <MainComponent.ButtonHeader name="Voltar para Funcionários" func={() => navigate("/rh/funcionarios-pj")} icon={<ArowBackIcon />} color="cyan" />
            {/* <MainComponent.ButtonHeader name="Gerar XLSX" func={() => () => setOpenXlsx(true))} icon={<FileDownloadIcon />} color="blue" /> */}
            <MainComponent.ButtonHeader name="Enviar Email" func={() => () => setOpenSend(true)} icon={<SendIcon />} color="green" />

            <Payment.Send open={openSend} setOpen={setOpenSend} checkedKeys={checkedKeys} />
            {/* <Payment.Xlsx open={openXlsx} setOpen={setOpenXlsx} checkedKeys={checkedKeys} /> */}
        </div>
    )
})
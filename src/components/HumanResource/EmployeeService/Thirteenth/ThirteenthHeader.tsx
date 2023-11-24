import PlusIcon from '@rsuite/icons/Plus';
import ArowBackIcon from '@rsuite/icons/ArowBack';
import SendIcon from '@rsuite/icons/Send';

import { useState, memo } from "react";
import { useNavigate } from 'react-router-dom';

import { Thirteenth } from '.';
import { MainComponent } from "../../../Global/Component";

interface ThirteenthHeaderProps {
    checkedKeys: number[];
    setCheckedKeys: any;
}



export const ThirteenthHeader = memo(function ThirteenthHeader({ checkedKeys, setCheckedKeys }: ThirteenthHeaderProps) {
    const navigate = useNavigate()

    const [openCreate, setOpenCreate] = useState(false)
    const [openSend, setOpenSend] = useState(false)

    return (
        <div>
            <MainComponent.ButtonHeader name="Voltar para Funcionários PJ" func={() => navigate("/rh/funcionarios-pj")} icon={<ArowBackIcon />} color="cyan" />
            <MainComponent.ButtonHeader name="Novo 13º" func={() => setOpenCreate(true)} icon={<PlusIcon />} color="green" />
            <MainComponent.ButtonHeader name="Enviar Email" func={() => setOpenSend(true)} icon={<SendIcon />} color="blue" />
            <Thirteenth.Create open={openCreate} setOpen={setOpenCreate} />
            <Thirteenth.Send open={openSend} setOpen={setOpenSend} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} />
        </div>
    )
})
import PlusIcon from '@rsuite/icons/Plus';
import ArowBackIcon from '@rsuite/icons/ArowBack';
import SendIcon from '@rsuite/icons/Send';

import { useState, memo } from "react";
import { useNavigate } from 'react-router-dom';

import { MainComponent } from "../../Global/Component";
import { Thirteenth } from '.';

interface ThirteenthHeaderProps { }


export const ThirteenthHeader = memo(function ThirteenthHeader({ }: ThirteenthHeaderProps) {

    const navigate = useNavigate()

    const [openCreate, setOpenCreate] = useState(false)

    return (
        <div>
            <MainComponent.ButtonHeader name="Voltar para Funcionários PJ" func={() => navigate("/rh/funcionarios-pj")} icon={<ArowBackIcon />} color="cyan" />
            <MainComponent.ButtonHeader name="Novo 13º" func={() => setOpenCreate(true)} icon={<PlusIcon />} color="green" />
            <MainComponent.ButtonHeader name="Enviar Email" func={() => { }} icon={<SendIcon />} color="blue" />
            <Thirteenth.Create open={openCreate} setOpen={setOpenCreate} />
        </div>
    )
})
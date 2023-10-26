import { IconButton, Tooltip, Whisper } from 'rsuite';
import PlusIcon from '@rsuite/icons/Plus';
import ArowBackIcon from '@rsuite/icons/ArowBack';
import { styles } from '../../../assets/styles';

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
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Voltar para Funcionários PJ</Tooltip>}>
                <IconButton icon={<ArowBackIcon />} appearance="primary" color="cyan" style={styles.iconButton} onClick={() => navigate("/rh/funcionarios-pj")} />
            </Whisper>
            <MainComponent.ButtonHeader name="Novo 13º" setOpen={setOpenCreate} icon={<PlusIcon />} color="green" />
            <Thirteenth.Create open={openCreate} setOpen={setOpenCreate} />
        </div>
    )
})
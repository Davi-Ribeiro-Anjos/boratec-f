import { IconButton, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';

import { useState, memo } from "react";

import { EPIControl } from ".";
import { styles } from "../../assets/styles";

interface EPIControlHeaderProps { }


export const EPIControlHeader = memo(function EPIControlHeader({ }: EPIControlHeaderProps) {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Novo Grupo</Tooltip>}>
                <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconButton} onClick={() => setOpen(true)} />
            </Whisper>
            <EPIControl.CreateGroup open={open} setOpen={setOpen} />
        </div>
    )
})
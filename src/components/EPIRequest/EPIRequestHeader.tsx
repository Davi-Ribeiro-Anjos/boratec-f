import { IconButton, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';

import { useState, memo } from "react";

import { EPIRequest } from ".";
import { styles } from "../../assets/styles";

interface EPIRequestHeaderProps { }


export const EPIRequestHeader = memo(function EPIRequestHeader({ }: EPIRequestHeaderProps) {
    console.log("header control")

    const [open, setOpen] = useState(false)

    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Nova Solicitação</Tooltip>}>
                <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconButton} onClick={() => setOpen(true)} />
            </Whisper>
            <EPIRequest.Create open={open} setOpen={setOpen} />
        </div>
    )
})
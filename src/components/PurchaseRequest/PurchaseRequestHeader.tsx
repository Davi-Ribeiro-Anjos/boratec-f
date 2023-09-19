import { IconButton, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';

import { useState, memo } from "react";

import { PurchaseRequest } from ".";
import { styles } from "../../assets/styles";

interface PurchaseRequestHeaderProps {
    refetch: any;
}


export const PurchaseRequestHeader = memo(function PurchaseRequestHeader({ refetch }: PurchaseRequestHeaderProps) {
    const [open, setOpen] = useState(false)
    const createModal = () => {
        setOpen(true)
    }

    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Nova Solicitação</Tooltip>}>
                <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconButton} onClick={() => createModal()} />
            </Whisper>
            <PurchaseRequest.Create open={open} setOpen={setOpen} refetch={refetch} />
        </div>
    )
})
import { IconButton, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';

import { useState, memo } from "react";

import { CreatePurchaseRequest } from "./CreatePurchaseRequest";

interface HeaderPurchaseRequestProps { }

const styles: { [key: string]: React.CSSProperties } = {
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: 0
    }
}


export const HeaderPurchaseRequest = memo(function HeaderPurchaseRequest({ }: HeaderPurchaseRequestProps) {
    console.log("painel solicitacao compra")

    const [open, setOpen] = useState(false)
    const createModal = () => {
        setOpen(true)
    }

    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Nova Solicitação</Tooltip>}>
                <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={() => createModal()} />
            </Whisper>
            <CreatePurchaseRequest open={open} setOpen={setOpen} />
        </div>
    )
})
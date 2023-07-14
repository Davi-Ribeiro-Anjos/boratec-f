import { IconButton, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';

import { useState } from "react";

import CreatePurchaseRequest from "./createPurchaseRequest";

interface PanelPurchaseRequestProps { }

const styles: { [key: string]: React.CSSProperties } = {
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: 0
    }
}


export function PanelPurchaseRequest({ }: PanelPurchaseRequestProps) {
    console.log("painel solicitacao compra")

    const [open, setOpen] = useState(false)
    const createModal = () => {
        setOpen(true)
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Solicitações Compras</h2>
                <div>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Nova Solicitação</Tooltip>}>
                        <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={() => createModal()} />
                    </Whisper>
                </div>
            </div>
            <CreatePurchaseRequest open={open} setOpen={setOpen} />
        </>
    )
}
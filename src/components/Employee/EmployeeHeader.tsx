import { IconButton, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';

import { useState, memo } from "react";

import { Employee } from ".";

interface EmployeeHeaderProps {
}

const styles: { [key: string]: React.CSSProperties } = {
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: 0
    }
}


export const EmployeeHeader = memo(function EmployeeHeader({ }: EmployeeHeaderProps) {
    console.log("painel solicitacao compra")

    const [open, setOpen] = useState(false)
    const createModal = () => {
        setOpen(true)
    }

    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Nova Funcionário</Tooltip>}>
                <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={() => createModal()} />
            </Whisper>
            <Employee.Create open={open} setOpen={setOpen} />
        </div>
    )
})
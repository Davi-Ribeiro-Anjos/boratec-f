import { IconButton, Tooltip, Whisper } from "rsuite"
import PlusIcon from '@rsuite/icons/Plus';
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';

import { useState, memo } from "react";
import { PalletBranch } from ".";


interface BranchHeaderProps {
}

const styles: { [key: string]: React.CSSProperties } = {
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: "0 5px"
    },
}


export const BranchHeader = memo(
    function BranchHeader({ }: BranchHeaderProps) {
        console.log("filial header")

        const [openCreate, setOpenCreate] = useState(false);

        const [openInfo, setOpenInfo] = useState(false);

        return (
            <div>
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Solicitar Transferência</Tooltip>}>
                    <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={() => setOpenCreate(true)} />
                </Whisper>
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Quantidade por Filial</Tooltip>}>
                    <IconButton icon={<InfoOutlineIcon />} appearance="primary" color="cyan" style={styles.iconBu} onClick={() => setOpenInfo(true)} />
                </Whisper>
                <PalletBranch.CreateTransfer open={openCreate} setOpen={setOpenCreate} />
                <PalletBranch.Info open={openInfo} setOpen={setOpenInfo} />
            </div>
        )
    })
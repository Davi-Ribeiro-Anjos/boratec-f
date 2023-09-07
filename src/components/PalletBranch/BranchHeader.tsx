import { IconButton, Tooltip, Whisper } from "rsuite"
import PlusIcon from '@rsuite/icons/Plus';
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';
import { styles } from "../../assets/styles";

import { useState, memo } from "react";

import { PalletBranch } from ".";

interface BranchHeaderProps { }


export const BranchHeader = memo(
    function BranchHeader({ }: BranchHeaderProps) {
        console.log("filial header")

        const [openCreate, setOpenCreate] = useState(false);

        const [openInfo, setOpenInfo] = useState(false);

        return (
            <div>
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Solicitar Transferência</Tooltip>}>
                    <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconButton} onClick={() => setOpenCreate(true)} />
                </Whisper>
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Quantidade por Filial</Tooltip>}>
                    <IconButton icon={<InfoOutlineIcon />} appearance="primary" color="cyan" style={styles.iconButton} onClick={() => setOpenInfo(true)} />
                </Whisper>
                <PalletBranch.CreateTransfer open={openCreate} setOpen={setOpenCreate} />
                <PalletBranch.Info open={openInfo} setOpen={setOpenInfo} />
            </div>
        )
    })
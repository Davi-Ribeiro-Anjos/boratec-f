import { IconButton, Tooltip, Whisper } from "rsuite"
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import MemberIcon from '@rsuite/icons/Member';

import { useState, memo } from "react";
import { PalletClient } from ".";

interface ClientHeaderProps {
}

const styles: { [key: string]: React.CSSProperties } = {
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: "0 5px"
    },
}


export const ClientHeader = memo(
    function ClientHeader({ }: ClientHeaderProps) {
        console.log("client header")

        const [openCreate, setOpenCreate] = useState(false);

        const [openEntry, setOpenEntry] = useState(false);

        const [openExit, setOpenExit] = useState(false);

        return (
            <div>
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Cadastrar Entrada</Tooltip>}>
                    <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={() => setOpenEntry(true)} />
                </Whisper>
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Cadastrar Saída</Tooltip>}>
                    <IconButton icon={<MinusIcon />} appearance="primary" color="red" style={styles.iconBu} onClick={() => setOpenExit(true)} />
                </Whisper>
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Cadastrar Cliente</Tooltip>}>
                    <IconButton icon={<MemberIcon />} appearance="primary" color="green" style={styles.iconBu} onClick={() => setOpenCreate(true)} />
                </Whisper>
                <PalletClient.Create open={openCreate} setOpen={setOpenCreate} />
                <PalletClient.Entry open={openEntry} setOpen={setOpenEntry} />
                <PalletClient.Exit open={openExit} setOpen={setOpenExit} />
            </div>
        )
    })
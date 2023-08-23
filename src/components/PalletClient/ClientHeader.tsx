import { IconButton, Tooltip, Whisper } from "rsuite"
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import MemberIcon from '@rsuite/icons/Member';
import { styles } from "../../assets/styles";

import { useState, memo, useContext } from "react";

import { PalletClient } from ".";
import { UserContext } from "../../providers/UserProviders";

interface ClientHeaderProps { }


export const ClientHeader = memo(
    function ClientHeader({ }: ClientHeaderProps) {
        console.log("client header")

        const { verifyPermission }: any = useContext(UserContext)

        const [openCreate, setOpenCreate] = useState(false);

        const [openEntry, setOpenEntry] = useState(false);

        const [openExit, setOpenExit] = useState(false);

        return (
            <div>
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Cadastrar Entrada</Tooltip>}>
                    <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconButton} onClick={() => setOpenEntry(true)} />
                </Whisper>
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Cadastrar Saída</Tooltip>}>
                    <IconButton icon={<MinusIcon />} appearance="primary" color="red" style={styles.iconButton} onClick={() => setOpenExit(true)} />
                </Whisper>
                {verifyPermission("pallet_client_admin") && (
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Cadastrar Cliente</Tooltip>}>
                        <IconButton icon={<MemberIcon />} appearance="primary" color="green" style={styles.iconButton} onClick={() => setOpenCreate(true)} />
                    </Whisper>
                )}
                <PalletClient.Create open={openCreate} setOpen={setOpenCreate} />
                <PalletClient.Entry open={openEntry} setOpen={setOpenEntry} />
                <PalletClient.Exit open={openExit} setOpen={setOpenExit} />
            </div>
        )
    })
import PlusIcon from '@rsuite/icons/Plus';
import ExitIcon from '@rsuite/icons/Exit';
import MemberIcon from '@rsuite/icons/Member';

import { useState, memo, useContext } from "react";

import { PalletClient } from ".";
import { UserContext } from "../../../providers/UserProviders";
import { MainComponent } from "../../Global/Component";

interface ClientHeaderProps { }


export const ClientHeader = memo(
    function ClientHeader({ }: ClientHeaderProps) {
        const { verifyPermission }: any = useContext(UserContext)

        const [openCreate, setOpenCreate] = useState(false);

        const [openEntry, setOpenEntry] = useState(false);

        const [openExit, setOpenExit] = useState(false);

        return (
            <div>
                <MainComponent.ButtonHeader name="Cadastrar Entrada" func={() => setOpenEntry(true)} icon={<PlusIcon />} color="green" />
                <MainComponent.ButtonHeader name="Cadastrar Saída" func={() => setOpenExit(true)} icon={<ExitIcon />} color="red" />
                {verifyPermission("pallet_client_admin") && (
                    <MainComponent.ButtonHeader name="Cadastrar Cliente" func={() => setOpenCreate(true)} icon={<MemberIcon />} color="blue" />
                )}

                <PalletClient.Create open={openCreate} setOpen={setOpenCreate} />
                <PalletClient.Entry open={openEntry} setOpen={setOpenEntry} />
                <PalletClient.Exit open={openExit} setOpen={setOpenExit} />
            </div>
        )
    })
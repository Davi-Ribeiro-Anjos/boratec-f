import PlusIcon from '@rsuite/icons/Plus';
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';

import { useState, memo } from "react";

import { PalletBranch } from ".";
import { MainComponent } from "../../Global/Component";

interface BranchHeaderProps { }


export const BranchHeader = memo(
    function BranchHeader({ }: BranchHeaderProps) {
        const [openCreate, setOpenCreate] = useState(false);

        const [openInfo, setOpenInfo] = useState(false);

        return (
            <div>
                <MainComponent.ButtonHeader name="Solicitar Transferência" func={() => setOpenCreate(true)} icon={<PlusIcon />} color="green" />
                <MainComponent.ButtonHeader name="Quantidade por Filial" func={() => setOpenInfo(true)} icon={<InfoOutlineIcon />} color="cyan" />
                <PalletBranch.CreateTransfer open={openCreate} setOpen={setOpenCreate} />
                <PalletBranch.Info open={openInfo} setOpen={setOpenInfo} />
            </div>
        )
    })
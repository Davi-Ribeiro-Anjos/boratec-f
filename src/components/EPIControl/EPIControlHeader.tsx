import PlusIcon from '@rsuite/icons/Plus';

import { useState, memo } from "react";

import { EPIControl } from ".";
import { MainComponent } from "../Global/Component";

interface EPIControlHeaderProps { }


export const EPIControlHeader = memo(function EPIControlHeader({ }: EPIControlHeaderProps) {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <MainComponent.ButtonHeader name="Novo Grupo" func={() => setOpen(true)} icon={<PlusIcon />} color="green" />
            <EPIControl.CreateGroup open={open} setOpen={setOpen} />
        </div>
    )
})
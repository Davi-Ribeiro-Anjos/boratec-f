import PlusIcon from '@rsuite/icons/Plus';

import { useState, memo } from "react";

import { EPIRequest } from ".";
import { MainComponent } from "../Global/Component";

interface EPIRequestHeaderProps { }


export const EPIRequestHeader = memo(function EPIRequestHeader({ }: EPIRequestHeaderProps) {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <MainComponent.ButtonHeader name="Nova Solicitação" func={() => setOpen(true)} icon={<PlusIcon />} color="green" />
            <EPIRequest.Create open={open} setOpen={setOpen} />
        </div>
    )
})
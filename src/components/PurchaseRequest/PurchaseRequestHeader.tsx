import PlusIcon from '@rsuite/icons/Plus';

import { useState, memo } from "react";

import { PurchaseRequest } from ".";
import { MainComponent } from "../Global/Component";

interface PurchaseRequestHeaderProps {
    refetch: any;
}


export const PurchaseRequestHeader = memo(function PurchaseRequestHeader({ refetch }: PurchaseRequestHeaderProps) {
    const [open, setOpen] = useState(false)
    const createModal = () => {
        setOpen(true)
    }

    return (
        <div>
            <MainComponent.ButtonHeader name="Nova Solicitação" func={() => createModal()} icon={<PlusIcon />} color="green" />
            <PurchaseRequest.Create open={open} setOpen={setOpen} refetch={refetch} />
        </div>
    )
})
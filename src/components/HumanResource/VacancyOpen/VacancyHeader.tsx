import PlusIcon from '@rsuite/icons/Plus';

import { useState, memo } from "react";

import { MainComponent } from "../../Global/Component";
import { VacancyOpen } from ".";

interface VacancyHeaderProps {
    RolesChoices: any[];
}


export const VacancyHeader = memo(function VacancyHeader({ RolesChoices }: VacancyHeaderProps) {
    const [openCreate, setOpenCreate] = useState(false)

    return (
        <div>
            <MainComponent.ButtonHeader name="Adicionar Vaga" func={() => setOpenCreate(true)} icon={<PlusIcon />} color="green" />
            <VacancyOpen.Create open={openCreate} setOpen={setOpenCreate} RolesChoices={RolesChoices} />
        </div>
    )
})
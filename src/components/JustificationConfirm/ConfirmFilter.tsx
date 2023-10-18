import { BranchesChoices } from "../../services/Choices";

import { MainComponent } from "../Global/Component";

interface ConfirmFilterProps {
}


export function ConfirmFilter({ }: ConfirmFilterProps) {

    return (
        <>
            <MainComponent.Row>
                <MainComponent.DateRangePicker text="Período:" name="date_emission" />
                <MainComponent.SelectPicker text="Filial:" name="id_garage" data={BranchesChoices} showHelpText={false} />
            </MainComponent.Row>
        </>
    )
}
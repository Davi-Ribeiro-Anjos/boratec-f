import { BranchesChoices } from "../../services/Choices";

import { MainFormComponent } from "../Global/Component/Form";

interface ConfirmFilterProps {
}


export function ConfirmFilter({ }: ConfirmFilterProps) {

    return (
        <>
            <MainFormComponent.Row>
                <MainFormComponent.DateRangePicker text="Período:" name="date_emission" />
                <MainFormComponent.SelectPicker text="Filial:" name="id_garage" data={BranchesChoices} showHelpText={false} />
            </MainFormComponent.Row>
        </>
    )
}
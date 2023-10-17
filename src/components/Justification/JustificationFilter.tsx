import { BranchesChoices } from "../../services/Choices";

import { MainComponent } from "../Global/Component";

interface JustificationFilterProps {
    filter: any;
    setFilter: (value: any) => void;
}


export function JustificationFilter({ filter, setFilter }: JustificationFilterProps) {

    return (
        <>
            <MainComponent.Row>
                <MainComponent.DateRangePicker text="Período:" name="date_emission" />
                <MainComponent.SelectPicker text="Filial:" name="branch_id" data={BranchesChoices} showHelpText={false} />
            </MainComponent.Row>
            <MainComponent.Row>
                <MainComponent.Checkbox text="Confirmar Justificativa:" name="confirmed" filter={filter} setFilter={setFilter} />
            </MainComponent.Row>
        </>
    )
}
import { DateRangePicker } from "rsuite";
import { BranchesChoices } from "../../services/Choices";

import { MainComponent } from "../Global/Component";

interface JustificationFilterProps {
}

const { allowedMaxDays, afterToday, combine }: any = DateRangePicker


export function JustificationFilter({ }: JustificationFilterProps) {

    return (
        <>
            <MainComponent.Row>
                <MainComponent.DateRangePicker text="Período:" name="date_emission" shouldDisableDate={combine(allowedMaxDays(7), afterToday())} />
                <MainComponent.SelectPicker text="Filial:" name="id_garage" data={BranchesChoices} showHelpText={false} />
            </MainComponent.Row>
        </>
    )
}
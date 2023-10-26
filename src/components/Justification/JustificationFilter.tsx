import { DateRangePicker } from "rsuite";
import { BranchesChoices } from "../../services/Choices";

import { MainFormComponent } from "../Global/Component/Form";

interface JustificationFilterProps {
}

const { allowedMaxDays, afterToday, combine }: any = DateRangePicker


export function JustificationFilter({ }: JustificationFilterProps) {

    return (
        <>
            <MainFormComponent.Row>
                <MainFormComponent.DateRangePicker text="Período:" name="date_emission" shouldDisableDate={combine(allowedMaxDays(7), afterToday())} />
                <MainFormComponent.SelectPicker text="Filial:" name="id_garage" data={BranchesChoices} showHelpText={false} />
            </MainFormComponent.Row>
        </>
    )
}
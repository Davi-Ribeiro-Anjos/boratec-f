import { DateRangePicker } from "rsuite";


import { BranchesChoices } from "../../../services/Choices";

import { MainFormComponent } from "../../Global/Component/Form";


interface PerformanceFilterProps { }

const { allowedMaxDays, afterToday, combine }: any = DateRangePicker


export function PerformanceFilter({ }: PerformanceFilterProps) {

    return (
        <MainFormComponent.Row>
            <MainFormComponent.DateRangePicker text="Período:" name="date_emission" shouldDisableDate={combine(allowedMaxDays(20), afterToday())} />
            <MainFormComponent.SelectPicker text="Filial:" name="branch_destination" data={BranchesChoices} showHelpText={false} />
        </MainFormComponent.Row>
    )
}
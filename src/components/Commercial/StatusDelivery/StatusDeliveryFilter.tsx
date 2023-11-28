import { DateRangePicker } from "rsuite";


import { BranchesChoices } from "../../../services/Choices";

import { MainFormComponent } from "../../Global/Component/Form";


interface StatusDeliveryFilterProps { }

const { allowedMaxDays, afterToday, combine }: any = DateRangePicker


export function StatusDeliveryFilter({ }: StatusDeliveryFilterProps) {

    return (
        <>
            <MainFormComponent.Row>
                <MainFormComponent.Input text="Remetente:" name="sender__contains" showHelpText={false} />
                <MainFormComponent.Input text="Destinatário:" name="recipient__contains" showHelpText={false} />
            </MainFormComponent.Row>
            <MainFormComponent.Row>
                <MainFormComponent.DateRangePicker text="Período:" name="date_emission" shouldDisableDate={combine(allowedMaxDays(20), afterToday())} />
                <MainFormComponent.SelectPicker text="Filial:" name="branch_destination" data={BranchesChoices} showHelpText={false} />
            </MainFormComponent.Row>
        </>
    )
}
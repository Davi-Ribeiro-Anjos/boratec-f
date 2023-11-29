import { DateRangePicker } from "rsuite";
import { BranchesChoices } from "../../../services/Choices";

import { useContext } from "react";

import { MainFormComponent } from "../../Global/Component/Form";
import { UserContext } from "../../../providers/UserProviders";

interface JustificationFilterProps {
}

const { allowedMaxDays, afterToday, combine }: any = DateRangePicker


export function JustificationFilter({ }: JustificationFilterProps) {
    const { verifyPermission }: any = useContext(UserContext)

    return (
        <>
            <MainFormComponent.Row>
                <MainFormComponent.DateRangePicker text="Período:" name="date_emission" shouldDisableDate={combine(allowedMaxDays(7), afterToday())} />
                {verifyPermission("delivery_history_filter") && (
                    <MainFormComponent.SelectPicker text="Filial:" name="branch_destination" data={BranchesChoices} showHelpText={false} />
                )}
            </MainFormComponent.Row>
        </>
    )
}
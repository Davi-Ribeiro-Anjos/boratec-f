import { BranchesChoices, StatusEmployeeChoices } from "../../services/Choices";

import { MainFormComponent } from "../Global/Component/Form";

interface EmployeeFilterProps { }


export function EmployeeFilter({ }: EmployeeFilterProps) {

    return (
        <>
            <MainFormComponent.Row>
                <MainFormComponent.Input text="Funcionário:" name="name__contains" showHelpText={false} />
                <MainFormComponent.SelectPicker text="Filial:" name="branch" data={BranchesChoices} showHelpText={false} />
            </MainFormComponent.Row>
            <MainFormComponent.Row>
                <MainFormComponent.SelectPicker text="Status:" name="status" data={StatusEmployeeChoices} showHelpText={false} />
            </MainFormComponent.Row>
        </>
    )
}
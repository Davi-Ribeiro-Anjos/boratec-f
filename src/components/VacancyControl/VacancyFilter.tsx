import { useContext } from 'react'

import { UserContext } from "../../providers/UserProviders";
import { StatusEmployeeChoices } from "../../services/Choices";

import { MainFormComponent } from "../Global/Component/Form";

interface VacancyFilterProps { }


export function VacancyFilter({ }: VacancyFilterProps) {
    const { verifyPermission }: any = useContext(UserContext)

    return (
        <>
            <MainFormComponent.Row>
                <MainFormComponent.SelectPicker text="Status:" name="status" data={StatusEmployeeChoices} showHelpText={false} />
            </MainFormComponent.Row>
            {verifyPermission("")}
        </>
    )
}
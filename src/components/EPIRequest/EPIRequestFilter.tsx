import { useContext } from 'react'

import { UserContext } from "../../providers/UserProviders";
import { StockChoices, BranchesChoices } from "../../services/Choices";

import { MainFormComponent } from "../Global/Component/Form";

interface EPIRequestFilterProps { }


export function EPIRequestFilter({ }: EPIRequestFilterProps) {
    const { userChoices }: any = useContext(UserContext)


    return (
        <>
            <MainFormComponent.Row>
                <MainFormComponent.Input text="Funcionario:" name="employee" showHelpText={false} />
                <MainFormComponent.SelectPicker text="Solicitante:" name="author_create" data={userChoices} showHelpText={false} />
            </MainFormComponent.Row>
            <MainFormComponent.Row>
                <MainFormComponent.SelectPicker text="Filial:" name="branch" data={BranchesChoices} showHelpText={false} />
                <MainFormComponent.SelectPicker text="Status:" name="status" data={StockChoices} showHelpText={false} />
            </MainFormComponent.Row>
            <MainFormComponent.Row>
                <MainFormComponent.DatePicker text="Data Solicitação:" name="date_requested" showHelpText={false} />
            </MainFormComponent.Row>
        </>
    )
}
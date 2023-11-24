import { MainFormComponent } from "../Global/Component/Form";

interface ManualFilterProps {
    SystemsChoices: any[];
    ModulesChoices: any[];
}


export function ManualFilter({ SystemsChoices, ModulesChoices }: ManualFilterProps) {

    return (
        <>
            <MainFormComponent.Row>
                <MainFormComponent.Input text="Título:" name="title__contains" showHelpText={false} />
                <MainFormComponent.SelectPicker text="Módulo:" name="module" data={ModulesChoices} showHelpText={false} />
            </MainFormComponent.Row>
            <MainFormComponent.Row>
                <MainFormComponent.SelectPicker text="Sistema:" name="system" data={SystemsChoices} showHelpText={false} />
            </MainFormComponent.Row>
        </>
    )
}
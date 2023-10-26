import { MainFormComponent } from "../Global/Component/Form";

interface ManualFilterProps {
    SystemsChoices: any[];
}


export function ManualFilter({ SystemsChoices }: ManualFilterProps) {

    return (
        <>
            <MainFormComponent.Row>
                <MainFormComponent.Input text="Título:" name="title__contains" showHelpText={false} />
                <MainFormComponent.Input text="Módulo" name="module__contains" showHelpText={false} />
            </MainFormComponent.Row>
            <MainFormComponent.Row>
                <MainFormComponent.SelectPicker text="Sistema:" name="system" data={SystemsChoices} showHelpText={false} />
            </MainFormComponent.Row>
        </>
    )
}
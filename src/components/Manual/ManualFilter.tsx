import { MainComponent } from "../Global/Component";

interface ManualFilterProps {
    SystemsChoices: any[];
}


export function ManualFilter({ SystemsChoices }: ManualFilterProps) {

    return (
        <>
            <MainComponent.Row>
                <MainComponent.Input text="Título:" name="title__contains" showHelpText={false} />
                <MainComponent.Input text="Módulo" name="module__contains" showHelpText={false} />
            </MainComponent.Row>
            <MainComponent.Row>
                <MainComponent.SelectPicker text="Sistema:" name="system" data={SystemsChoices} showHelpText={false} />
            </MainComponent.Row>
        </>
    )
}
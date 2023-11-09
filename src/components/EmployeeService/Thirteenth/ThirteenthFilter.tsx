import { MainFormComponent } from "../../Global/Component/Form";

interface ThirteenthFilterProps {
    filter: any;
    setFilter: any;
}


export function ThirteenthFilter({ filter, setFilter }: ThirteenthFilterProps) {

    return (
        <MainFormComponent.Row>
            <MainFormComponent.Input text="Funcionário:" name="employee__name__contains" showHelpText={false} />
            <MainFormComponent.Checkbox text="Enviado:" name="send" filter={filter} setFilter={setFilter} showHelpText={false} />
        </MainFormComponent.Row>
    )
}
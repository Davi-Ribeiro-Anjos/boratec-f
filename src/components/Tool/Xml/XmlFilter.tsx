import { DateRangePicker } from "rsuite";


import { MainFormComponent } from "../../Global/Component/Form";

interface XmlFilterProps {
    senders: string[];
}

const { afterToday }: any = DateRangePicker;

export function XmlFilter({ senders }: XmlFilterProps) {

    const SendersChoices = senders.map(item => ({ label: item, value: item }))

    return (
        <>
            <MainFormComponent.Row>
                <MainFormComponent.DateRangePicker text="Data Emissão:" name="date_emission" shouldDisableDate={afterToday()} />
                <MainFormComponent.DateRangePicker text="Data Importação:" name="date_published" shouldDisableDate={afterToday()} />
            </MainFormComponent.Row>
            <MainFormComponent.Row>
                <MainFormComponent.SelectPicker text="Remetente" name="sender" data={SendersChoices} showHelpText={false} />
            </MainFormComponent.Row>
        </>
    )
}
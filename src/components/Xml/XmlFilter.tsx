import { DateRangePicker } from "rsuite";


import { MainComponent } from "../Global/Component";

interface XmlFilterProps {
    senders: string[];
}

const { afterToday }: any = DateRangePicker;

export function XmlFilter({ senders }: XmlFilterProps) {

    const SendersChoices = senders.map(item => ({ label: item, value: item }))

    return (
        <>
            <MainComponent.Row>
                <MainComponent.DateRangePicker text="Data Emissão:" name="date_emission" shouldDisableDate={afterToday()} />
                <MainComponent.DateRangePicker text="Data Importação:" name="date_published" shouldDisableDate={afterToday()} />
            </MainComponent.Row>
            <MainComponent.Row>
                <MainComponent.SelectPicker text="Remetente" name="sender" data={SendersChoices} showHelpText={false} />
            </MainComponent.Row>
        </>
    )
}
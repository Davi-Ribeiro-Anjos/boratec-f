import { Col, Form, DateRangePicker } from "rsuite";
import { styles } from "../../../../assets/styles";
import { DefaultComponentFormInterface } from "../../../../services/Interfaces";

interface DateRangePickerInterface extends DefaultComponentFormInterface {
    shouldDisableDate?: any;
}


export default function MainDateRangePicker({ shouldDisableDate, helpText = "Obrigatório", showHelpText = false, tooltip = true, ...props }: DateRangePickerInterface) {
    return (
        <Col xs={24} md={12}>
            <Form.Group>
                <Form.ControlLabel>{props.text}</Form.ControlLabel>
                <Form.Control style={styles.input} name={props.name} format='dd/MM/yyyy' placeholder="SELECIONE A DATA INICIAL E FINAL" shouldDisableDate={shouldDisableDate ? shouldDisableDate : null} accepter={DateRangePicker} />
                {showHelpText &&
                    <Form.HelpText tooltip={tooltip}>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
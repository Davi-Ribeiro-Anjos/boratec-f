import { Col, Form, DatePicker } from "rsuite";
import { styles } from "../../../../assets/styles";
import { DefaultComponentFormInterface } from "../../../../services/Interfaces";

interface DatePickerInterface extends DefaultComponentFormInterface {
    shouldDisableDate?: any;
}


export default function MainDatePicker({ shouldDisableDate, helpText = "Obrigatório", showHelpText = false, tooltip = true, ...props }: DatePickerInterface) {
    return (
        <Col xs={24} md={12}>
            <Form.Group>
                <Form.ControlLabel>{props.text}</Form.ControlLabel>
                <Form.Control style={styles.input} name={props.name} format='dd/MM/yyyy' placeholder="SELECIONE UMA DATA" shouldDisableDate={shouldDisableDate ? shouldDisableDate : null} accepter={DatePicker} />
                {showHelpText &&
                    <Form.HelpText tooltip={tooltip}>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
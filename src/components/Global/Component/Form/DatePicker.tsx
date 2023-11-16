import { Col, Form, DatePicker, DateRangePickerProps, ColProps } from "rsuite";
import { styles } from "../../../../assets/styles";

import { DefaultComponentFormInterface } from "../../../../services/Interfaces";

interface DatePickerInterface extends DateRangePickerProps, ColProps, DefaultComponentFormInterface {
    shouldDisableDate?: any;
    name: string;
}


export default function MainDatePicker({ shouldDisableDate, helpText = "Obrigatório", showHelpText = false, tooltip = true, ...props }: DatePickerInterface) {
    return (
        <Col xs={24} md={props.md ? props.md : 12}>
            <Form.Group>
                <Form.ControlLabel>{props.text}</Form.ControlLabel>
                <Form.Control style={props.style ? props.style : styles.input} name={props.name} format='dd/MM/yyyy' placeholder="SELECIONE UMA DATA" shouldDisableDate={shouldDisableDate ? shouldDisableDate : null} accepter={DatePicker} />
                {showHelpText &&
                    <Form.HelpText tooltip={tooltip}>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
import { Col, ColProps, Form, SelectPicker, SelectPickerProps } from "rsuite";
import { styles } from "../../../../assets/styles";

import { DefaultComponentFormInterface } from "../../../../services/Interfaces";

interface SelectPickerInterface extends SelectPickerProps<any>, ColProps, DefaultComponentFormInterface {
    name: string;
}


export default function MainSelectPicker({ helpText = "Obrigatório", showHelpText = true, tooltip = true, ...props }: SelectPickerInterface) {
    return (
        <Col xs={24} md={props.md ? props.md : 12}>
            <Form.Group>
                <Form.ControlLabel>{props.text}</Form.ControlLabel>
                <Form.Control style={props.style ? props.style : styles.input} name={props.name} data={props.data} accepter={SelectPicker} />
                {showHelpText &&
                    <Form.HelpText tooltip={tooltip}>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
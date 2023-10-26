import { Col, Form, SelectPicker } from "rsuite";
import { styles } from "../../../../assets/styles";

import { DefaultComponentFormDataInterface } from "../../../../services/Interfaces";

interface SelectPickerInterface extends DefaultComponentFormDataInterface { }


export default function MainSelectPicker({ helpText = "Obrigatório", showHelpText = true, tooltip = true, ...props }: SelectPickerInterface) {
    return (
        <Col xs={24} md={12}>
            <Form.Group>
                <Form.ControlLabel>{props.text}</Form.ControlLabel>
                <Form.Control style={styles.input} name={props.name} data={props.data} accepter={SelectPicker} />
                {showHelpText &&
                    <Form.HelpText tooltip={tooltip}>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
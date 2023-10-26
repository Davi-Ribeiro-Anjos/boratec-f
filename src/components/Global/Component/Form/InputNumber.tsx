import { Col, Form, InputNumber } from "rsuite";
import { styles } from "../../../../assets/styles";

import { DefaultComponentFormInterface } from "../../../../services/Interfaces";

interface InputNumberInterface extends DefaultComponentFormInterface { }


export default function MainInputNumber({ helpText = "Obrigatório", showHelpText = true, tooltip = true, ...props }: InputNumberInterface) {
    return (
        <Col xs={24} md={12}>
            <Form.Group>
                <Form.ControlLabel>{props.text}</Form.ControlLabel>
                <Form.Control style={styles.input} name={props.name} accepter={InputNumber} min={0} />
                {showHelpText &&
                    <Form.HelpText tooltip={tooltip}>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
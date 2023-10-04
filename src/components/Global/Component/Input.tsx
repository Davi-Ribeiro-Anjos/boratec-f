import { Col, Form, Input } from "rsuite";
import { styles } from "../../../assets/styles";

import { DefaultComponentFormInterface } from "../../../services/Interfaces";

interface InputInterface extends DefaultComponentFormInterface { }


export default function MainInput({ helpText = "Obrigatório", showHelpText = true, tooltip = true, ...props }: InputInterface) {
    return (
        <Col xs={24} md={12}>
            <Form.Group>
                <Form.ControlLabel>{props.text}</Form.ControlLabel>
                <Form.Control style={styles.input} name={props.name} accepter={Input} />
                {showHelpText &&
                    <Form.HelpText tooltip={tooltip}>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
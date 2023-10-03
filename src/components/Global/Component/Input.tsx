import { Col, Form, InputNumber } from "rsuite";
import { styles } from "../../../assets/styles";

interface InputInterface {
    text: string;
    name: string;
    helpText?: string;
    showHelpText?: boolean;
}


export default function MainInput({ text, name, helpText = "Obrigatório", showHelpText = true }: InputInterface) {
    return (
        <Col xs={24} md={12}>
            <Form.Group>
                <Form.ControlLabel>{text}</Form.ControlLabel>
                <Form.Control style={styles.input} name={name} accepter={InputNumber} />
                {showHelpText &&
                    <Form.HelpText tooltip>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
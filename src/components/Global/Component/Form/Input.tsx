import { Col, ColProps, Form, Input, InputProps } from "rsuite";
import { styles } from "../../../../assets/styles";

import { DefaultComponentFormInterface } from "../../../../services/Interfaces";

interface InputInterface extends InputProps, ColProps, DefaultComponentFormInterface {
    name: string;
}


export default function MainInput({ helpText = "Obrigatório", showHelpText = true, tooltip = true, ...props }: InputInterface) {
    return (
        <Col xs={24} md={props.md ? props.md : 12}>
            <Form.Group>
                <Form.ControlLabel>{props.text}</Form.ControlLabel>
                <Form.Control style={props.style ? props.style : styles.input} name={props.name} accepter={Input} value={props.value} readOnly={props.readOnly} />
                {showHelpText &&
                    <Form.HelpText tooltip={tooltip}>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
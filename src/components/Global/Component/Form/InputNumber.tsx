import { Col, ColProps, Form, InputNumber, InputNumberProps } from "rsuite";
import { styles } from "../../../../assets/styles";

import { DefaultComponentFormInterface } from "../../../../services/Interfaces";

interface InputNumberInterface extends DefaultComponentFormInterface, InputNumberProps, ColProps {
    name: string;
}


export default function MainInputNumber({ helpText = "Obrigatório", showHelpText = true, tooltip = true, ...props }: InputNumberInterface) {
    return (
        <Col xs={24} md={props.md ? props.md : 12}>
            <Form.Group>
                <Form.ControlLabel>{props.text}</Form.ControlLabel>
                <Form.Control style={props.style ? props.style : styles.input} name={props.name} readOnly={props.readOnly} accepter={InputNumber} min={0} />
                {showHelpText &&
                    <Form.HelpText tooltip={tooltip}>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
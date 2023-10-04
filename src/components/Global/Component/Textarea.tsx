import { Col, Form, Input } from "rsuite";
import { styles } from "../../../assets/styles";

import { forwardRef } from "react"

import { DefaultComponentFormInterface } from "../../../services/Interfaces";

const Textarea = forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />)

interface TextareaInterface extends DefaultComponentFormInterface { }


export default function MainTextarea({ helpText = "Obrigatório", showHelpText = false, tooltip = true, ...props }: TextareaInterface) {
    return (
        <Col xs={24} md={24}>
            <Form.Group>
                <Form.ControlLabel>{props.text}</Form.ControlLabel>
                <Form.Control style={styles.input} name={props.name} rows={7} accepter={Textarea} />
                {showHelpText &&
                    <Form.HelpText tooltip={tooltip}>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
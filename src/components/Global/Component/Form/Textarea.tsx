import { Col, ColProps, Form, Input, InputProps } from "rsuite";
import { styles } from "../../../../assets/styles";

import { forwardRef } from "react"

import { DefaultComponentFormInterface } from "../../../../services/Interfaces";

const Textarea = forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />)

interface TextareaInterface extends InputProps, ColProps, DefaultComponentFormInterface {
    name: string;
}


export default function MainTextarea({ name, helpText = "Obrigatório", showHelpText = false, tooltip = true, ...props }: TextareaInterface) {
    return (
        <Col xs={24} md={props.md ? props.md : 12}>
            <Form.Group>
                <Form.ControlLabel>{props.text}</Form.ControlLabel>
                <Form.Control style={props.style ? props.style : styles.input} name={name} rows={7} accepter={Textarea} />
                {showHelpText &&
                    <Form.HelpText tooltip={tooltip}>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
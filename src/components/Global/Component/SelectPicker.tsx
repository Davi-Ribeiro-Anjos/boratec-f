import { Col, Form, SelectPicker } from "rsuite";
import { styles } from "../../../assets/styles";

interface DataInterface {
    label: string;
    value: string | number;
}


interface SelectPickerInterface {
    text: string;
    name: string;
    data: DataInterface[];
    helpText?: string;
    showHelpText?: boolean;
}

export default function MainSelectPicker({ text, name, data, helpText = "Obrigatório", showHelpText = true }: SelectPickerInterface) {
    return (
        <Col xs={24} md={12}>
            <Form.Group>
                <Form.ControlLabel>{text}</Form.ControlLabel>
                <Form.Control style={styles.input} name={name} data={data} accepter={SelectPicker} />
                {showHelpText &&
                    <Form.HelpText tooltip>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
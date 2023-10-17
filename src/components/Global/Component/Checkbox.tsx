import { Col, Form, Checkbox } from "rsuite";
import { styles } from "../../../assets/styles";
import { DefaultComponentFormInterface } from "../../../services/Interfaces";

interface CheckboxInterface extends DefaultComponentFormInterface {
    filter: any;
    setFilter: (value: any) => void;
}


export default function MainCheckbox({ filter, setFilter, helpText = "Obrigatório", showHelpText = false, tooltip = true, ...props }: CheckboxInterface) {
    return (
        <Col xs={24} md={12}>
            <Form.Group>
                <Form.ControlLabel>{props.text}</Form.ControlLabel>
                <Form.Control style={styles.input} name={props.name} checked={filter[props.name]} accepter={Checkbox} onChange={(value) => {
                    filter[props.name] = !value
                    setFilter({ ...filter })
                }} />
                {showHelpText &&
                    <Form.HelpText tooltip={tooltip}>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
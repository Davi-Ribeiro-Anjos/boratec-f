import { Col, Form, InputNumber, InputPicker, Row, SelectPicker } from "rsuite"
import { styles } from "../../assets/styles";
import { StatusChoices } from "../../services/Choices";

interface EPIRequestFilterProps { }


export function EPIRequestFilter({ }: EPIRequestFilterProps) {

    return (
        <Row style={styles.row}>
            <Col xs={24}>
                <Form.Group >
                    <Form.ControlLabel>Status: </Form.ControlLabel>
                    <Form.Control style={styles.input} name="status" data={StatusChoices} accepter={SelectPicker} />
                </Form.Group>
            </Col>
        </Row>
    )
}
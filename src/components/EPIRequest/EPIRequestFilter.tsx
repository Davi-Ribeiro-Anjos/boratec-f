import { Col, Form, InputNumber, Row } from "rsuite"
import { styles } from "../../assets/styles";

interface EPIRequestFilterProps { }


export function EPIRequestFilter({ }: EPIRequestFilterProps) {

    return (
        <Row style={styles.row}>
            <Col xs={24}>
                <Form.Group >
                    <Form.ControlLabel>Status: </Form.ControlLabel>
                    <Form.Control style={styles.input} name="nf" accepter={InputNumber} />
                </Form.Group>
            </Col>
        </Row>
    )
}
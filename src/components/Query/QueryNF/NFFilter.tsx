import { Col, Form, InputNumber, Row } from "rsuite"
import { styles } from "../../../assets/styles";

interface NFFilterProps { }


export function NFFilter({ }: NFFilterProps) {
    return (
        <Row style={styles.row}>
            <Col xs={24}>
                <Form.Group >
                    <Form.ControlLabel>Nota Fiscal: </Form.ControlLabel>
                    <Form.Control style={styles.input} name="nf" accepter={InputNumber} />
                </Form.Group>
            </Col>
        </Row>
    )
}
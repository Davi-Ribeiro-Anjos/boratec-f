import { Col, Form, Row, SelectPicker } from "rsuite"
import { styles } from "../../assets/styles";
import { BranchesChoices } from "../../services/Choices";

interface FleetAvailabilityFilterProps { }


export function FleetAvailabilityFilter({ }: FleetAvailabilityFilterProps) {
    return (
        <Row style={styles.row}>
            <Col xs={24}>
                <Form.Group >
                    <Form.ControlLabel>Filial: </Form.ControlLabel>
                    <Form.Control style={styles.input} name="branch_id" data={BranchesChoices} accepter={SelectPicker} />
                </Form.Group>
            </Col>
        </Row>
    )
}
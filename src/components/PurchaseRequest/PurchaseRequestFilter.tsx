import { Col, DateRangePicker, Form, InputNumber, InputPicker, Row, SelectPicker } from "rsuite"
import { styles } from "../../assets/styles";

import { useContext } from "react"

import { BranchesChoices, StatusChoices } from "../../services/Choices";
import { UserContext } from "../../providers/UserProviders";

interface PurchaseRequestFilterProps { }


export function PurchaseRequestFilter({ }: PurchaseRequestFilterProps) {
    const { userChoices } = useContext<any>(UserContext)

    return (
        <>
            <Row style={styles.row}>
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Número Solicitação: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="number_request" accepter={InputNumber} min={0} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Solicitante: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="requester" data={userChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Data Solicitação: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="date_request" format='dd-MM-yyyy' placeholder="Selecione a data Inicial e Final" accepter={DateRangePicker} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Status: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="status" data={StatusChoices} accepter={InputPicker} />
                    </Form.Group>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Filial: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="branch" data={BranchesChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}
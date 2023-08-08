import { Col, DateRangePicker, Form, InputNumber, InputPicker, Row, SelectPicker } from "rsuite"

import { useContext } from "react"

import { BranchesChoices, StatusChoices } from "../../services/Choices";
import { UserContext } from "../../providers/UserProviders";

interface PurchaseRequestFilterProps { }

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 300,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
}


export function PurchaseRequestFilter({ }: PurchaseRequestFilterProps) {
    const { userChoices } = useContext<any>(UserContext)

    return (
        <>
            <Row style={styles.row}>
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Número Solicitação: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="numero_solicitacao" accepter={InputNumber} min={0} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Solicitante: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="solicitante" data={userChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Data Solicitação: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="data_solicitacao_bo" placeholder="Selecione a data Inicial e Final" accepter={DateRangePicker} />
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
                        <Form.Control style={styles.input} name="filial" data={BranchesChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}
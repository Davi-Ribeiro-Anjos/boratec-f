import { Col, DateRangePicker, Form, InputNumber, InputPicker, Row, SelectPicker } from "rsuite"

import { branches } from "../../services/choices";


const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 250,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
}

const typePallet = ["PBR", "CHEP"].map(item => ({ label: item, value: item }));

export function FilterPurchaseRequest() {

    return (
        <>
            <Row style={styles.row}>
                <Col xs={12}>
                    <Form.Group >
                        <Form.ControlLabel>Número Solicitação: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="numero_solicitacao" accepter={InputNumber} min={0} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group >
                        <Form.ControlLabel>Solicitante: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="solicitante" data={typePallet} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col xs={12}>
                    <Form.Group >
                        <Form.ControlLabel>Data Solicitação: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="data_solicitacao_bo" placeholder="Selecione a data Inicial e Final" accepter={DateRangePicker} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group >
                        <Form.ControlLabel>Status: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="status" data={typePallet} accepter={InputPicker} />
                    </Form.Group>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col xs={12}>
                    <Form.Group >
                        <Form.ControlLabel>Filial: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="filial" data={branches} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}
import { Button, Col, DateRangePicker, Form, Grid, InputNumber, InputPicker, Row, SelectPicker } from "rsuite"

import { MainPanel } from "../panel"

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 200,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
}

const { afterToday } = DateRangePicker;


export function FilterPurchaseRequest() {

    const filter = {}

    const getByFilter = () => {
        console.log("filtrei")
    }

    const clearFilter = () => {
        console.log("limpei")
    }

    return (
        <MainPanel title="Filtros" width={100} collapsible={true} bordered={true}>
            <Grid style={{ width: "100%" }}>
                <Form fluid onSubmit={getByFilter} formValue={filter}>
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
                                <Form.Control style={styles.input} name="solicitante" accepter={SelectPicker} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Data Solicitação: </Form.ControlLabel>
                                <Form.Control style={styles.input} name="data_solicitacao_bo" placeholder="Selecione a data Inicial e Final" shouldDisableDate={afterToday()} accepter={DateRangePicker} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Status: </Form.ControlLabel>
                                <Form.Control style={styles.input} name="status" accepter={InputPicker} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Filial: </Form.ControlLabel>
                                <Form.Control style={styles.input} name="filial" accepter={SelectPicker} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col xs={20}></Col>
                    <Col xs={2}>
                        <Button type="submit" appearance="primary">
                            Filtrar
                        </Button>
                    </Col>
                    <Col xs={2}>
                        <Button onClick={() => clearFilter()}>
                            Limpar
                        </Button>
                    </Col>
                </Row>
            </Grid >
        </MainPanel >
    )
}
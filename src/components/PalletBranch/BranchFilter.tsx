import { Checkbox, Col, Form, Input, Row, SelectPicker } from "rsuite"

import { useContext } from "react"

import { UserContext } from "../../providers/UserProviders";
import { BranchesChoices } from "../../services/Choices";

interface BranchFilterProps {
    filter: any;
    setFilter: (value: any) => void;
}

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 300,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
}



export function BranchFilter({ filter, setFilter }: BranchFilterProps) {
    const { userChoices } = useContext<any>(UserContext)

    return (
        <>
            <Row style={styles.row} >
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Origem:</Form.ControlLabel>
                        <Form.Control style={styles.input} name="origem" data={BranchesChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Destino:</Form.ControlLabel>
                        <Form.Control style={styles.input} name="destino" data={BranchesChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
            </Row>
            <Row style={styles.row} >
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Placa do Veículo:</Form.ControlLabel>
                        <Form.Control style={styles.input} name="placa_veiculo" accepter={Input} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Autor:</Form.ControlLabel>
                        <Form.Control style={styles.input} name="autor" data={userChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
            </Row>
            <Row style={styles.row} >
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Transferências Recebidas:</Form.ControlLabel>
                        <Form.Control style={styles.input} name="recebido" checked={filter.recebido} onChange={(value) => setFilter({ ...filter, recebido: !value })} accepter={Checkbox} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}
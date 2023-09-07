import { Checkbox, Col, Form, Input, Row, SelectPicker } from "rsuite"
import { styles } from "../../assets/styles";

import { useContext } from "react"

import { BranchesChoices } from "../../services/Choices";
import { UserContext } from "../../providers/UserProviders";

interface BranchFilterProps {
    filter: any;
    setFilter: (value: any) => void;
}



export function BranchFilter({ filter, setFilter }: BranchFilterProps) {
    const { userChoices } = useContext<any>(UserContext)

    return (
        <>
            <Row style={styles.row} >
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Origem:</Form.ControlLabel>
                        <Form.Control style={styles.input} name="origin" data={BranchesChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Destino:</Form.ControlLabel>
                        <Form.Control style={styles.input} name="destiny" data={BranchesChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
            </Row>
            <Row style={styles.row} >
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Placa do Veículo:</Form.ControlLabel>
                        <Form.Control style={styles.input} name="vehicle_plate" accepter={Input} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Autor:</Form.ControlLabel>
                        <Form.Control style={styles.input} name="author" data={userChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
            </Row>
            <Row style={styles.row} >
                <Col xs={12}>
                    <Form.Group>
                        <Form.ControlLabel>Transferências Recebidas:</Form.ControlLabel>
                        <Form.Control style={styles.input} name="received" checked={filter.received} onChange={(value) => setFilter({ ...filter, received: !value })} accepter={Checkbox} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}
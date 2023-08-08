import { Col, Form, Row, SelectPicker } from "rsuite"

import { useContext } from "react"

import { BranchesChoices } from "../../services/Choices";
import { UserContext } from "../../providers/UserProviders";

interface EmployeeFilterProps { }

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 300,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
}


export function EmployeeFilter({ }: EmployeeFilterProps) {
    const { userChoices } = useContext<any>(UserContext)

    return (
        <Row style={styles.row}>
            <Col xs={12}>
                <Form.Group >
                    <Form.ControlLabel>Funcionário: </Form.ControlLabel>
                    <Form.Control style={styles.input} name="id" data={userChoices} accepter={SelectPicker} />
                </Form.Group>
            </Col>
            <Col xs={12}>
                <Form.Group >
                    <Form.ControlLabel>Filial: </Form.ControlLabel>
                    <Form.Control style={styles.input} name="filial" data={BranchesChoices} accepter={SelectPicker} />
                </Form.Group>
            </Col>
        </Row>
    )
}
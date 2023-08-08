import { Col, Form, Input, InputPicker, Row, SelectPicker } from "rsuite"

import { useContext } from "react"

import { BranchesChoices } from "../../services/Choices";
import { UserContext } from "../../providers/UserProviders";

interface RegistrationFilterProps { }

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 300,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
}


export function RegistrationFilter({ }: RegistrationFilterProps) {
    const { userChoices } = useContext<any>(UserContext)

    return (
        <>
            <Row style={styles.row}>
                <Col xs={12}>
                    <Form.Group >
                        <Form.ControlLabel>Funcionário: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="funcionario" data={userChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group >
                        <Form.ControlLabel>CNPJ/ CPF: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="cnpj_cpf" data={userChoices} accepter={Input} />
                    </Form.Group>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col xs={12}>
                    <Form.Group >
                        <Form.ControlLabel>Filial: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="filial" data={BranchesChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group >
                        <Form.ControlLabel>Tipo Contrato: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="tipo_contrato" data={BranchesChoices} accepter={InputPicker} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}
import { Col, Form, Input, Row, SelectPicker } from "rsuite"
import { styles } from "../../assets/styles";

import { useContext } from "react"

import { BranchesChoices, TypeContractChoices } from "../../services/Choices";
import { UserContext } from "../../providers/UserProviders";

interface RegistrationFilterProps { }


export function RegistrationFilter({ }: RegistrationFilterProps) {
    const { userChoices } = useContext<any>(UserContext)

    return (
        <>
            <Row style={styles.row}>
                <Col xs={12}>
                    <Form.Group >
                        <Form.ControlLabel>Funcionário: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="id" data={userChoices} accepter={SelectPicker} />
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
                        <Form.Control style={styles.input} name="branch" data={BranchesChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group >
                        <Form.ControlLabel>Tipo Contrato: </Form.ControlLabel>
                        <Form.Control style={styles.input} name="type_contract" data={TypeContractChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}
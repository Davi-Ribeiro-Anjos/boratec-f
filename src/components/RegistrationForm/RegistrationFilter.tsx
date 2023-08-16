import { Col, Form, Input, Row, SelectPicker } from "rsuite"
import { styles } from "../../assets/styles";

import { useContext } from "react"

import { BranchesChoices, TypeContractChoices } from "../../services/Choices";
import { UserContext } from "../../providers/UserProviders";

interface RegistrationFilterProps {
    cnpj_cpf: string;
}

const cnpjMask = (value: string) => {
    return value
        .replace(/\D+/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
}

const cpfMask = (value: string) => {
    return value
        .replace(/\D+/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
}

const verifyMask = (value: string) => {
    if (value.length < 15) {
        return cpfMask(value)
    } else {
        return cnpjMask(value)
    }
}


export function RegistrationFilter({ cnpj_cpf }: RegistrationFilterProps) {
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
                        <Form.Control style={styles.input} name="cnpj_cpf" value={verifyMask(cnpj_cpf)} accepter={Input} />
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
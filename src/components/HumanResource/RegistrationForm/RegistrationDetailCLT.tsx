import { Col, Grid, Input, Row } from "rsuite";
import { styles } from "../../../assets/styles";

import { memo } from "react";

import { EmployeesInterface } from "../../../services/Interfaces";

import { MainModal } from "../../Global/Modal";

interface RegistrationDetailCLTProps {
    data: EmployeesInterface
    open: boolean;
    setOpen: (value: boolean) => void;
}

export const RegistrationDetailCLT = memo(
    function RegistrationDetailCLT({ data, open, setOpen }: RegistrationDetailCLTProps) {

        const close = () => {
            setOpen(false)
        }

        return (
            <MainModal.Root open={open} close={close} size="full">
                <MainModal.Header title={`Dados do ${data.name}`} />
                <MainModal.Body>
                    <Grid fluid>
                        <Row style={styles.row}>
                            <Col xs={8}>
                                <label>Nome:</label>
                                <Input style={styles.input} value={data.name || ""} readOnly />
                            </Col>
                            <Col xs={8}>
                                <label>CPF:</label>
                                <Input style={styles.input} value={data.cpf || ""} readOnly />
                            </Col>
                            <Col xs={8}>
                                <label>RG:</label>
                                <Input style={styles.input} value={data.rg || ""} readOnly />
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={8}>
                                <label>Data Nascimento:</label>
                                <Input style={styles.input} value={data.date_birth || ""} readOnly />
                            </Col>
                            <Col xs={8}>
                                <label>Data Admissão:</label>
                                <Input style={styles.input} value={data.date_admission || ""} readOnly />
                            </Col>
                            <Col xs={8}>
                                <label>Tipo Cntrato:</label>
                                <Input style={styles.input} value={data.type_contract || ""} readOnly />
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={8}>
                                <label>Cargo:</label>
                                <Input style={styles.input} value={data.role || ""} readOnly />
                            </Col>
                            <Col xs={8}>
                                <label>Filial:</label>
                                <Input style={styles.input} value={data.branch && data.branch.abbreviation || ""} readOnly />
                            </Col>
                            <Col xs={8}>
                                <label>Empresa:</label>
                                <Input style={styles.input} value={data.company || ""} readOnly />
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={8}>
                                <label>Rua:</label>
                                <Input style={styles.input} value={data.street || ""} readOnly />
                            </Col>
                            <Col xs={8}>
                                <label>Número:</label>
                                <Input style={styles.input} value={data.number || ""} readOnly />
                            </Col>
                            <Col xs={8}>
                                <label>Complemento:</label>
                                <Input style={styles.input} value={data.complement || ""} readOnly />
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={8}>
                                <label>CEP:</label>
                                <Input style={styles.input} value={data.cep || ""} readOnly />
                            </Col>
                            <Col xs={8}>
                                <label>Bairro:</label>
                                <Input style={styles.input} value={data.district || ""} readOnly />
                            </Col>
                            <Col xs={8}>
                                <label>Cidade:</label>
                                <Input style={styles.input} value={data.city || ""} readOnly />
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={8}>
                                <label>Banco:</label>
                                <Input style={styles.input} value={data.bank || ""} readOnly />
                            </Col>
                            <Col xs={8}>
                                <label>Agência:</label>
                                <Input style={styles.input} value={data.agency || ""} readOnly />
                            </Col>
                            <Col xs={8}>
                                <label>Conta:</label>
                                <Input style={styles.input} value={data.account || ""} readOnly />
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={8}>
                                <label>Pix:</label>
                                <Input style={styles.input} value={data.pix || ""} readOnly />
                            </Col>
                            <Col xs={8}>
                                <label>Status:</label>
                                <Input style={styles.input} value={data.status || ""} readOnly />
                            </Col>
                        </Row>
                    </Grid>
                </MainModal.Body>
                <MainModal.FooterOne close={close} />
            </MainModal.Root>
        )
    }
)
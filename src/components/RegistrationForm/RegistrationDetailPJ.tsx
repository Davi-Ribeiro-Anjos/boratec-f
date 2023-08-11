import { Col, Grid, Input, Row } from "rsuite";
import { styles } from "../../assets/styles";

import { memo } from "react";

import { EmployeesInterface } from "../../services/Interfaces";

import { MainModal } from "../Modal";

interface RegistrationDetailPJProps {
    data: EmployeesInterface;
    open: boolean;
    setOpen: (value: boolean) => void;
}

export const RegistrationDetailPJ = memo(
    function RegistrationDetailPJ({ data, open, setOpen }: RegistrationDetailPJProps) {

        const close = () => {
            setOpen(false)
        }

        return (
            <MainModal.Root open={open} close={close} size="md" >
                <MainModal.Header title={`Dados do ${data.name}`} />
                <MainModal.Body>
                    <Grid fluid>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <label>Nome:</label>
                                <Input style={styles.input} value={data.name} readOnly />
                            </Col>
                            <Col xs={12}>
                                <label>Filial:</label>
                                <Input style={styles.input} value={data.branch && data.branch.abbreviation} readOnly />
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <label>Cargo:</label>
                                <Input style={styles.input} value={data.role} readOnly />
                            </Col>
                            <Col xs={12}>
                                <label>Empresa:</label>
                                <Input style={styles.input} value={data.company} readOnly />
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <label>CNPJ:</label>
                                <Input style={styles.input} value={data.cnpj} readOnly />
                            </Col>
                            <Col xs={12}>
                                <label>Data Admissão:</label>
                                <Input style={styles.input} value={data.date_admission} readOnly />
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <label>Tipo Contrato:</label>
                                <Input style={styles.input} value={data.type_contract} readOnly />
                            </Col>
                            <Col xs={12}>
                                <label>Status:</label>
                                <Input style={styles.input} value={data.status} readOnly />
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <label>Banco:</label>
                                <Input style={styles.input} value={data.bank} readOnly />
                            </Col>
                            <Col xs={12}>
                                <label>Agência:</label>
                                <Input style={styles.input} value={data.agency} readOnly />
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <label>Conta:</label>
                                <Input style={styles.input} value={data.account} readOnly />
                            </Col>
                            <Col xs={12}>
                                <label>Pix:</label>
                                <Input style={styles.input} value={data.pix} readOnly />
                            </Col>
                        </Row>
                    </Grid>
                </MainModal.Body>
                <MainModal.FooterOne close={close} />
            </MainModal.Root >
        )
    }
)
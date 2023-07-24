import { Checkbox, Col, DatePicker, Form, Grid, IconButton, Input, InputPicker, Panel, Row, SelectPicker, Uploader } from "rsuite"
import FileDownloadIcon from "@rsuite/icons/FileDownload";

import { forwardRef, memo } from 'react';

import { baseUrl } from "../../hooks/Api"
import { BranchesChoices, CategoryChoices, DepartmentChoices, FormPaymentChoices, StatusChoices } from "../../services/Choices"
import { PurchaseRequestInterface } from "../../services/Interfaces";

import { Annotation } from "./Annotation";
import { MainModal } from "../Modal";

interface PurchaseRequestEditProps {
    row: PurchaseRequestInterface;
    setRow: any;
    open: boolean;
    setOpen: any;
}

const Textarea = forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

const styles: { [key: string]: React.CSSProperties } = {
    title: {
        marginBottom: 20,
    },
    input: {
        width: 250
    },
    row: {
        marginBottom: 10,
    },
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: 0
    },
    observation: {
        textTransform: "uppercase"
    }
}


export const PurchaseRequestEdit = memo(function PurchaseRequestEdit({ row, setRow, open, setOpen }: PurchaseRequestEditProps) {
    console.log("editar compra")

    const send = () => {
        console.log(row)
    }

    const close = () => {
        setOpen(false);
    }

    return (
        <MainModal title="Editar Solicitação" nameButton="Editar" size="md" open={open}
            send={send} close={close} form={row} setForm={setRow} >
            <Grid fluid>
                <Panel header="Informações da Solicitação">
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Status:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="status" data={StatusChoices} accepter={InputPicker} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group  >
                                <Form.ControlLabel>Filial:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="filial" data={BranchesChoices} accepter={InputPicker} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Departamento:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="departamento" data={DepartmentChoices} accepter={InputPicker} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            {/* <Form.Group >
                            <Form.ControlLabel>Responsavel:</Form.ControlLabel>
                            <Form.Control style={styles.input} name="responsavel" data={choiceUser} accepter={SelectPicker} />
                        </Form.Group> */}
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Categoria:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="categoria" data={CategoryChoices} accepter={InputPicker} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Forma de Pagamento:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="forma_pagamento" data={FormPaymentChoices} accepter={InputPicker} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Criado em:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="data_solicitacao_bo" placeholder="DD-MM-AAAA" format="dd-MM-yyyy" accepter={DatePicker} disabled />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            {row.forma_pagamento !== "NÃO INFORMADO" && (
                                <Form.Group >
                                    <Form.ControlLabel>Vencimento:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="data_vencimento_boleto" placeholder="DD-MM-AAAA" format="dd-MM-yyyy" accepter={DatePicker} />
                                </Form.Group>
                            )}
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            {row.anexo ? (
                                <Form.Group >
                                    <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                    <a href={`${baseUrl}${row.anexo}`} rel="noreferrer" target="_blank">
                                        <IconButton icon={<FileDownloadIcon />} appearance="primary" color="blue" style={styles.iconBu} />
                                    </a>
                                </Form.Group>
                            ) : (
                                <Form.Group >
                                    <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="anexo" multiple={false} accepter={Uploader} action="" autoUpload={false} />
                                </Form.Group>
                            )}
                        </Col>
                        {row.status === "CONCLUIDO" && (
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Pagamento:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="pago" checked={row.pago} onChange={(value) => setRow({ ...row, pago: !value })} accepter={Checkbox} >Pago</Form.Control>
                                </Form.Group>
                            </Col>
                        )}
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={24}>
                            <Form.Group >
                                <Form.ControlLabel>Observação:</Form.ControlLabel>
                                <Form.Control style={styles.observacao} rows={5} name="observacao" value={row.observacao} accepter={Textarea} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Panel>
                <Annotation.Create id={row.id} />
            </Grid >
        </MainModal >
    )
})
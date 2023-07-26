import { Checkbox, Col, DatePicker, Form, IconButton, Input, InputPicker, Panel, Row, SelectPicker, Uploader, useToaster } from "rsuite"
import FileDownloadIcon from "@rsuite/icons/FileDownload";

import { forwardRef, memo, useContext } from 'react';

import { apiMedia, baseUrl } from "../../hooks/Api"
import { UserContext } from "../../providers/UserProviders";
import { BranchesChoices, CategoryChoices, DepartmentChoices, FormPaymentChoices, StatusChoices } from "../../services/Choices"
import { PurchaseRequestInterface } from "../../services/Interfaces";

import { MainModal } from "../Modal";
import { DateToString } from "../../services/Date";
import { MainMessage } from "../Message";

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
        width: 250,
        textTransform: "uppercase"
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


export const PurchaseRequestEdit = memo(
    function PurchaseRequestEdit({ row, setRow, open, setOpen }: PurchaseRequestEditProps) {
        console.log("editar compra")

        const { userChoices }: any = useContext(UserContext)
        const toaster = useToaster()

        const auth = false

        const send = async () => {
            let row_: any = { ...row }

            delete row_.filial
            delete row_.autor
            delete row_.data_solicitacao_bo
            delete row_.numero_solicitacao

            if (row_.data_vencimento_boleto) row_.data_vencimento_boleto = DateToString(row_.data_vencimento_boleto)
            if (row_.observacao) row_.observacao = row_.observacao.toUpperCase()
            if (row_.anexo) {
                if (typeof (row_.anexo) === "object" && row_.anexo.length > 0) {
                    row_.anexo = row_.anexo[0].blobFile
                }
                else delete row_.anexo
            }
            else delete row_.anexo

            let data_patch = { ...row_, ultima_atualizacao: 1 }
            await apiMedia.patch(
                `solicitacoes-compras/${row_.id}/`,
                { ...data_patch }
            ).then(() => {
                MainMessage.Ok(toaster, "Sucesso - Solicitação editada.")

                close()
            }).catch((error) => {
                let listMessage = {
                    numero_solicitacao: "Número Solicitação",
                    filial: "Filial",
                    solicitante: "Solicitante"
                }
                MainMessage.Error(toaster, error, listMessage)
            })

        }

        const close = () => {
            setOpen(false);
        }

        return (
            <MainModal.Form open={open} close={close} send={send} data={row} setData={setRow} size="md" >
                <MainModal.Header title="Editar Solicitação" />
                <MainModal.Body>
                    <Panel header="Informações da Solicitação">
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Status:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="status" data={StatusChoices} accepter={InputPicker} disabledItemValues={!auth && ['CONCLUIDO', 'CANCELADO']} />
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
                                <Form.Group >
                                    <Form.ControlLabel>Responsavel:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="responsavel" data={userChoices} accepter={SelectPicker} />
                                </Form.Group>
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
                                {row.forma_pagamento !== "NAO INFORMADO" && (
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
                                    <Form.Control style={styles.observation} rows={5} name="observacao" value={row.observacao} accepter={Textarea} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                </MainModal.Body>
                <MainModal.FooterTwo name="Editar" close={close} />
            </MainModal.Form >
        )
    })
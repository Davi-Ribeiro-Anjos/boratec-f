import { Checkbox, Col, DatePicker, Form, IconButton, Input, SelectPicker, Panel, Row, Uploader, useToaster } from "rsuite"
import FileDownloadIcon from "@rsuite/icons/FileDownload";
import { styles } from "../../assets/styles";

import { forwardRef, memo, useContext } from 'react';

import { useApi, baseUrl } from "../../hooks/Api"
import { UserContext } from "../../providers/UserProviders";
import { BranchesChoices, CategoryChoices, DepartmentChoices, FormPaymentChoices, StatusChoices } from "../../services/Choices"
import { PurchaseRequestInterface } from "../../services/Interfaces";

import { MainModal } from "../Global/Modal";
import { DateToString } from "../../services/Date";
import { MainMessage } from "../Global/Message";
import { useMutation } from "react-query";

interface PurchaseRequestEditProps {
    row: PurchaseRequestInterface;
    setRow: any;
    open: boolean;
    setOpen: any;
    refetch: any;
}

const Textarea = forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);


export const PurchaseRequestEdit = memo(
    function PurchaseRequestEdit({ row, setRow, refetch, open, setOpen }: PurchaseRequestEditProps) {
        console.log("editar compra")

        const { me, verifyPermission, userChoices }: any = useContext(UserContext)
        const api = useApi(true)
        const toaster = useToaster()

        const send = async () => {
            let row_: any = { ...row }

            delete row_.branch
            delete row_.author
            delete row_.date_request
            delete row_.number_request
            delete row_.requester

            if (row_.date_expiration) row_.date_expiration = DateToString(row_.date_expiration)
            if (row_.observation) row_.observation = row_.observation.toUpperCase()
            if (row_.attachment) {
                if (typeof (row_.attachment) === "object" && row_.attachment.length > 0) {
                    row_.attachment = row_.attachment[0].blobFile
                }
                else delete row_.attachment
            }
            else delete row_.attachment

            let data_patch = { ...row_, latest_updater: me.id }
            return await api.patch(`purchases-requests/${row_.id}/`, { ...data_patch })
        }

        const { mutate } = useMutation({
            mutationKey: ["purchases-requests"],
            mutationFn: send,
            onSuccess: () => {
                // queryClient.setQueryData("solic_compras", (currentData: any) => currentData.map((value: any) => value.id === data.id ? data : value))
                refetch()
                MainMessage.Ok(toaster, "Sucesso - Solicitação editada.")
                close()
            },
            onError: (error: any) => {
                let listMessage = {
                    number_request: "Número Solicitação",
                    branch: "Filial",
                    requester: "Solicitante"
                }

                MainMessage.Error400(toaster, error, listMessage)
                MainMessage.Error401(toaster, error)
            }
        })

        const close = () => {
            setOpen(false);
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={row} setData={setRow} size="md" overflow={false} >
                <MainModal.Header title="Editar Solicitação" />
                <MainModal.Body>
                    <Panel header="Informações da Solicitação">
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Status:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="status" data={StatusChoices} accepter={SelectPicker} disabledItemValues={!verifyPermission("purchase_request_admin") ? ['CONCLUIDO', 'CANCELADO'] : []} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group  >
                                    <Form.ControlLabel>Filial:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="branch" data={BranchesChoices} accepter={SelectPicker} disabled />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Departamento:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="department" data={DepartmentChoices} accepter={SelectPicker} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Responsavel:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="responsible" data={userChoices} accepter={SelectPicker} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Categoria:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="category" data={CategoryChoices} accepter={SelectPicker} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Forma de Pagamento:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="payment_method" data={FormPaymentChoices} accepter={SelectPicker} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Criado em:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="date_request" placeholder="DD-MM-AAAA" format="dd-MM-yyyy" accepter={DatePicker} disabled />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                {row.payment_method !== "NAO INFORMADO" && (
                                    <Form.Group >
                                        <Form.ControlLabel>Vencimento:</Form.ControlLabel>
                                        <Form.Control style={styles.input} name="date_expiration" placeholder="DD-MM-AAAA" format="dd-MM-yyyy" accepter={DatePicker} />
                                    </Form.Group>
                                )}
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                {row.attachment ? (
                                    <Form.Group >
                                        <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                        <a href={`${baseUrl}${row.attachment}`} rel="noreferrer" target="_blank">
                                            <IconButton icon={<FileDownloadIcon />} appearance="primary" color="blue" style={styles.iconBu} />
                                        </a>
                                    </Form.Group>
                                ) : (
                                    <Form.Group >
                                        <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                        <Form.Control style={styles.input} name="attachment" multiple={false} accepter={Uploader} action="" autoUpload={false} />
                                    </Form.Group>
                                )}
                            </Col>
                            {row.status === "CONCLUIDO" && (
                                <Col xs={12}>
                                    <Form.Group >
                                        <Form.ControlLabel>Pagamento:</Form.ControlLabel>
                                        <Form.Control style={styles.input} name="paid" checked={row.paid} onChange={(value) => setRow({ ...row, paid: !value })} accepter={Checkbox} >Pago</Form.Control>
                                    </Form.Group>
                                </Col>
                            )}
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group >
                                    <Form.ControlLabel>Observação:</Form.ControlLabel>
                                    <Form.Control style={styles.observation} rows={5} name="observation" value={row.observation} accepter={Textarea} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                </MainModal.Body>
                <MainModal.FooterForm name="Editar" close={close} />
            </MainModal.Form >
        )
    })
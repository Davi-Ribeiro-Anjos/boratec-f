import { Form, Row, Col, useToaster, Input, Message, Table, Panel, Button } from "rsuite";
import { styles } from "../../assets/styles";

import { memo, useState, useContext, forwardRef } from "react";
import { useMutation } from "react-query";

// import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";

import { MainMessage } from "../Global/Message";
import { MainModal } from "../Global/Modal";
import { DateToString } from "../../services/Date";
import { queryClient } from "../../services/QueryClient";
import { EpiRequestInterface } from "../../services/Interfaces";

interface Form {
    driver: string;
    vehicle_plate: string;
    email: string;
    attachment: any;
    body_email: string;
}

interface EPIRequestSendProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    row: EpiRequestInterface | undefined;
}

const { Column, HeaderCell, Cell } = Table
const Textarea = forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />)


export const EPIRequestSend = memo(
    function EPIRequestSend({ open, setOpen, row }: EPIRequestSendProps) {
        const { me }: any = useContext(UserContext)
        const api = useApi(true)
        const toaster = useToaster()

        const initialData = {
            driver: "",
            vehicle_plate: "",
            email: "",
            attachment: {},
            body_email: "",
        }
        const [data, setData] = useState<Form>(initialData)

        const send = async () => {
            let bodyToEmail = { ...data }

            let sendError = false
            if (!bodyToEmail.driver) sendError = true
            if (!bodyToEmail.email) sendError = true
            if (!bodyToEmail.vehicle_plate) sendError = true
            if (sendError) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Preencha os campos obrigatórios.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }


            bodyToEmail.driver = bodyToEmail.driver.toUpperCase()
            bodyToEmail.email = bodyToEmail.email.toLowerCase()
            bodyToEmail.body_email = bodyToEmail.body_email.toUpperCase()
            bodyToEmail.vehicle_plate = bodyToEmail.vehicle_plate.toUpperCase()

            let body = {
                date_send: DateToString(new Date()),
                author_send: me.id,
                status: "ANDAMENTO"
            }

            return await api.patch(`epis/requests/${row?.id}/`, { ...body, ...bodyToEmail })
        }

        const { mutate } = useMutation({
            mutationKey: ["epis-requests"],
            mutationFn: send,
            onSuccess: (response: any) => {
                let dataRes = response.data

                queryClient.setQueryData(["epis-requests"], (currentData: any) => {
                    return currentData.filter((request: EpiRequestInterface) => request.id !== dataRes.id)
                })

                MainMessage.Ok(toaster, "Sucesso - Registro enviado.")

                close()
            },
            onError: (error: any) => {
                const listMessage = {
                    observation: "Número Solicitação",
                    service_order: "Filial",
                    date_forecast: "Solicitante",
                    date_release: "Anexo",
                    message: "Erro"
                }

                MainMessage.Error400(toaster, error, listMessage)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
            }
        })

        const confirmCancel = () => {
            const message = (
                <Message showIcon type="info" closable>
                    Tem certeza que quer cancelar?
                    <div style={{ marginTop: 20, display: "flex", justifyContent: "space-around" }} >
                        <Button onClick={() => CancelRequest()} appearance="primary" color="green">Sim</Button>
                        <Button onClick={() => toaster.clear()} appearance="primary" color="red">Não</Button>
                    </div>
                </Message>
            );
            toaster.push(message, { placement: "topEnd", duration: 500000 })
        }

        const cancel = async () => {
            const body = {
                date_canceled: DateToString(new Date()),
                status: "CANCELADO",
                author_cancel: me.id
            }

            return await api.patch(`epis/requests/cancel/${row?.id}/`, { ...body })
        }

        const { mutate: CancelRequest } = useMutation({
            mutationKey: ["epis-requests"],
            mutationFn: cancel,
            onSuccess: (response: any) => {
                toaster.clear()
                let dataRes = response.data

                queryClient.setQueryData(["epis-requests"], (currentData: any) => {
                    return currentData.filter((request: EpiRequestInterface) => request.id !== dataRes.id)
                })

                MainMessage.Ok(toaster, "Sucesso - Registro cancelado.")

                close()
            },
            onError: (error: any) => {
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
            }
        })

        const close = () => {
            setOpen(false)
            setData(initialData)
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size="md" fluid={true} overflow={false}>
                <MainModal.Header title="Enviar Solicitação" />
                <MainModal.Body>
                    <Panel header="Informações da Solicitação:">
                        <Table
                            data={row ? row.epis_carts : []}
                            bordered
                            cellBordered
                            autoHeight
                            hover={false}
                        >
                            <Column align="center" flexGrow={1} >
                                <HeaderCell>Item</HeaderCell>
                                <Cell dataKey="size.item.description" />
                            </Column>
                            <Column align="center" flexGrow={1} >
                                <HeaderCell>CA</HeaderCell>
                                <Cell dataKey="size.item.ca" />
                            </Column>
                            <Column align="center" flexGrow={1} >
                                <HeaderCell>Tamanho</HeaderCell>
                                <Cell dataKey="size.size" />
                            </Column>
                            <Column align="center" flexGrow={1} >
                                <HeaderCell>Quantidade</HeaderCell>
                                <Cell dataKey="quantity" />
                            </Column>
                        </Table>
                    </Panel>
                    <Panel header="Informações para Envio:">
                        <Row style={styles.row}>
                            <Col xs={24} md={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Motorista:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="driver" accepter={Input} />
                                    <Form.HelpText>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Placa Veículo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="vehicle_plate" accepter={Input} />
                                    <Form.HelpText>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group>
                                    <Form.ControlLabel>Email:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="email" accepter={Input} />
                                    <Form.HelpText>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group>
                                    <Form.ControlLabel>Observação:</Form.ControlLabel>
                                    <Form.Control style={styles.observation} name="body_email" rows={7} accepter={Textarea} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                </MainModal.Body>
                <MainModal.FooterThree name1="Enviar Solicitação" name2="Cancelar Solicitação" otherFunction={confirmCancel} close={close} />
            </MainModal.Form>
        );
    });

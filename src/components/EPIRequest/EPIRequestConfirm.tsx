import { Form, Row, Col, useToaster, Message, Table, Panel, Uploader, SelectPicker } from "rsuite";
import { styles } from "../../assets/styles";

import { memo, useState, useContext } from "react";
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
    employee: number | null;
    employee_name: string | null;
    attachment_confirm: any;
    status: string;
    date_confirmed: string | null;
    author_confirm: number;
}

interface EPIRequestConfirmProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    row: EpiRequestInterface | undefined;
}

const { Column, HeaderCell, Cell } = Table


export const EPIRequestConfirm = memo(
    function EPIRequestConfirm({ open, setOpen, row }: EPIRequestConfirmProps) {
        const { me, userChoices }: any = useContext(UserContext)
        const api = useApi(true)
        const toaster = useToaster()

        const initialData = {
            employee: null,
            employee_name: null,
            status: "CONCLUIDO",
            date_confirmed: DateToString(new Date()),
            attachment_confirm: [],
            author_confirm: me.id
        }
        const [data, setData] = useState<Form>(initialData)

        const confirm = async () => {
            let body = { ...data }

            if (!body.employee) body.employee = row?.employee?.id || null

            body.employee_name = null

            if (!body.employee) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Adicione um Funcionário.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }

            if (body.attachment_confirm.length > 0) {
                body.attachment_confirm = body.attachment_confirm[0].blobFile
            } else {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Adicione um Anexo.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }

            return await api.patch(`epis/requests/${row?.id}/`, { ...body })
        }

        const { mutate } = useMutation({
            mutationKey: ["epis-requests"],
            mutationFn: confirm,
            onSuccess: (response: any) => {
                let dataRes = response.data

                queryClient.setQueryData(["epis-requests"], (currentData: any) => {
                    return currentData.filter((request: EpiRequestInterface) => request.id !== dataRes.id)
                })

                MainMessage.Ok(toaster, "Sucesso - Registro confirmado.")

                close()
            },
            onError: (error: any) => {
                const listMessage = {
                    observation: "Número Solicitação",
                    service_order: "Filial",
                    date_forecast: "Solicitante",
                    date_release: "Anexo"
                }

                MainMessage.Error400(toaster, error, listMessage)
                MainMessage.Error401(toaster, error)
            }
        })


        const close = () => {
            setOpen(false)
            setData(initialData)
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size="md" overflow={false}>
                <MainModal.Header title="Confirmar Solicitação" />
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
                    <Panel>
                        <Row style={styles.row}>
                            {!row?.employee && (
                                <Col xs={24} md={12}>
                                    <Form.Group>
                                        <Form.ControlLabel>Funcionário:</Form.ControlLabel>
                                        <Form.Control style={styles.input} name="employee" data={userChoices} accepter={SelectPicker} />
                                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                    </Form.Group>
                                </Col>
                            )}
                            <Col xs={24} md={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                    <Form.Control name="attachment_confirm" multiple={false} action="" autoUpload={false} accepter={Uploader} />
                                    <Form.HelpText tooltip >Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                </MainModal.Body >
                <MainModal.FooterForm name="Confirmar Entrega" close={close} />
            </MainModal.Form >
        );
    });

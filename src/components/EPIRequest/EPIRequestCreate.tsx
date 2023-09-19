import { Form, SelectPicker, Col, InputNumber, useToaster, Grid, Button, Loader, Message, Checkbox, Row } from "rsuite";
import { styles } from "../../assets/styles";

import { memo, useState, useContext } from "react";
import { useMutation, useQuery } from "react-query";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { BranchesChoices } from "../../services/Choices";

import { MainMessage } from "../Global/Message";
import { MainModal } from "../Global/Modal";
import { EpiGroupInterface } from "../../services/Interfaces";
import { queryClient } from "../../services/QueryClient";

interface Form {
    employee: number | null;
    branch: number | null;
    itemsIndex: number[];
    items: any[];
    author_create: number;
    provisional: boolean;
}

interface EPIRequestCreateProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}


export const EPIRequestCreate = memo(
    function EPIRequestCreate({ open, setOpen }: EPIRequestCreateProps) {
        const { me, userChoices }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const initialData = {
            employee: null,
            branch: null,
            itemsIndex: [0],
            items: [],
            author_create: me.id,
            provisional: false
        }
        const [data, setData] = useState<Form>(initialData)

        const addItem = () => {
            const quantityDestiny = data.itemsIndex
            if (quantityDestiny.length < 5) quantityDestiny.push(quantityDestiny.length)

            setData({ ...data, itemsIndex: quantityDestiny })
        }

        const send = async () => {
            let body: any = { ...data }

            body.items = []

            for (const index in body.itemsIndex) {
                if (Object.hasOwnProperty.call(body.itemsIndex, index)) {
                    const item_ = `item-${index}`
                    const quantity_ = `quantity-${index}`


                    const item = body[item_]
                    if (!item) {
                        let message = (
                            <Message showIcon type="error" closable >
                                Erro - Preencha o campo Item ({Number(index) + 1}).
                            </ Message>
                        )
                        throw toaster.push(message, { placement: "topEnd", duration: 4000 })
                    }

                    const quantity = body[quantity_]
                    if (!quantity) {
                        let message = (
                            <Message showIcon type="error" closable >
                                Erro - Preencha o campo Quantidade ({Number(index) + 1}).
                            </ Message>
                        )
                        throw toaster.push(message, { placement: "topEnd", duration: 4000 })
                    }


                    const newItem = {
                        size: item,
                        quantity: quantity,
                    }

                    body.items.push(newItem)
                }
            }

            if (body.provisional) body.status = "PROVISORIO"
            else body.status = "ABERTO"

            return await api.post("epis/requests/", { ...body })
        }

        const { mutate } = useMutation({
            mutationKey: ["purchases-requests"],
            mutationFn: send,
            onSuccess: (response: AxiosResponse) => {
                let dataRes = response.data

                queryClient.setQueryData(["epis-requests"], (currentData: any) => {
                    if (currentData) {
                        return currentData.concat(dataRes)
                    }
                })

                MainMessage.Ok(toaster, "Sucesso - Solicitação criada.")

                close()
            },
            onError: (error: AxiosError) => {
                const listMessage = {
                    number_request: "Número Solicitação",
                    branch: "Filial",
                    requester: "Solicitante",
                    attachment: "Anexo",
                    message: "Erro"
                }

                MainMessage.Error400(toaster, error, listMessage)
                MainMessage.Error401(toaster, error)
            }
        })

        const clearForm = () => {
            setData(initialData)
        }

        const close = () => {
            setOpen(false);
            clearForm()
        }


        // CHOICES ITEMS
        const getItems = async () => {
            const response = await api.get("epis/groups/")

            let res: any[] = []

            response.data.filter((group: EpiGroupInterface) => {
                return group.epis_items.length > 0
            }).map((group: EpiGroupInterface) => {
                group.epis_items.map((item) => {
                    item.epis_sizes.map((size) => {
                        const data_ = {
                            group: group.name,
                            label: item.description + ` - ${size.size}` + ` (${size.quantity_provisory})`,
                            value: size.id
                        }

                        res.push(data_)
                    })
                })
            })

            return res
        }
        const { data: ItemsChoices, isLoading } = useQuery({
            queryKey: ["item-choices"],
            queryFn: getItems,
            onSuccess: () => { },
            onError: () => { },
        })

        if (isLoading) {
            return (
                <div>
                    <Loader backdrop content="Carregando..." vertical />
                </div>
            )
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size="md">
                <MainModal.Header title="Adicionar Solicitação" />
                <MainModal.Body>
                    <Grid fluid>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Funcionário:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="employee" data={userChoices} accepter={SelectPicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Filial:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="branch" data={BranchesChoices} accepter={SelectPicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <>
                            {data.itemsIndex.map((value: number) => {
                                return (
                                    <Row key={value} style={styles.row}>
                                        <Col xs={12}>
                                            <Form.Group >
                                                <Form.ControlLabel>Item - {value + 1}:</Form.ControlLabel>
                                                <Form.Control style={styles.input} name={`item-${value}`} data={ItemsChoices ? ItemsChoices : []} groupBy="group" accepter={SelectPicker} />
                                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Group>
                                                <Form.ControlLabel>Quantidade - {value + 1}:</Form.ControlLabel>
                                                <Form.Control style={styles.input} name={`quantity-${value}`} min={0} accepter={InputNumber} />
                                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                )
                            })}
                            <Row style={styles.row}>
                                <Col xs={12}></Col>
                                <Col xs={12}>
                                    {data.itemsIndex.length < 5 &&
                                        <Button onClick={addItem} appearance="primary" color="green">Adicionar Item</Button>
                                    }
                                </Col>
                            </Row>
                        </>
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group >
                                    <Form.ControlLabel>Provisório:</Form.ControlLabel>
                                    <Form.Control name="provisional" checked={data.provisional} onChange={(value: any) => setData({ ...data, provisional: !value })} accepter={Checkbox} ></Form.Control>
                                    <Form.HelpText tooltip>Ao marcar Provisório, o pedido não será contabilizado no momento.</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Grid>
                </MainModal.Body>
                <MainModal.FooterForm name="Criar" close={close} />
            </MainModal.Form>
        );
    });

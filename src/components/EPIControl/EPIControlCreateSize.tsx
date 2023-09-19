import { Form, Row, Col, useToaster, Grid, Input, InputNumber } from 'rsuite';
import { styles } from '../../assets/styles';

import { memo, useState, useContext } from 'react';
import { useMutation } from 'react-query';

// import { AxiosError } from 'axios';
import { useApi } from '../../hooks/Api';
import { UserContext } from '../../providers/UserProviders';
import { queryClient } from '../../services/QueryClient';

import { MainMessage } from '../Global/Message';
import { MainModal } from '../Global/Modal';

interface Form {
    size?: string;
    quantity: number | null;
    quantity_minimum: number | null;
    quantity_provisory: number | null;
    item: number | undefined;
    author: number;
}

interface EpiControlCreateSizeProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    idItem: number | undefined;
    modalView: (value: boolean) => void;
}


export const EpiControlCreateSize = memo(
    function EpiControlCreateSize({ open, setOpen, idItem, modalView }: EpiControlCreateSizeProps) {
        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const initialData = {
            size: "",
            quantity: null,
            quantity_minimum: null,
            quantity_provisory: null,
            item: undefined,
            author: me.id
        }
        const [data, setData] = useState<Form>(initialData)

        const send = async () => {
            let body = { ...data }

            body.size = body.size?.toUpperCase()
            if (body.size === "") delete body.size
            body.quantity_provisory = body.quantity

            body.item = idItem

            return await api.post('epis/sizes/', { ...body })
        }

        const { mutate } = useMutation({
            mutationKey: ["epis-groups"],
            mutationFn: send,
            onSuccess: () => {
                queryClient.invalidateQueries(["epis-groups"])

                MainMessage.Ok(toaster, "Sucesso - Tamanho criado.")

                setOpen(false)
                setData(initialData)
            },
            onError: (error: any) => {
                delete error.response?.data.quantity_provisory

                const listMessage = {
                    size: "Tamanho",
                    quantity: "Quantidade",
                    quantity_minimum: "Quantidade Mínima",
                }

                MainMessage.Error400(toaster, error, listMessage)
                MainMessage.Error401(toaster, error)
            }
        })

        const close = () => {
            setOpen(false);
            setData(initialData)
            modalView(true)
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size='md'>
                <MainModal.Header title="Adicionar Tamanho" />
                <MainModal.Body>
                    <Grid fluid>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Tamanho:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="size" accepter={Input} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Quantidade:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="quantity" min={0} accepter={InputNumber} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group >
                                    <Form.ControlLabel>Quantidade Mínima:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="quantity_minimum" min={0} accepter={InputNumber} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Grid>
                </MainModal.Body>
                <MainModal.FooterForm name='Criar' close={close} />
            </MainModal.Form>
        );
    });

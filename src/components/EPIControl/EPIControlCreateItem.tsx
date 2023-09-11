import { Form, Row, Col, useToaster, Grid, Input, DatePicker, InputNumber } from 'rsuite';
import { styles } from '../../assets/styles';

import { memo, useState, useContext } from 'react';
import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useApi } from '../../hooks/Api';
import { UserContext } from '../../providers/UserProviders';
import { queryClient } from '../../services/QueryClient';

import { MainMessage } from '../Global/Message';
import { MainModal } from '../Global/Modal';
import { DateToString } from '../../services/Date';

interface Form {
    description: string;
    ca: number | null;
    validity: any;
    time_for_use: number | null;
    group: number | undefined;
    author: number;
}

interface EpiControlCreateItemProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    idGroup: number | undefined;
    modalView: (value: boolean) => void;
}


export const EpiControlCreateItem = memo(
    function EpiControlCreateItem({ open, setOpen, idGroup, modalView }: EpiControlCreateItemProps) {
        console.log("create - item")

        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const initialData = {
            description: "",
            ca: null,
            validity: null,
            time_for_use: null,
            group: undefined,
            author: me.id
        }
        const [data, setData] = useState<Form>(initialData)

        const send = async () => {
            let body = { ...data }

            if (body.validity) body.validity = DateToString(body.validity)
            body.description = body.description.toUpperCase()

            body.group = idGroup

            return await api.post('epis/items/', { ...body })
        }

        const { mutate } = useMutation({
            mutationKey: ["epis-groups"],
            mutationFn: send,
            onSuccess: () => {
                queryClient.invalidateQueries(["epis-groups"])

                MainMessage.Ok(toaster, "Sucesso - Item criado.")

                setOpen(false)
                setData(initialData)
            },
            onError: (error: AxiosError) => {
                const listMessage = {
                    description: "Descrição",
                    ca: "CA",
                    validity: "Vadidade",
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
                <MainModal.Header title="Adicionar Item" />
                <MainModal.Body>
                    <Grid fluid>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Descrição:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="description" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>CA:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="ca" min={0} accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Validade do EPI:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="validity" placeholder="DD-MM-AAAA" format="dd-MM-yyyy" accepter={DatePicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Período para troca:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="time_for_use" min={0} accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Grid>
                </MainModal.Body>
                <MainModal.FooterForm name='Criar' close={close} />
            </MainModal.Form>
        );
    });

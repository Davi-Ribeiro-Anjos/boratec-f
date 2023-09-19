import { Form, Row, Col, useToaster, Grid, Input } from 'rsuite';
import { styles } from '../../assets/styles';

import { memo, useState, useContext } from 'react';
import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useApi } from '../../hooks/Api';
import { UserContext } from '../../providers/UserProviders';
import { queryClient } from '../../services/QueryClient';

import { MainMessage } from '../Global/Message';
import { MainModal } from '../Global/Modal';

interface Form {
    name: string;
    author: number;
}

interface EpiControlCreateGroupProps {
    open: boolean;
    setOpen: any;
}


export const EpiControlCreateGroup = memo(
    function EpiControlCreateGroup({ open, setOpen }: EpiControlCreateGroupProps) {
        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const initialData = {
            name: "",
            author: me.id
        }
        const [data, setData] = useState<Form>(initialData)

        const send = async () => {
            let body = { ...data }

            body.name = body.name.toUpperCase()

            return await api.post('epis/groups/', { ...body })
        }

        const { mutate } = useMutation({
            mutationKey: ["epis-groups"],
            mutationFn: send,
            onSuccess: () => {
                queryClient.invalidateQueries(["epis-groups"])

                MainMessage.Ok(toaster, "Sucesso - Grupo criado.")

                close()
            },
            onError: (error: AxiosError) => {
                const listMessage = {
                    name: "Nome",
                }

                MainMessage.Error400(toaster, error, listMessage)
                MainMessage.Error401(toaster, error)
            }
        })

        const close = () => {
            setOpen(false);
            setData(initialData)
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size='sm'>
                <MainModal.Header title="Adicionar Grupo" />
                <MainModal.Body>
                    <Grid fluid>
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group >
                                    <Form.ControlLabel>Nome do grupo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="name" accepter={Input} />
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

import { Form, Row, Col, useToaster, Grid, Input, InputNumber } from 'rsuite';
import { styles } from '../../assets/styles';

import { memo } from 'react';
import { useMutation } from 'react-query';

// import { AxiosError } from 'axios';
import { useApi } from '../../hooks/Api';
import { queryClient } from '../../services/QueryClient';

import { MainMessage } from '../Message';
import { MainModal } from '../Modal';
import { EpiSizeInterface } from '../../services/Interfaces';


interface EpiControlEditSizeProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    row: EpiSizeInterface | undefined;
    setRow: any;
    modalView: (value: boolean) => void;
}


export const EpiControlEditSize = memo(
    function EpiControlEditSize({ open, setOpen, row, setRow, modalView }: EpiControlEditSizeProps) {
        console.log("edit - item")

        const api = useApi()
        const toaster = useToaster()


        const send = async () => {
            let body = { ...row }

            return await api.patch(`epis/sizes/${row?.id}/`, { ...body })
        }

        const { mutate } = useMutation({
            mutationKey: ["epis-groups"],
            mutationFn: send,
            onSuccess: () => {
                queryClient.invalidateQueries(["epis-groups"])

                MainMessage.Ok(toaster, "Sucesso - Tamanho editado.")

                setOpen(false)
            },
            onError: (error: any) => {
                delete error.response?.data.quantity_provisory

                const listMessage = {
                    size: "Tamanho",
                    quantity: "Quantidade",
                    quantity_minimum: "Quantidade Mínima",
                    message: "Erro"
                }

                MainMessage.Error400(toaster, error, listMessage)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
            }
        })

        const close = () => {
            setOpen(false);
            modalView(true)
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={row} setData={setRow} size='md'>
                <MainModal.Header title="Editar Tamanho" />
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
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Quantidade Mínima:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="quantity_minimum" min={0} accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Quantidade Provisória:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="quantity_provisory" min={0} accepter={Input} disabled />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Grid>
                </MainModal.Body>
                <MainModal.FooterForm name='Editar' close={close} />
            </MainModal.Form>
        );
    });

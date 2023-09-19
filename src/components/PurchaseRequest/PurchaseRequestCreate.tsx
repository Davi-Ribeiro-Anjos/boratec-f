import { Form, Uploader, SelectPicker, Row, Col, InputNumber, useToaster, Grid } from 'rsuite';
import { styles } from '../../assets/styles';

import { memo, useState, useContext } from 'react';
import { useMutation } from 'react-query';

import { AxiosError } from 'axios';
import { useApi } from '../../hooks/Api';
import { UserContext } from '../../providers/UserProviders';
import { BranchesChoices } from '../../services/Choices';

import { MainMessage } from '../Global/Message';
import { MainModal } from '../Global/Modal';

interface Form {
    number_request: number | null;
    branch: number | null;
    requester: number | null;
    attachment?: any;
}

interface PurchaseRequestCreateProps {
    open: boolean;
    setOpen: any;
    refetch: any;
}


export const PurchaseRequestCreate = memo(
    function PurchaseRequestCreate({ open, setOpen, refetch }: PurchaseRequestCreateProps) {
        const { me, userChoices }: any = useContext(UserContext)
        const api = useApi(true)
        const toaster = useToaster()

        const [data, setData] = useState<Form>(
            {
                number_request: null,
                branch: null,
                requester: null,
                attachment: []
            }
        )

        const send = async () => {
            let data_ = { ...data }

            if (data_.attachment.length > 0) {
                data_.attachment = data_.attachment[0].blobFile
            } else {
                data_.attachment = null
            }

            const timeElapsed = Date.now()
            const today = new Date(timeElapsed)
            today.setHours(today.getHours() - 3)

            const dataPost = { ...data_, date_request: today.toISOString(), status: "ABERTO", author: me.id, latest_updater: me.id }

            return await api.post('purchases-requests/', { ...dataPost })
        }

        const { mutate } = useMutation({
            mutationKey: ["purchases-requests"],
            mutationFn: send,
            onSuccess: () => {
                refetch()

                MainMessage.Ok(toaster, "Sucesso - Solicitação criada.")

                close()
            },
            onError: (error: AxiosError) => {
                const listMessage = {
                    number_request: "Número Solicitação",
                    branch: "Filial",
                    requester: "Solicitante",
                    attachment: "Anexo"
                }

                MainMessage.Error400(toaster, error, listMessage)
                MainMessage.Error401(toaster, error)
            }
        })

        const clearForm = () => {
            setData({
                number_request: null,
                branch: null,
                requester: null,
                attachment: []
            })
        }

        const close = () => {
            setOpen(false);
            clearForm()
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size='md'>
                <MainModal.Header title="Adicionar Solicitação" />
                <MainModal.Body>
                    <Grid fluid>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Código Solicitação:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="number_request" accepter={InputNumber} />
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
                        <Row style={styles.row} >
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Solicitante:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="requester" data={userChoices} accepter={SelectPicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="attachment" multiple={false} accepter={Uploader} action='' autoUpload={false} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Grid>
                </MainModal.Body>
                <MainModal.FooterForm name='Criar' close={close} />
            </MainModal.Form>
        );
    });

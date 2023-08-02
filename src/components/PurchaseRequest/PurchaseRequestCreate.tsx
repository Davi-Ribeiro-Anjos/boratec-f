import { Form, Uploader, SelectPicker, Row, Col, InputNumber, useToaster } from 'rsuite';

import { memo, useState, useCallback, useContext } from 'react';

import { useApi } from '../../hooks/Api';
import { UserContext } from '../../providers/UserProviders';
import { BranchesChoices } from '../../services/Choices';

import { MainMessage } from '../Message';
import { MainModal } from '../Modal';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';

interface Form {
    numero_solicitacao: number | null;
    filial: number | null;
    solicitante: number | null;
    anexo?: any;
}

interface PurchaseRequestCreateProps {
    open: boolean;
    setOpen: any;
    refetch: any;
}

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 250,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
}


export const PurchaseRequestCreate = memo(
    function PurchaseRequestCreate({ open, setOpen, refetch }: PurchaseRequestCreateProps) {
        console.log("criar solicitacao compra")

        const { userChoices, token }: any = useContext(UserContext)
        const api = useApi(token, true)
        const toaster = useToaster()

        const [data, setData] = useState<Form>(
            {
                numero_solicitacao: null,
                filial: null,
                solicitante: null,
                anexo: []
            }
        )

        const send = useCallback(async () => {
            let data_ = { ...data }

            if (data_.anexo.length > 0) {
                data_.anexo = data_.anexo[0].blobFile
            } else {
                data_.anexo = null
            }

            const timeElapsed = Date.now()
            const today = new Date(timeElapsed)
            today.setHours(today.getHours() - 3)

            const dataPost = { ...data_, data_solicitacao_bo: today.toISOString(), status: "ABERTO", autor: 1, ultima_atualizacao: 1 }

            return await api.post('solicitacoes-compras/', { ...dataPost })
        }, [data])

        const { mutate } = useMutation({
            mutationKey: "solic_compras",
            mutationFn: send,
            onSuccess: () => {
                refetch()

                MainMessage.Ok(toaster, "Sucesso - Solicitação criada.")

                close()
            },
            onError: (error: AxiosError) => {
                const listMessage = {
                    numero_solicitacao: "Número Solicitação",
                    filial: "Filial",
                    solicitante: "Solicitante",
                    anexo: "Anexo"
                }

                MainMessage.Error400(toaster, error, listMessage)
                MainMessage.Error401(toaster, error)
            }
        })

        const clearForm = () => {
            setData({
                numero_solicitacao: null,
                filial: null,
                solicitante: null,
                anexo: []
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
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Código Solicitação:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="numero_solicitacao" accepter={InputNumber} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Filial:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="filial" data={BranchesChoices} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={styles.row} >
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Solicitante:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="solicitante" data={userChoices} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="anexo" multiple={false} accepter={Uploader} action='' autoUpload={false} />
                            </Form.Group>
                        </Col>
                    </Row>
                </MainModal.Body>
                <MainModal.FooterForm name='Criar' close={close} />
            </MainModal.Form>
        );
    });

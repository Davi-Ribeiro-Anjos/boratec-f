import { Form, Uploader, SelectPicker, Grid, Row, Col, InputNumber } from 'rsuite';

import { memo, useState, useCallback } from 'react';

import { BranchesChoices } from '../../services/Choices';

import { MainModal } from '../Modal';
import { api } from '../../hooks/Api';

interface Form {
    numero_solicitacao: number | null;
    filial: any;
    anexo?: any;
}

interface PurchaseRequestCreateProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 200,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
}


export const PurchaseRequestCreate = memo(
    function PurchaseRequestCreate({ open, setOpen }: PurchaseRequestCreateProps) {
        console.log("criar solicitacao compra")

        const [form, setForm] = useState<Form>(
            {
                numero_solicitacao: null,
                filial: null,
                anexo: []
            }
        )

        const send = useCallback(async () => {
            console.log(form)

            if (form.anexo.length > 0) form.anexo = form.anexo[0].blobFile

            const timeElapsed = Date.now()
            const today = new Date(timeElapsed)
            today.setHours(today.getHours() - 3)

            const dataPost = { ...form, data_solicitacao_bo: today.toISOString(), status: "ABERTO", solicitante: 1, autor: 1, ultima_atualizacao: 1 }

            await api.post('solicitacoes-compras/', { ...dataPost }).then(() => {
                clearForm()
                close()
            }).catch((error) => {
                console.log(error)
            })

        }, [])

        const clearForm = () => {
            setForm({
                numero_solicitacao: null,
                filial: null,
                anexo: []
            })
        }

        const close = () => {
            setOpen(false);
            clearForm()
        }

        return (
            <MainModal title="Adicionar Solicitação" nameButton="Criar" open={open} send={send} close={close}
                setForm={setForm} form={form}>
                <Grid fluid>
                    <Row style={styles.row} >
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
                        <Col xs={24}>
                            <Form.Group >
                                <Form.ControlLabel>Anexo:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="anexo" multiple={false} accepter={Uploader} action='' autoUpload={false} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Grid >
            </MainModal>
        );
    });

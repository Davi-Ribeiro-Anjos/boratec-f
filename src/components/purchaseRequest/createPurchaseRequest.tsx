import { Form, Uploader, SelectPicker, Grid, Row, Col, InputNumber } from 'rsuite';

import { useState } from 'react';

import { branches } from '../../services/Choices';

import { MainModal } from '../modal';

interface CreatePurchaseRequestProps {
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

function CreatePurchaseRequest({ open, setOpen }: CreatePurchaseRequestProps) {
    console.log("criar solicitacao compra")

    const [form, setForm] = useState({})

    const send = () => {
        console.log(form)
    }

    const close = () => {
        setOpen(false);
    }

    return (
        <MainModal title="Adicionar Solicitação" nameButton="Criar" open={open} close={close} send={send} form={form}>
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
                            <Form.Control style={styles.input} name="filial" data={branches} accepter={SelectPicker} />
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
};

export default CreatePurchaseRequest;
import { Col, Form, Input, Row, Uploader, useToaster } from "rsuite"

import { forwardRef, useState, useContext } from "react"

import { useApi } from "../../../hooks/Api";
import { UserContext } from "../../../providers/UserProviders";

import { MainModal } from "../../Modal";
import { MainMessage } from "../../Message";
import { AxiosError } from "axios";


interface AnnotationCreateProps {
    open: boolean;
    setOpen: any;
    id: number | undefined | null;
}

const Textarea = forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

const styles: { [key: string]: React.CSSProperties } = {
    row: {
        marginBottom: 10,
    },
    observation: {
        textTransform: "uppercase"
    }
}


export function AnnotationCreate({ open, setOpen, id }: AnnotationCreateProps) {
    console.log("entrada criar")

    const { token }: any = useContext(UserContext)
    const api = useApi(token, true)
    const toaster = useToaster();

    const [data, setData] = useState<any>(
        {
            observacao: '',
            anexo: []
        }
    )

    const send = async () => {
        let dado = { ...data, autor: 1, solicitacao: id }

        if (dado.observacao) dado.observacao = dado.observacao.toUpperCase()
        if (Boolean(dado.anexo.length)) {
            for (let index in dado.anexo) {
                dado[`arquivo_${parseInt(index) + 1}`] = dado.anexo[index].blobFile
            }
        }
        delete dado.anexo

        await api.post('solicitacoes-entradas/', { ...dado }).then(() => {
            MainMessage.Ok(toaster, "Sucesso - Entrada criada.")

            setData({
                observacao: '',
                anexo: []
            })

            close()
        }).catch((error: AxiosError) => {
            let message = {
                observacao: "Descrição",
                anexo: "Anexo"
            }

            MainMessage.Error400(toaster, error, message)
            MainMessage.Error401(toaster, error)
        })
    }

    const close = () => {
        setOpen(false)

        setData({
            observacao: '',
            anexo: []
        })
    }

    return (
        <MainModal.Form open={open} close={close} send={send} data={data} setData={setData} overflow={false} >
            <MainModal.Header title="Criar Entrada" />
            <MainModal.Body>
                <Row style={styles.row}>
                    <Col xs={24}>
                        <Form.Group>
                            <Form.ControlLabel>Descrição da Entrada:</Form.ControlLabel>
                            <Form.Control style={styles.observacao} rows={8} name="observacao" value={data.observacao} accepter={Textarea} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row style={styles.row}>
                    <Col xs={24}>
                        <Form.Group>
                            <Form.ControlLabel>Anexo:</Form.ControlLabel>
                            <Form.Control name="anexo" multiple={true} accepter={Uploader} action='' autoUpload={false} />
                        </Form.Group>
                    </Col>
                </Row>
            </MainModal.Body>
            <MainModal.FooterForm name="Criar" close={close} />
        </MainModal.Form>
    )
}
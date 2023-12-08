import { Col, Form, Input, Row, Uploader, useToaster } from "rsuite"
import { styles } from "../../../../assets/styles";

import { forwardRef, useState, useContext } from "react"

import { useApi } from "../../../../hooks/Api";
import { UserContext } from "../../../../providers/UserProviders";

import { MainModal } from "../../../Global/Modal";
import { MainMessage } from "../../../Global/Message";
import { AxiosError } from "axios";


interface AnnotationCreateProps {
    open: boolean;
    setOpen: any;
    id: number | undefined | null;
}

const Textarea = forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);


export function AnnotationCreate({ open, setOpen, id }: AnnotationCreateProps) {
    const { me }: any = useContext(UserContext)
    const api = useApi(true)
    const toaster = useToaster();

    const [data, setData] = useState<any>(
        {
            observation: '',
            attachment: []
        }
    )

    const send = async () => {
        let body = { ...data, author: me.id, request: id }

        if (body.observation) body.observation = body.observation.toUpperCase()
        if (Boolean(body.attachment.length)) {
            for (let index in body.attachment) {
                body[`file_${parseInt(index) + 1}`] = body.attachment[index].blobFile
            }
        }
        delete body.attachment

        await api.post('purchases/entries/', { ...body }).then(() => {
            MainMessage.Ok(toaster, "Sucesso - Entrada criada.")

            setData({
                observation: '',
                attachment: []
            })

            close()
        }).catch((error: AxiosError) => {
            let message = {
                observation: "Descrição",
                attachment: "Anexo"
            }

            MainMessage.Error400(toaster, error, message)
            MainMessage.Error401(toaster, error)
        })
    }

    const close = () => {
        setOpen(false)

        setData({
            observation: '',
            attachment: []
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
                            <Form.Control style={styles.observation} rows={8} name="observation" value={data.observation} accepter={Textarea} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row style={styles.row}>
                    <Col xs={24}>
                        <Form.Group>
                            <Form.ControlLabel>Anexo:</Form.ControlLabel>
                            <Form.Control name="attachment" multiple={true} accepter={Uploader} action='' autoUpload={false} />
                        </Form.Group>
                    </Col>
                </Row>
            </MainModal.Body>
            <MainModal.FooterForm name="Criar" close={close} />
        </MainModal.Form>
    )
}
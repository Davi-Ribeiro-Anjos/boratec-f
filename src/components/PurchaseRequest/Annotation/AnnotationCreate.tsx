import { Button, Col, Divider, Form, Input, Panel, Row, Uploader } from "rsuite"

import { forwardRef, useState } from "react"


interface AnnotationCreateProps {
    id: number;
}

const Textarea = forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

const styles: { [key: string]: React.CSSProperties } = {
    row: {
        marginBottom: 10,
    },
}


export function AnnotationCreate({ id }: AnnotationCreateProps) {
    console.log("entrada criar")

    const auth = true

    const [annotation, setAnnotation] = useState<any>(
        {
            observacao: '',
            anexo: []
        }
    )

    const createAnnotation = () => {
        console.log(annotation)
    }

    return (
        <Row>
            {auth ? (
                <>
                    <Divider />
                    <Panel header="Cadastrar Entradas">
                        <Form fluid onChange={setAnnotation} formValue={annotation}>
                            <Row style={styles.row}>
                                <Col xs={24}>
                                    <Form.Group>
                                        <Form.ControlLabel>Descrição da Entrada:</Form.ControlLabel>
                                        <Form.Control style={styles.observacao} rows={8} name="observacao" value={annotation.observacao} accepter={Textarea} />
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
                            <Row style={styles.row}>
                                <Button onClick={() => createAnnotation()} appearance="primary" color='green'>
                                    Criar Entrada
                                </Button>
                            </Row>
                        </Form>
                    </Panel>
                </>
            ) : <></>}
        </Row>
    )
}
import { Button, Col, Grid, Panel, PanelGroup, Row } from "rsuite";
import { styles } from "../../../assets/styles";

import { memo, useState } from "react"

import { baseUrl } from "../../../hooks/Api";

import { MainModal } from "../../Global/Modal";
import { AnnotationInterface } from "../../../services/Interfaces";
import { Annotation } from ".";

interface AnnotationViewProps {
    annotations: any;
    id: number | undefined;
    open: boolean;
    setOpen: any;
}


export const AnnotationView = memo(
    function AnnotationView({ annotations, id, open, setOpen }: AnnotationViewProps) {
        const [openCreate, setOpenCreate] = useState(false)
        const openAnnotationCreate = () => {
            close()
            setOpenCreate(true)
        }

        const close = () => {
            setOpen(false);
        }

        return (
            <>
                <MainModal.Root open={open} close={close}>
                    <MainModal.Header title="Entradas" />
                    <MainModal.Body>
                        {annotations && annotations.length > 0 ?
                            <PanelGroup accordion bordered defaultActiveKey={0}>
                                {annotations.map((data: AnnotationInterface, index: number) => {
                                    return (
                                        <Panel header={`ID ENTREGA - ${data.id}`} eventKey={index} key={index} id={index}>
                                            <Grid>
                                                <Row style={styles.row}>
                                                    OBSERVAÇÃO - {data.observation}
                                                </Row>
                                                <Row style={styles.row}>
                                                    {data.file_1 && (
                                                        <Col>
                                                            <a href={`${baseUrl}${data.file_1}`} rel="noreferrer" target="_blank" >
                                                                <Button>ANEXO 1</Button>
                                                            </a>
                                                        </Col>
                                                    )}
                                                    {data.file_2 && (
                                                        <Col>
                                                            <a href={`${baseUrl}${data.file_2}`} rel="noreferrer" target="_blank" >
                                                                <Button>ANEXO 2</Button>
                                                            </a>
                                                        </Col>
                                                    )}
                                                    {data.file_3 && (
                                                        <Col>
                                                            <a href={`${baseUrl}${data.file_3}`} rel="noreferrer" target="_blank" >
                                                                <Button>ANEXO 3</Button>
                                                            </a>
                                                        </Col>
                                                    )}
                                                </Row>
                                            </Grid>
                                        </Panel>
                                    )
                                })}
                            </PanelGroup>
                            :
                            <label>Nenhuma entrada cadastrada.</label>
                        }
                    </MainModal.Body>
                    <MainModal.FooterTwo open={openAnnotationCreate} close={close} name="Criar Entrada" />
                </MainModal.Root>
                <Annotation.Create open={openCreate} setOpen={setOpenCreate} id={annotations ? id : null} />
            </>
        )
    })
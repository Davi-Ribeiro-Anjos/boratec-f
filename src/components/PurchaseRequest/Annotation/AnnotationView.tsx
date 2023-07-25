import { Button, Col, Grid, Panel, PanelGroup, Row } from "rsuite";

import { memo } from "react"

import { baseUrl } from "../../../hooks/Api";

import { MainModal } from "../../Modal";
import { AnnotationInterface } from "../../../services/Interfaces";

interface AnnotationViewProps {
    annotations: AnnotationInterface[];
    open: boolean;
    setOpen: any;
}

const styles: { [key: string]: React.CSSProperties } = {
    row: {
        marginBottom: 10,
    },
}


export const AnnotationView = memo(
    function AnnotationView({ annotations, open, setOpen }: AnnotationViewProps) {
        console.log("entradas")

        const close = () => {
            setOpen(false);
        }

        return (
            <MainModal title="Entradas" isView open={open} close={close}>
                {annotations.length > 0 ?
                    <PanelGroup accordion bordered defaultActiveKey={0}>
                        {annotations.map((data, index) => {
                            return (
                                <Panel header={`ID ENTREGA - ${data.id}`} eventKey={index} key={index} id={index}>
                                    <Grid>
                                        <Row style={styles.row}>
                                            OBSERVAÇÃO - {data.observacao}
                                        </Row>
                                        <Row style={styles.row}>
                                            {data.arquivo_1 && (
                                                <Col>
                                                    <a href={`${baseUrl}${data.arquivo_1}`} rel="noreferrer" target="_blank" >
                                                        <Button>ANEXO 1</Button>
                                                    </a>
                                                </Col>
                                            )}
                                            {data.arquivo_2 && (
                                                <Col>
                                                    <a href={`${baseUrl}${data.arquivo_2}`} rel="noreferrer" target="_blank" >
                                                        <Button>ANEXO 2</Button>
                                                    </a>
                                                </Col>
                                            )}
                                            {data.arquivo_3 && (
                                                <Col>
                                                    <a href={`${baseUrl}${data.arquivo_3}`} rel="noreferrer" target="_blank" >
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
            </MainModal>
        )
    })
import { Button, ButtonGroup, ButtonToolbar, Col, Form, Grid, Input, InputNumber, Row, SelectPicker } from "rsuite"

import { useState, memo } from "react"
import { MainModal } from "../Modal";
import { BranchesChoices, TypePalletChoices } from "../../services/Choices";


interface GroupButtonProps {
    showSimple: () => void;
    showCompound: () => void;
}

interface BranchCreateTransferProps {
    open: boolean;
    setOpen: (value: any) => void;
}

const GroupButton = ({ showSimple, showCompound }: GroupButtonProps) => {
    return (
        <ButtonToolbar>
            <ButtonGroup>
                <Button appearance="primary" color='cyan' onClick={showSimple}>Único</Button>
                <Button appearance="primary" color='cyan' onClick={showCompound}>Vários</Button>
            </ButtonGroup>
        </ButtonToolbar>
    )
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


export const BranchCreateTransfer = memo(
    function BranchCreateTransfer({ open, setOpen }: BranchCreateTransferProps) {

        const [data, setData] = useState({
            origem: null,
            destinos: [0],
            tipo_palete: null,
            placa_veiculo: '',
            motorista: '',
            conferente: ''
        })

        // DESTINY
        const [selected, setSelected] = useState(false)
        const [compound, setCompound] = useState(false)
        const showCompound = () => {
            setSelected(true)
            setCompound(true)
        }
        const addDestiny = () => {
            const quantityDestiny = data.destinos
            if (quantityDestiny.length < 5) quantityDestiny.push(quantityDestiny.length)

            setData({ ...data, destinos: quantityDestiny })
        }

        const send = () => {

        }

        const close = () => {
            setOpen(false)
            setSelected(false)
            setCompound(false)

            setData({
                origem: null,
                destinos: [0],
                tipo_palete: null,
                placa_veiculo: '',
                motorista: '',
                conferente: ''
            })
        }


        return (
            <MainModal.Form open={open} close={close} send={send} data={data} setData={setData} size="md">
                <MainModal.Header title="Criar Transferência de Paletes" />
                <MainModal.Body>
                    <Grid fluid>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Origem:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="origem" data={BranchesChoices} accepter={SelectPicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Tipo Palete:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="tipo_palete" data={TypePalletChoices} accepter={SelectPicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        {!selected && (
                            <Row style={styles.row}>
                                <Col xs={24}>
                                    <Form.Group>
                                        <Form.ControlLabel>Tipo de Destino:</Form.ControlLabel>
                                        <Form.Control style={styles.input} name='' showSimple={() => setSelected(true)} showCompound={showCompound} accepter={GroupButton} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}
                        {!compound && selected && (
                            <Row style={styles.row}>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.ControlLabel>Destino:</Form.ControlLabel>
                                        <Form.Control style={styles.input} name="destino-0" data={BranchesChoices} accepter={SelectPicker} />
                                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.ControlLabel>Quantidade Paletes:</Form.ControlLabel>
                                        <Form.Control style={styles.input} name="quantidade_paletes-0" accepter={InputNumber} />
                                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}
                        {compound && selected && (
                            <>
                                {data.destinos.map((value, index) => {
                                    return (
                                        <Row key={index} style={styles.row}>
                                            <Col xs={12}>
                                                <Form.Group >
                                                    <Form.ControlLabel>Destino - {index + 1}:</Form.ControlLabel>
                                                    <Form.Control style={styles.input} name={`destino-${index}`} data={BranchesChoices} accepter={SelectPicker} />
                                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Group>
                                                    <Form.ControlLabel>Quantidade - {index + 1}:</Form.ControlLabel>
                                                    <Form.Control style={styles.input} name={`quantidade_paletes-${index}`} accepter={InputNumber} />
                                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    )
                                })}
                                <Row style={styles.row}>
                                    <Col xs={12}></Col>
                                    <Col xs={12}>
                                        {data.destinos.length < 5 &&
                                            <Button onClick={addDestiny} appearance="primary" color='green'>Adicionar novo destino</Button>
                                        }
                                    </Col>
                                </Row>
                            </>
                        )}
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Placa do Veiculo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="placa_veiculo" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Motorista:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="motorista" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Conferente:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="conferente" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Grid>
                </MainModal.Body>
                <MainModal.FooterForm name="Criar" close={close} />
            </MainModal.Form>
        )
    }
)
import { Button, ButtonGroup, ButtonToolbar, Col, Form, Grid, Input, InputNumber, Row, SelectPicker, useToaster } from "rsuite"

import { useState, memo, useContext } from "react"

import { BranchesChoices, TypePalletChoices } from "../../services/Choices";
import { PalletMovementInterface } from "../../services/Interfaces";

import { MainModal } from "../Modal";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { useMutation } from "react-query";
import { MainMessage } from "../Message";
import { queryClient } from "../../services/QueryClient";
import { AxiosError, AxiosResponse } from "axios";

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

        const { token }: any = useContext(UserContext)
        const api = useApi(token)
        const toaster = useToaster()

        const [form, setForm] = useState<any>({
            origem: null,
            destinies: [0],
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
            const quantityDestiny = form.destinies
            if (quantityDestiny.length < 5) quantityDestiny.push(quantityDestiny.length)

            setForm({ ...form, destinies: quantityDestiny })
        }

        const send = async () => {
            const listForm: PalletMovementInterface[] = []

            for (const index in form.destinies) {
                if (Object.hasOwnProperty.call(form.destinies, index)) {
                    const destiny = form[`destiny-${index}`]
                    const quantityPallets = form[`quantityPallets-${index}`]

                    const newForm = {
                        origem: form.origem,
                        tipo_palete: form.tipo_palete,
                        destino: destiny,
                        quantidade_paletes: quantityPallets,
                        placa_veiculo: form.placa_veiculo.toUpperCase(),
                        motorista: form.motorista.toUpperCase(),
                        conferente: form.conferente.toUpperCase(),
                        autor: 1
                    }

                    listForm.push(newForm)
                }
            }

            return await api.post<PalletMovementInterface[]>('paletes-movimentos/', listForm)
        }

        const { mutate } = useMutation({
            mutationKey: ["movement-pallet"],
            mutationFn: send,
            onSuccess: (response: AxiosResponse) => {
                const dataRes = response.data

                queryClient.setQueryData(["movement-pallet"], (currentData: any) => {
                    if (currentData) {
                        return currentData.concat(dataRes)
                    }
                })

                queryClient.invalidateQueries(["pallet-by-branch"])

                MainMessage.Ok(toaster, "Sucesso - Transferência realizada.")

                close()
            },
            onError: (error: AxiosError) => {
                let message = {
                    conferente: "Conferente",
                    destino: "Destino",
                    motorista: "Motorista",
                    origem: "Origem",
                    placa_veiculo: "Placa Veiculo",
                    quantidade_paletes: "Quantidade Paletes",
                    error: "Erro"
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error, "Ocorreu um erro ao criar os dados")
            }
        })

        const close = () => {
            setOpen(false)
            setSelected(false)
            setCompound(false)

            setForm({
                origem: null,
                destinies: [0],
                tipo_palete: null,
                placa_veiculo: '',
                motorista: '',
                conferente: ''
            })
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={form} setData={setForm} size="md">
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
                                        <Form.Control style={styles.input} name="destiny-0" data={BranchesChoices} disabledItemValues={[form.origem]} accepter={SelectPicker} />
                                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group>
                                        <Form.ControlLabel>Quantidade Paletes:</Form.ControlLabel>
                                        <Form.Control style={styles.input} name="quantityPallets-0" accepter={InputNumber} />
                                        <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}
                        {compound && selected && (
                            <>
                                {form.destinies.map((value: number) => {
                                    return (
                                        <Row key={value} style={styles.row}>
                                            <Col xs={12}>
                                                <Form.Group >
                                                    <Form.ControlLabel>Destino - {value + 1}:</Form.ControlLabel>
                                                    <Form.Control style={styles.input} name={`destiny-${value}`} data={BranchesChoices} disabledItemValues={[form.origem]} accepter={SelectPicker} />
                                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12}>
                                                <Form.Group>
                                                    <Form.ControlLabel>Quantidade - {value + 1}:</Form.ControlLabel>
                                                    <Form.Control style={styles.input} name={`quantityPallets-${value}`} accepter={InputNumber} />
                                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    )
                                })}
                                <Row style={styles.row}>
                                    <Col xs={12}></Col>
                                    <Col xs={12}>
                                        {form.destinies.length < 5 &&
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
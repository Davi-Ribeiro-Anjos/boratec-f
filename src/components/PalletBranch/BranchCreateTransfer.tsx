import { Button, ButtonGroup, ButtonToolbar, Col, Form, Grid, Input, InputNumber, Row, SelectPicker, useToaster } from "rsuite"

import { useState, memo, useContext } from "react"
import { styles } from "../../assets/styles";

import { useMutation } from "react-query";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../hooks/Api";
import { queryClient } from "../../services/QueryClient";
import { PalletMovementInterface } from "../../services/Interfaces";
import { BranchesChoices, TypePalletChoices } from "../../services/Choices";
import { UserContext } from "../../providers/UserProviders";

import { MainModal } from "../Modal";
import { MainMessage } from "../Message";

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


export const BranchCreateTransfer = memo(
    function BranchCreateTransfer({ open, setOpen }: BranchCreateTransferProps) {

        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const [form, setForm] = useState<any>({
            origin: null,
            destinies: [0],
            type_pallet: null,
            vehicle_plate: '',
            driver: '',
            checker: ''
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
                        origin: form.origin,
                        type_pallet: form.type_pallet,
                        destiny: destiny,
                        quantity_pallets: quantityPallets,
                        vehicle_plate: form.vehicle_plate.toUpperCase(),
                        driver: form.driver.toUpperCase(),
                        checker: form.checker.toUpperCase(),
                        author: me.id
                    }

                    listForm.push(newForm)
                }
            }

            return await api.post<PalletMovementInterface[]>('pallets-movements/', listForm)
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
                    checker: "Conferente",
                    destiny: "Destino",
                    driver: "Motorista",
                    origin: "Origem",
                    vehicle_plate: "Placa Veiculo",
                    quantity_pallets: "Quantidade Paletes",
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
                origin: null,
                destinies: [0],
                type_pallet: null,
                vehicle_plate: '',
                driver: '',
                checker: ''
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
                                    <Form.Control style={styles.input} name="origin" data={BranchesChoices} accepter={SelectPicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Tipo Palete:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="type_pallet" data={TypePalletChoices} accepter={SelectPicker} />
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
                                        <Form.Control style={styles.input} name="destiny-0" data={BranchesChoices} disabledItemValues={[form.origin]} accepter={SelectPicker} />
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
                                                    <Form.Control style={styles.input} name={`destiny-${value}`} data={BranchesChoices} disabledItemValues={[form.origin]} accepter={SelectPicker} />
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
                                            <Button onClick={addDestiny} appearance="primary" color='green'>Adicionar novo destiny</Button>
                                        }
                                    </Col>
                                </Row>
                            </>
                        )}
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Placa do Veiculo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="vehicle_plate" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Motorista:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="driver" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>Conferente:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="checker" accepter={Input} />
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
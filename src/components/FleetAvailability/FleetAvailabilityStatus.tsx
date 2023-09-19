import { Form, Row, Col, InputNumber, useToaster, DatePicker, Input, Grid, Message } from 'rsuite';
import isBefore from 'date-fns/isBefore';
import { styles } from '../../assets/styles';

import { memo, useState, useContext, forwardRef } from 'react';
import { useMutation } from 'react-query';

import { AxiosError, AxiosResponse } from 'axios';
import { useApi } from '../../hooks/Api';
import { UserContext } from '../../providers/UserProviders';

import { MainMessage } from '../Global/Message';
import { MainModal } from '../Global/Modal';
import { DateToString } from '../../services/Date';
import { queryClient } from '../../services/QueryClient';
import { VehicleInterface } from '../../services/Interfaces';

interface Form {
    observation: string;
    service_order: number | null;
    status: string;
    date_forecast?: any;
    date_release?: any;
    author: number;
    vehicle: number | undefined;
}

interface FleetAvailabilityStatusProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    preventive: boolean;
    setPreventive: (value: boolean) => void;
    row?: VehicleInterface;
}

const Textarea = forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

const today = new Date()


export const FleetAvailabilityStatus = memo(
    function FleetAvailabilityStatus({ open, setOpen, preventive, setPreventive, row }: FleetAvailabilityStatusProps) {
        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const initialData = {
            observation: "",
            service_order: null,
            date_forecast: null,
            date_release: null,
            status: "",
            author: me.id,
            vehicle: undefined
        }
        const [data, setData] = useState<Form>(initialData)

        const send = async () => {
            let body = { ...data }

            if (!body.observation) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Preencha o campo Observação.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }
            body.observation = body.observation.toUpperCase()

            if (body.date_release) {
                body.date_release = DateToString(body.date_release, true)
                body.status = "PARADO"
            }
            else delete body.date_release

            if (body.date_forecast) {
                body.date_forecast = DateToString(body.date_forecast, true)
                body.status = "PREVENTIVO"
            }
            else delete body.date_forecast

            body.vehicle = row?.id

            return await api.post('fleets-availabilities/', { ...body })
        }

        const { mutate } = useMutation({
            mutationKey: ["fleets-availabilities"],
            mutationFn: send,
            onSuccess: (response: AxiosResponse) => {
                let dataRes = response.data

                queryClient.setQueryData(["fleets-availabilities"], (currentData: any) => {
                    return currentData.filter((vehicle: VehicleInterface) => vehicle.id !== dataRes.vehicle.id)
                })


                MainMessage.Ok(toaster, "Sucesso - Registro criado.")

                close()
            },
            onError: (error: AxiosError) => {
                const listMessage = {
                    observation: "Número Solicitação",
                    service_order: "Filial",
                    date_forecast: "Solicitante",
                    date_release: "Anexo"
                }

                MainMessage.Error400(toaster, error, listMessage)
                MainMessage.Error401(toaster, error)
            }
        })

        const close = () => {
            setOpen(false)

            setData(initialData)

            setPreventive(false)
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size='md'>
                <MainModal.Header title={`Registrar  ${preventive ? "Prevenção" : "Parada"}`} />
                <MainModal.Body>
                    <Grid fluid>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Ordem de Serviço:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="service_order" accepter={InputNumber} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>{preventive ? "Data Previsão" : "Data Liberação"}:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name={preventive ? "date_forecast" : "date_release"} placeholder="DD/MM/AAAA" format="dd/MM/yyyy" shouldDisableDate={(date_: any) => isBefore(date_, today)} accepter={DatePicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row} >
                            <Col xs={24}>
                                <Form.Group >
                                    <Form.ControlLabel>Observação:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="observation" rows={5} accepter={Textarea} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Grid>
                </MainModal.Body>
                <MainModal.FooterForm name='Registrar' close={close} />
            </MainModal.Form>
        );
    });

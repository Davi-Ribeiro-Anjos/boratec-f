import { Form, SelectPicker, Row, Col, InputNumber, useToaster, Panel, Input, DatePicker, Message, DateRangePicker, Modal, Button } from "rsuite";

import { memo, useState, useContext } from "react";

import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { BranchesChoices } from "../../services/Choices";

import { MainMessage } from "../Message";
import { MainModal } from "../Modal";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { styles } from "../../assets/styles";

interface Form { }

interface PaymentSendProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    checkedKeys: number[];
}


export function PaymentSend({ open, setOpen, checkedKeys }: PaymentSendProps) {
    console.log("send - payment")

    const { me }: any = useContext(UserContext)
    const api = useApi()
    const toaster = useToaster()

    const initialData = {}

    const [data, setData] = useState<Form>(initialData)

    const sendTotal = async () => {
        let body: any = { ...data }
        console.log(body)
        console.log(checkedKeys)

        return true
        // return await api.post('employees/', body)
    }
    const { mutate: SendTotal } = useMutation({
        mutationKey: ["employees-payments"],
        mutationFn: sendTotal,
        onSuccess: () => {
            // const dataRes = response.data

            // queryClient.setQueryData(["employees"], (currentData: any) => {
            //     if (currentData) {
            //         dataRes["bank_details"] = `BCO: ${dataRes.bank} | AG: ${dataRes.agency} | CC: ${dataRes.account}`

            //         return currentData.concat(dataRes)
            //     }
            // })

            //     MainMessage.Ok(toaster, "Sucesso - Funcionário cadastrado.")

            //     close()
        },
        onError: (error: AxiosError) => {
            const message = {
            }

            MainMessage.Error400(toaster, error, message)
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error)
        }
    })

    const sendAdvance = async () => {
        let body: any = { ...data }
        console.log("advance")


        return true
        // return await api.post('employees/', body)
    }
    const { mutate: SendAdvance } = useMutation({
        mutationKey: ["employees-payments"],
        mutationFn: sendAdvance,
        onSuccess: () => {
            // const dataRes = response.data

            // queryClient.setQueryData(["employees"], (currentData: any) => {
            //     if (currentData) {
            //         dataRes["bank_details"] = `BCO: ${dataRes.bank} | AG: ${dataRes.agency} | CC: ${dataRes.account}`

            //         return currentData.concat(dataRes)
            //     }
            // })

            //     MainMessage.Ok(toaster, "Sucesso - Funcionário cadastrado.")

            //     close()
        },
        onError: (error: AxiosError) => {
            const message = {
            }

            MainMessage.Error400(toaster, error, message)
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error)
        }
    })


    const close = () => {
        setOpen(false);

        setData(initialData)
    }

    return (
        <MainModal.Form open={open} close={close} send={SendAdvance} data={data} setData={setData} size="md" overflow={false}>
            <MainModal.Header title="Enviar Emails" />
            <MainModal.Body>
                <Row style={styles.row}>
                    <Col xs={12}>
                        <Form.Group>
                            <Form.ControlLabel>Período:</Form.ControlLabel>
                            <Form.Control style={styles.input} name="date_request" placeholder="Selecione a data Inicial e Final" format='dd/MM/yyyy' accepter={DateRangePicker} />
                        </Form.Group>
                    </Col>
                    <Col xs={12}>
                        <Form.Group >
                            <Form.ControlLabel>Data Pagamento:</Form.ControlLabel>
                            <Form.Control style={styles.input} name="date_expiration" placeholder="DD/MM/AAAA" format="dd/MM/yyyy" accepter={DatePicker} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row style={styles.row}>
                    <Col xs={12}>
                        <Form.Group>
                            <Form.ControlLabel>Data limite para envio de NF: </Form.ControlLabel>
                            <Form.Control style={styles.input} name="date_expiration" placeholder="DD/MM/AAAA" format="dd/MM/yyyy" accepter={DatePicker} />
                        </Form.Group>
                    </Col>
                </Row>
            </MainModal.Body>
            <Modal.Footer>
                <Button type="submit" appearance="primary" color="cyan">
                    Adiantamento
                </Button>
                <Button onClick={() => SendTotal()} appearance="primary" color="blue">
                    Total
                </Button>
                <Button onClick={close} appearance="subtle">
                    Cancelar
                </Button>
            </Modal.Footer>
        </MainModal.Form>
    );
}

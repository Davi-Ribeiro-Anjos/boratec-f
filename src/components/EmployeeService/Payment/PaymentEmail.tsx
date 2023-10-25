import { Form, Row, Col, useToaster, DatePicker, Message, DateRangePicker, Modal, Button } from "rsuite";
import { styles } from "../../../assets/styles";

import { useState } from "react";
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../../hooks/Api";
import { DateToString, FormatDate } from "../../../services/Date";

import { MainMessage } from "../../Global/Message";
import { MainModal } from "../../Global/Modal";

interface Form {
    period: any;
    period_initial: string | undefined;
    period_end: string | undefined;
    date_payment: any;
    date_limit_nf: any;
    total: boolean;
    employees: number[];
}

interface PaymentSendProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    checkedKeys: number[];
}


export function PaymentSend({ open, setOpen, checkedKeys }: PaymentSendProps) {
    const api = useApi()
    const toaster = useToaster()

    let total = false
    const initialData = {
        period: null,
        period_initial: "",
        period_end: "",
        date_payment: null,
        date_limit_nf: null,
        total: false,
        employees: []
    }

    const [data, setData] = useState<Form>(initialData)

    const sendEmail = async () => {
        let body = { ...data }

        let error = false
        if (!body.period) error = true
        if (!body.date_payment) error = true
        if (!body.date_limit_nf) error = true

        if (error) {
            let message = (
                <Message showIcon type="error" closable >
                    Erro - Preencha os campos coretamente.
                </ Message>
            )
            throw toaster.push(message, { placement: "topEnd", duration: 4000 })
        }


        body.period_initial = FormatDate(DateToString(body.period[0]))
        body.period_end = FormatDate(DateToString(body.period[1]))
        body.date_payment = FormatDate(DateToString(body.date_payment))
        body.date_limit_nf = FormatDate(DateToString(body.date_limit_nf))

        body.employees = checkedKeys
        body.total = total

        delete body.period

        return await api.post('employees/payments/emails/', body)
    }
    const { mutate: SendEmail } = useMutation({
        mutationKey: ["employees-payments"],
        mutationFn: sendEmail,
        onSuccess: () => {
            MainMessage.Ok(toaster, "Sucesso - Todos os emails foram enviados.")

            close()
        },
        onError: (error: AxiosError) => {
            const message = {
            }

            MainMessage.Error400(toaster, error, message)
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error)
        }
    })

    const send = (type: boolean) => {
        total = type
        SendEmail()
    }

    const close = () => {
        setOpen(false);

        setData(initialData)
    }

    return (
        <MainModal.Form open={open} close={close} send={() => send(false)} data={data} setData={setData} size="md" overflow={false}>
            <MainModal.Header title="Enviar Emails" />
            <MainModal.Body>
                <Row style={styles.row}>
                    <Col xs={12}>
                        <Form.Group>
                            <Form.ControlLabel>Período:</Form.ControlLabel>
                            <Form.Control style={styles.input} name="period" placeholder="Selecione a data Inicial e Final" format='dd/MM/yyyy' accepter={DateRangePicker} />
                        </Form.Group>
                    </Col>
                    <Col xs={12}>
                        <Form.Group>
                            <Form.ControlLabel>Data limite para envio de NF: </Form.ControlLabel>
                            <Form.Control style={styles.input} name="date_limit_nf" placeholder="DD/MM/AAAA" format="dd/MM/yyyy" accepter={DatePicker} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row style={styles.row}>
                    <Col xs={12}>
                        <Form.Group >
                            <Form.ControlLabel>Data Pagamento:</Form.ControlLabel>
                            <Form.Control style={styles.input} name="date_payment" placeholder="DD/MM/AAAA" format="dd/MM/yyyy" accepter={DatePicker} />
                        </Form.Group>
                    </Col>
                </Row>
            </MainModal.Body>
            <Modal.Footer>
                <Button type="submit" appearance="primary" color="cyan">
                    Adiantamento
                </Button>
                <Button onClick={() => send(true)} appearance="primary" color="blue">
                    Total
                </Button>
                <Button onClick={close} appearance="subtle">
                    Cancelar
                </Button>
            </Modal.Footer>
        </MainModal.Form>
    );
}

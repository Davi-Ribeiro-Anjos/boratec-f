import { Form, Row, Col, useToaster, DatePicker } from "rsuite";
import isAfter from "date-fns/isAfter";
import { styles } from "../../../assets/styles";

import { memo, useState, useContext } from "react";
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../../hooks/Api";
import { UserContext } from "../../../providers/UserProviders";
import { MainMessage } from "../../Global/Message";
import { MainModal } from "../../Global/Modal";
import { DateToString } from "../../../services/Date";


interface Form {
    date_selected: any;
}

interface PaymentXlsxProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}


export const PaymentXlsx = memo(
    function PaymentXlsx({ open, setOpen }: PaymentXlsxProps) {
        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const initialData = {
            date_selected: null,
        }

        const [data, setData] = useState<Form>(initialData)

        const generate = async () => {
            let body: any = { ...data }

            if (body.date_selected) body.date_selected = DateToString(body.date_selected)

            console.log(body)

            return true
            // return await api.post('employees/', body)
        }
        const { mutate } = useMutation({
            mutationKey: ["employees-xlsx"],
            mutationFn: generate,
            onSuccess: () => {
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
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} overflow={false}>
                <MainModal.Header title="Exportar CSV" />
                <MainModal.Body>
                    <Row style={styles.row}>
                        <Col xs={24}>
                            <Form.Group>
                                <Form.ControlLabel>Período:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="date_selected" placeholder="Selecione o Mês" format='MM/yyyy' shouldDisableDate={date => isAfter(date, new Date())} accepter={DatePicker} />
                                <Form.HelpText>Caso em branco trará todos o histórico.</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Gerar" close={close} />
            </MainModal.Form>
        );
    });

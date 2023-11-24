import { Form, Row, Col, useToaster, DatePicker } from "rsuite";
import isAfter from "date-fns/isAfter";
import { styles } from "../../../assets/styles";

import { memo, useState } from "react";
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApiDownload } from "../../../hooks/Api";
import { DateToString } from "../../../services/Date";

import { MainMessage } from "../../Global/Message";
import { MainModal } from "../../Global/Modal";

import FileDownload from 'js-file-download';


interface Form {
    date_selected: any;
}

interface PaymentXlsxProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}


export const PaymentXlsx = memo(
    function PaymentXlsx({ open, setOpen }: PaymentXlsxProps) {
        const api = useApiDownload()
        const toaster = useToaster()

        const initialData = {
            date_selected: null,
        }

        const [data, setData] = useState<Form>(initialData)

        const generate = async () => {
            let body: any = { ...data }

            if (body.date_selected) body.date_selected = DateToString(body.date_selected)

            return await api.post('pj/complements/export/', body)
        }

        const { mutate } = useMutation({
            mutationKey: ["employees-xlsx"],
            mutationFn: generate,
            onSuccess: (response) => {
                FileDownload(response.data, "Relatório de PJ's.csv")

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

        const close = () => {
            setOpen(false)

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

import { Form, SelectPicker, Row, Col, InputNumber, useToaster, Panel, Input, DatePicker, Message, DateRangePicker, Modal, Button } from "rsuite";
import isAfter from "date-fns/isAfter";

import { memo, useState, useContext } from "react";

import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";

import { MainMessage } from "../Message";
import { MainModal } from "../Modal";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { styles } from "../../assets/styles";

interface Form { }

interface PaymentXlsxProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    checkedKeys: number[];
}


export const PaymentXlsx = memo(
    function PaymentXlsx({ open, setOpen, checkedKeys }: PaymentXlsxProps) {
        console.log("send - payment")

        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const initialData = {}

        const [data, setData] = useState<Form>(initialData)

        const generate = async () => {
            let body: any = { ...data }
            console.log(body)
            console.log(checkedKeys)

            return true
            // return await api.post('employees/', body)
        }
        const { mutate } = useMutation({
            mutationKey: ["employees-xlsx"],
            mutationFn: generate,
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
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} overflow={false}>
                <MainModal.Header title="Exportar XLSX" />
                <MainModal.Body>
                    <Row style={styles.row}>
                        <Col xs={24}>
                            <Form.Group>
                                <Form.ControlLabel>Período:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="date_request" placeholder="Selecione o Mês" format='MM/yyyy' shouldDisableDate={date => isAfter(date, new Date())} accepter={DatePicker} />
                                <Form.HelpText tooltip>Caso em branco trará todos os dados.</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Gerar" close={close} />
            </MainModal.Form>
        );
    });

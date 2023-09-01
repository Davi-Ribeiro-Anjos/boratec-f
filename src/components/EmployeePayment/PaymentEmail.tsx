import { Form, SelectPicker, Row, Col, InputNumber, useToaster, Panel, Input, DatePicker, Message } from "rsuite";

import { memo, useState, useContext } from "react";

import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { BranchesChoices, StatusEmployeeChoices } from "../../services/Choices";

import { MainMessage } from "../Message";
import { MainModal } from "../Modal";
import { useMutation } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { CompanyChoices } from "../../services/Choices";
import { DateToString } from "../../services/Date";
import { queryClient } from "../../services/QueryClient";
import { styles } from "../../assets/styles";

interface Form {
}

interface PaymentSendProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}


export const PaymentSend = memo(
    function PaymentSend({ open, setOpen }: PaymentSendProps) {
        console.log("send - payment")

        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const initialData = {}

        const [data, setData] = useState<Form>(initialData)
        const send = async () => {
            let body: any = { ...data }

            return true
            // return await api.post('employees/', body)
        }
        const { mutate } = useMutation({
            mutationKey: ["employees-payments"],
            mutationFn: send,
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
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size="md" overflow={false}>
                <MainModal.Header title="Enviar Emails" />
                <MainModal.Body>
                    {/* <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Nome Completo:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="name" accepter={Input} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group  >
                                <Form.ControlLabel>Filial:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="branch" data={BranchesChoices} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row> */}
                </MainModal.Body>
                <MainModal.FooterForm name="Enviar" close={close} />
            </MainModal.Form>
        );
    });

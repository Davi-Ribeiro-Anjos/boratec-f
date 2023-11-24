import { Col, DatePicker, Form, Input, Message, Row, useToaster } from "rsuite";
import { styles } from "../../../assets/styles";
import isAfter from 'date-fns/isAfter';

import { memo, useState, forwardRef } from "react";
import { useMutation, useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../../hooks/Api";
import { EmployeesSimpleInterface } from "../../../services/Interfaces";

import { MainModal } from "../../Global/Modal";
import { MainMessage } from "../../Global/Message";
import { DateToString } from "../../../services/Date";

interface RegistrationDismissalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

interface Form extends FormDismissal {
    cnpj_cpf: any;
    cnpj: string;
    cpf: string;
}

interface FormDismissal {
    dismissal_date: Date | string | null;
    dismissal_motive: string;
}

const Textarea = forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

const cnpjMask = (value: string) => {
    return value
        .replace(/\D+/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
}

const cpfMask = (value: string) => {
    return value
        .replace(/\D+/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
}

const verifyMask = (value: string) => {
    if (value.length < 15) {
        return cpfMask(value)
    } else {
        return cnpjMask(value)
    }
}


export const RegistrationDismissal = memo(
    function RegistrationDismissal({ open, setOpen }: RegistrationDismissalProps) {
        const api = useApi()
        const toaster = useToaster()

        const [data, setData] = useState<Form>({
            cnpj_cpf: "",
            cnpj: "",
            cpf: "",
            dismissal_date: null,
            dismissal_motive: "",
        })

        const [check, setCheck] = useState(false)

        const checkDismissal = async () => {
            let identity: string
            let form = { ...data }

            form.cnpj_cpf = form.cnpj_cpf.replaceAll('.', '').replace('-', '').replace('/', '')
            if (form.cnpj_cpf.length === 15) form.cnpj_cpf = form.cnpj_cpf.slice(0, -1)
            if (form.cnpj_cpf.length !== 14 && form.cnpj_cpf.length !== 11) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Complete o campo CPF/ CNPJ corretamente.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }


            if (form.cnpj_cpf.length === 11) {
                identity = form.cnpj_cpf
            } else {
                identity = form.cnpj_cpf
            }

            const response = await api.get<EmployeesSimpleInterface>(`employees-dismissals/check/${identity}/`)

            return response.data
        }

        const { data: Employee, refetch } = useQuery({
            queryKey: ["dismissal"],
            queryFn: checkDismissal,
            onSuccess: () => {
                setCheck(true)
            },
            onError: (error: AxiosError) => {
                const message = {
                    cnpj: "CNPJ",
                    cpf: "CPF",
                }

                if (error.response?.status === 404) {
                    const m = (
                        <Message showIcon type="error" closable >
                            Erro - CPF/ CNPJ não encontrado.
                        </ Message>
                    )
                    throw toaster.push(m, { placement: "topEnd", duration: 4000 })
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
            },
            enabled: false
        })

        const send = async () => {
            let form: FormDismissal = {
                dismissal_date: data.dismissal_date,
                dismissal_motive: data.dismissal_motive,
            }

            if (form.dismissal_date && typeof (form.dismissal_date) === "object") form.dismissal_date = DateToString(form.dismissal_date)
            if (form.dismissal_motive) form.dismissal_motive = form.dismissal_motive.toUpperCase()

            return await api.post(`employees-dismissals/${Employee?.id}/`, form)
        }

        const { mutate } = useMutation({
            mutationKey: ["dismissal"],
            mutationFn: send,
            onSuccess: () => {
                MainMessage.Ok(toaster, "Sucesso - Motivo Enviado")

                close()
            },
            onError: (error: AxiosError) => {
                const message = {
                    dismissal_date: "Data Demissão",
                    dismissal_motive: "Motivo Demissão",
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
            },
        })

        const close = () => {
            setOpen(false)
            setData({
                cnpj_cpf: "",
                cnpj: "",
                cpf: "",
                dismissal_date: null,
                dismissal_motive: "",
            })
            setCheck(false)
        }


        return (
            <MainModal.Form open={open} close={close} data={data} setData={setData} send={!check ? refetch : mutate} size="xs" overflow={false}>
                <MainModal.Header title={!check ? "Checar Demissões" : `Funcionário ${Employee?.name}`} />
                <MainModal.Body>
                    {!check ? (
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group>
                                    <Form.ControlLabel>CNPJ/ CPF:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="cnpj_cpf" value={verifyMask(data.cnpj_cpf)} accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                    ) : (<>
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group>
                                    <Form.ControlLabel>Data Demissão:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="dismissal_date" oneTap format='dd-MM-yyyy' placeholder="Selecione a data" shouldDisableDate={date => isAfter(date, new Date())} accepter={DatePicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group>
                                    <Form.ControlLabel>Motivo Demissão:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="dismissal_motive" rows={5} accepter={Textarea} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                    </>)}
                </MainModal.Body>
                <MainModal.FooterForm name={!check ? "Checar" : "Incluir"} close={close} />
            </MainModal.Form>
        )
    }
)
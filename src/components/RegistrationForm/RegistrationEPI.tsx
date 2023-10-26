import { Col, Form, Input, Row, useToaster } from "rsuite";
import { styles } from "../../assets/styles";

import { memo, forwardRef } from "react";
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { EmployeesEPIsInterface, EmployeesInterface } from "../../services/Interfaces";

import { MainModal } from "../Global/Modal";
import { MainMessage } from "../Global/Message";

interface RegistrationEPIProps {
    row: EmployeesInterface;
    data: EmployeesEPIsInterface;
    setData: any;
    open: boolean;
    setOpen: (value: boolean) => void;
}

const Textarea = forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);


export const RegistrationEPI = memo(
    function RegistrationEPI({ row, data, setData, open, setOpen }: RegistrationEPIProps) {
        const api = useApi()
        const toaster = useToaster()

        const sendEPI = async () => {
            let form = { ...data }

            if (form.phone_model && typeof (form.phone_model) == "string") form.phone_model = form.phone_model.toUpperCase()
            if (form.phone_code && typeof (form.phone_code) == "string") form.phone_code = form.phone_code.toUpperCase()
            if (form.notebook_model && typeof (form.notebook_model) == "string") form.notebook_model = form.notebook_model.toUpperCase()
            if (form.notebook_code && typeof (form.notebook_code) == "string") form.notebook_code = form.notebook_code.toUpperCase()
            if (form.observation && typeof (form.observation) == "string") form.observation = form.observation.toUpperCase()

            return await api.post(`employees-epis/${row.id}/`, form)
        }

        const { mutate } = useMutation({
            mutationKey: ["epi"],
            mutationFn: sendEPI,
            onSuccess: () => {
                MainMessage.Ok(toaster, "Editado com sucesso.")
                close()
            },
            onError: (error: AxiosError) => {
                const message = {
                    phone_model: "Modelo Celular",
                    phone_code: "Identificação Celular",
                    notebook_model: "Modelo Notebook",
                    notebook_code: "Identificação Notebook",
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
            },
        })

        const close = () => {
            setOpen(false)
        }

        return (
            <MainModal.Form open={open} close={close} data={data} setData={setData} send={mutate} size="md" overflow={false} >
                <MainModal.Header title="Acessórios" />
                <MainModal.Body>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Modelo Celular:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="phone_model" accepter={Input} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Identificação Celular:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="phone_code" accepter={Input} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={styles.row} >
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Modelo Notebook:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="notebook_model" accepter={Input} />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Identificação Notebook:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="notebook_code" accepter={Input} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={styles.row} >
                        <Col xs={24}>
                            <Form.Group >
                                <Form.ControlLabel>Observação:</Form.ControlLabel>
                                <Form.Control style={styles.observation} name="observation" rows={5} accepter={Textarea} />
                            </Form.Group>
                        </Col>
                    </Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Editar" close={close} />
            </MainModal.Form >
        )
    }
)
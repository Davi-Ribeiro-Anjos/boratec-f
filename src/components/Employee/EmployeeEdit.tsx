import { Form, SelectPicker, Row, Col, InputNumber, useToaster, Panel, Input, DatePicker, Message } from "rsuite";
import { styles } from "../../assets/styles";

import { memo, forwardRef } from "react";
import { useMutation } from "react-query";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../hooks/Api";
import { BranchesChoices, StatusEmployeeChoices } from "../../services/Choices";
import { CompanyChoices } from "../../services/Choices";
import { DateToString } from "../../services/Date";
import { queryClient } from "../../services/QueryClient";

import { MainMessage } from "../Global/Message";
import { MainModal } from "../Global/Modal";

interface EmployeeEditProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    row: any | undefined;
    setRow: (value: any) => void;
}

const Textarea = forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />)

const cnpjMask = (value: string) => {
    return value
        .replace(/\D+/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
}


export const EmployeeEdit = memo(
    function EmployeeEdit({ open, setOpen, row, setRow }: EmployeeEditProps) {
        const api = useApi()
        const toaster = useToaster()

        // EMPLOYEES
        const editEmployees = async () => {
            let body: any = { ...row }

            body.cnpj = body.cnpj.replaceAll('.', '').replace('-', '').replace('/', '')
            if (body.cnpj.length === 15) body.cnpj = body.cnpj.slice(0, -1)
            if (body.cnpj.length !== 14) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Complete o campo CNPJ corretamente.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }

            body.name = body.name.toUpperCase()
            body.role = body.role.toUpperCase()
            body.bank = body.bank.toUpperCase()
            if (body.date_admission) body.date_admission = DateToString(body.date_admission)


            delete body.user
            delete body.pj_complements

            return await api.patch(`employees/${row?.id}/`, body)
        }

        const { mutate: employeesMutate } = useMutation({
            mutationKey: ["employees"],
            mutationFn: editEmployees,
            onSuccess: (response: AxiosResponse) => {
                const dataRes = response.data

                queryClient.setQueryData(["employees"], (currentData: any) => {

                    return currentData.map((employee: any) => {
                        dataRes["bank_details"] = `BCO: ${dataRes.bank} | AG: ${dataRes.agency} | CC: ${dataRes.account}`

                        return employee.id === dataRes.id ? dataRes : employee
                    })
                })

                MainMessage.Ok(toaster, "Sucesso - Funcionário cadastrado.")

                close()
            },
            onError: (error: AxiosError) => {
                const message = {
                    name: 'Nome',
                    branch: 'Filial',
                    role: 'Cargo',
                    company: 'Empresa',
                    cnpj: 'CNPJ',
                    date_admission: 'Data Admissão',
                    status: 'Ativo',
                    bank: 'Banco',
                    agency: 'Agência',
                    account: 'Conta',
                    pix: 'Pix',
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
            }
        })


        // COMPLEMENTS
        const editComplements = async () => {
            let body = { ...row }

            if (body.salary) body.pj_complements.salary = Number(body.salary)
            if (body.college) body.pj_complements.college = Number(body.college)
            if (body.allowance) body.pj_complements.allowance = Number(body.allowance)
            if (body.housing_allowance) body.pj_complements.housing_allowance = Number(body.housing_allowance)
            if (body.covenant_credit) body.pj_complements.covenant_credit = Number(body.covenant_credit)
            if (body.others_credits) body.pj_complements.others_credits = Number(body.others_credits)
            if (body.advance_money) body.pj_complements.advance_money = Number(body.advance_money)
            if (body.covenant_discount) body.pj_complements.covenant_discount = Number(body.covenant_discount)
            if (body.others_discounts) body.pj_complements.others_discounts = Number(body.others_discounts)
            if (body.observation) body.pj_complements.observation = body.observation.toUpperCase()

            delete body.pj_complements.data_emission

            return await api.patch(`pj/complements/${body.pj_complements.id}/`, body.pj_complements)
        }

        const { mutate: complementsMutate } = useMutation({
            mutationKey: ["pj_complements"],
            mutationFn: editComplements,
            onSuccess: () => {
                employeesMutate()
            },
            onError: (error: AxiosError) => {
                const message = {
                    salary: "Salário",
                    college: "Faculdade",
                    allowance: "Ajuda Custo",
                    housing_allowance: "Auxílio Moradia",
                    covenant_credit: "Crédito Convênio",
                    others_credits: "Outros Créditos",
                    advance_money: "Adiantamento",
                    covenant_discount: "Desconto Convênio",
                    others_discounts: "Outros Descontos",
                    observation: "Observação",
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
            }
        })

        const close = () => {
            setOpen(false);
        }

        return (
            <MainModal.Form open={open} close={close} send={complementsMutate} data={row} setData={setRow} size="md" overflow={false}>
                <MainModal.Header title="Editar Funcionário" />
                <MainModal.Body>
                    <Panel header="Informações Pessoais do Funcionário">
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Nome Completo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="name" accepter={Input} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group  >
                                    <Form.ControlLabel>Filial:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="branch" data={BranchesChoices} accepter={SelectPicker} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Cargo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="role" accepter={Input} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Empresa:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="company" data={CompanyChoices} accepter={SelectPicker} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>CNPJ:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="cnpj" value={cnpjMask(row ? row.cnpj : "")} accepter={Input} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Data Admissão:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="date_admission" placeholder="DD/MM/AAAA" format="dd/MM/yyyy" accepter={DatePicker} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group >
                                    <Form.ControlLabel>Status:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="status" data={StatusEmployeeChoices} accepter={SelectPicker} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="Informações Bancárias do Funcionário">
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Banco:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="bank" accepter={Input} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Agência:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="agency" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Conta:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="account" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Pix:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="pix" accepter={Input} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="Informações de Valores do Funcionário">
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Salário:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="salary" accepter={InputNumber} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Faculdade:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="college" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Ajuda de Custo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="allowance" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Auxílio Moradia:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="housing_allowance" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Crédito Convênio:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="covenant_credit" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Outros Créditos:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="others_credits" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Adiantamento:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="advance_money" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Desconto Convênio:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="covenant_discount" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group >
                                    <Form.ControlLabel>Outros Descontos:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="others_discounts" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group >
                                    <Form.ControlLabel>Observação:</Form.ControlLabel>
                                    <Form.Control style={styles.observation} rows={5} name="observation" value={row ? row.observation : ""} accepter={Textarea} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                </MainModal.Body>
                <MainModal.FooterForm name="Criar" close={close} />
            </MainModal.Form>
        );
    });

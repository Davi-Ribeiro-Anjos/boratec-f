import { Form, Uploader, SelectPicker, Row, Col, InputNumber, useToaster, Panel, Input, DatePicker, InputPicker, Checkbox, Message } from "rsuite";

import { memo, useState, useCallback, useContext } from "react";

import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { BranchesChoices } from "../../services/Choices";

import { MainMessage } from "../Message";
import { MainModal } from "../Modal";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { CompanyChoices } from "../../services/Choices";
import { DateToString } from "../../services/Date";
import { queryClient } from "../../services/QueryClient";

interface Form {
    name: string,
    branch: number | null,
    role: string,
    company: string | null,
    type_contract: string
    cnpj: string,
    date_admission: any,
    active: boolean,
    bank: string,
    agency: number | null,
    account: number | null,
    pix: string,
    salary: number | null,
    college: number | null,
    allowance: number | null,
    housing_allowance: number | null,
    covenant_credit: number | null,
    other_credits: number | null,
    advance_money: number | null,
    covenant_discount: number | null,
    others_discounts: number | null,
    date_payment: null,
    complements: any
}

interface EmployeeCreateProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const cnpjMask = (value: string) => {
    return value
        .replace(/\D+/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
}

const styles: any = {
    title: {
        marginBottom: 20,
    },
    input: {
        width: 250,
        textTransform: "uppercase",
        span: {
            display: "none"
        }
    },
    row: {
        marginBottom: 10,
    },
    iconBu: {
        width: "3vw",
        height: "7vh",
        padding: 0,
        margin: 0
    },
    observation: {
        textTransform: "uppercase"
    }
}


export const EmployeeCreate = memo(
    function EmployeeCreate({ open, setOpen }: EmployeeCreateProps) {
        console.log("criar solicitacao compra")

        const { token }: any = useContext(UserContext)
        const api = useApi(token, true)
        const toaster = useToaster()

        const [data, setData] = useState<Form>(
            {
                name: "",
                branch: null,
                role: "",
                company: null,
                cnpj: "",
                type_contract: "PJ",
                date_admission: null,
                active: true,
                bank: "",
                agency: null,
                account: null,
                pix: "",
                salary: null,
                college: null,
                allowance: null,
                housing_allowance: null,
                covenant_credit: null,
                other_credits: null,
                advance_money: null,
                covenant_discount: null,
                others_discounts: null,
                date_payment: null,
                complements: {}
            }
        )

        // EMPLOYEES
        const sendEmployees = async () => {
            let form: any = { ...data }

            form.cnpj = form.cnpj.replaceAll('.', '').replace('-', '').replace('/', '')
            if (form.cnpj.length === 15) form.cnpj = form.cnpj.slice(0, -1)
            if (form.cnpj.length !== 14) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Complete o campo CNPJ corretamente.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }

            form.name = form.name.toUpperCase()
            form.role = form.role.toUpperCase()
            form.bank = form.bank.toUpperCase()
            if (form.date_admission) form.date_admission = DateToString(form.date_admission)

            return await api.post('employees/', form)
        }

        const { mutate: employeesMutate } = useMutation({
            mutationKey: ["employees"],
            mutationFn: sendEmployees,
            onSuccess: () => {
                queryClient.invalidateQueries(["employees"])

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
                    active: 'Ativo',
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
        const sendComplements = async () => {
            let form = { ...data }


            form.complements["salary"] = form.salary || null
            form.complements["college"] = form.college || null
            form.complements["allowance"] = form.allowance || null
            form.complements["housing_allowance"] = form.housing_allowance || null
            form.complements["covenant_credit"] = form.covenant_credit || null
            form.complements["other_credits"] = form.other_credits || null
            form.complements["advance_money"] = form.advance_money || null
            form.complements["covenant_discount"] = form.covenant_discount || null
            form.complements["others_discounts"] = form.others_discounts || null
            if (form.date_payment)
                form.complements["date_payment"] = DateToString(form.date_payment)
            form.complements["author"] = 1

            // return await api.post('pj-complements/', form.complements)
            return true
        }

        const { mutate: complementsMutate } = useMutation({
            mutationKey: ["pj_complements"],
            mutationFn: sendComplements,
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
                    other_credits: "Outros Créditos",
                    advance_money: "Adiantamento",
                    covenant_discount: "Desconto Convênio",
                    others_discounts: "Outros Descontos",
                    date_payment: "Data Pagamento"
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
            }
        })

        const close = () => {
            setOpen(false);

            setData({
                name: "",
                branch: null,
                role: "",
                company: null,
                cnpj: "",
                type_contract: "PJ",
                date_admission: null,
                active: true,
                bank: "",
                agency: null,
                account: null,
                pix: "",
                salary: null,
                college: null,
                allowance: null,
                housing_allowance: null,
                covenant_credit: null,
                other_credits: null,
                advance_money: null,
                covenant_discount: null,
                others_discounts: null,
                date_payment: null,
                complements: {}
            })
        }

        return (
            <MainModal.Form open={open} close={close} send={complementsMutate} data={data} setData={setData} size="md" overflow={false}>
                <MainModal.Header title="Adicionar Funcionário" />
                <MainModal.Body>
                    <Panel header="Informações Pessoais do Funcionário PJ">
                        <Row style={styles.row}>
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
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Cargo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="role" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Empresa:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="company" data={CompanyChoices} accepter={SelectPicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>CNPJ:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="cnpj" value={cnpjMask(data.cnpj)} accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Data Admissão:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="date_admission" placeholder="DD-MM-AAAA" format="dd-MM-yyyy" accepter={DatePicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Ativo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="active" checked={data.active} onChange={(value: any) => setData({ ...data, active: !value })} accepter={Checkbox} />
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
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Agência:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="agency" accepter={InputNumber} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Conta:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="account" accepter={InputNumber} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Pix:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="pix" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
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
                                    <Form.ControlLabel>Data Pagamento:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="date_payment" placeholder="DD-MM-AAAA" format="dd-MM-yyyy" accepter={DatePicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
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
                                    <Form.Control style={styles.input} name="other_credits" accepter={InputNumber} />
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
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Outros Descontos:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="others_discounts" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Faculdade:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="college" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                </MainModal.Body>
                <MainModal.FooterForm name="Criar" close={close} />
            </MainModal.Form>
        );
    });

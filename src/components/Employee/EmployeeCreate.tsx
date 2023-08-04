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

interface Form {
    nome: string,
    filial: number | null,
    cargo: string,
    empresa: string | null,
    tipo_contrato: string
    cnpj: string,
    data_admissao: any,
    ativo: boolean,
    banco: string,
    agencia: number | null,
    conta: number | null,
    pix: string,
    salario: number | null,
    faculdade: number | null,
    ajuda_custo: number | null,
    auxilio_moradia: number | null,
    credito_convenio: number | null,
    outros_creditos: number | null,
    adiantamento: number | null,
    desconto_convenio: number | null,
    outros_descontos: number | null,
    data_pagamento: null,
    complementos: any
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
                nome: "",
                filial: null,
                cargo: "",
                empresa: null,
                cnpj: "",
                tipo_contrato: "PJ",
                data_admissao: null,
                ativo: true,
                banco: "",
                agencia: null,
                conta: null,
                pix: "",
                salario: null,
                faculdade: null,
                ajuda_custo: null,
                auxilio_moradia: null,
                credito_convenio: null,
                outros_creditos: null,
                adiantamento: null,
                desconto_convenio: null,
                outros_descontos: null,
                data_pagamento: null,
                complementos: {}
            }
        )

        const sendEmployees = async () => {
            let form = { ...data }

            form.nome = form.nome.toUpperCase()
            form.cargo = form.cargo.toUpperCase()
            form.banco = form.banco.toUpperCase()
            if (form.data_admissao) form.data_admissao = DateToString(form.data_admissao)
            if (form.cnpj.length !== 18 && form.cnpj.length !== 19) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Complete o campo CNPJ corretamente.
                    </ Message>
                )
                toaster.push(message, { placement: "topEnd", duration: 4000 })
                return null
            }

            console.log(form)
        }

        const sendComplements = async () => {
            let form = { ...data }

            form.complementos["salario"] = form.salario || null
            form.complementos["faculdade"] = form.faculdade || null
            form.complementos["ajuda_custo"] = form.ajuda_custo || null
            form.complementos["auxilio_moradia"] = form.auxilio_moradia || null
            form.complementos["credito_convenio"] = form.credito_convenio || null
            form.complementos["outros_creditos"] = form.outros_creditos || null
            form.complementos["adiantamento"] = form.adiantamento || null
            form.complementos["desconto_convenio"] = form.desconto_convenio || null
            form.complementos["outros_descontos"] = form.outros_descontos || null
            if (form.data_pagamento)
                form.complementos["data_pagamento"] = DateToString(form.data_pagamento)
            form.complementos["autor"] = 1

            console.log(form.complementos)
        }

        const { mutate: ComplementsMutate } = useMutation({
            mutationKey: "solic_compras",
            mutationFn: sendComplements,
            onSuccess: () => {
                sendEmployees()
                // close()
            },
            onError: (error: AxiosError) => {
                const message = {
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
            }
        })

        const close = () => {
            setOpen(false);

            setData({
                nome: "",
                filial: null,
                cargo: "",
                empresa: null,
                cnpj: "",
                tipo_contrato: "PJ",
                data_admissao: null,
                ativo: true,
                banco: "",
                agencia: null,
                conta: null,
                pix: "",
                salario: null,
                faculdade: null,
                ajuda_custo: null,
                auxilio_moradia: null,
                credito_convenio: null,
                outros_creditos: null,
                adiantamento: null,
                desconto_convenio: null,
                outros_descontos: null,
                data_pagamento: null,
                complementos: {}
            })
        }

        return (
            <MainModal.Form open={open} close={close} send={ComplementsMutate} data={data} setData={setData} size="md" overflow={false}>
                <MainModal.Header title="Adicionar Funcionário" />
                <MainModal.Body>
                    <Panel header="Informações Pessoais do Funcionário PJ">
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Nome Completo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="nome" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group  >
                                    <Form.ControlLabel>Filial:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="filial" data={BranchesChoices} accepter={SelectPicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Cargo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="cargo" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Empresa:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="empresa" data={CompanyChoices} accepter={InputPicker} />
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
                                    <Form.Control style={styles.input} name="data_admissao" placeholder="DD-MM-AAAA" format="dd-MM-yyyy" accepter={DatePicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Ativo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="ativo" checked={data.ativo} onChange={(value: any) => setData({ ...data, ativo: !value })} accepter={Checkbox} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="Informações Bancárias do Funcionário">
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Banco:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="banco" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Agência:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="agencia" accepter={InputNumber} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Conta:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="conta" accepter={InputNumber} />
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
                                    <Form.Control style={styles.input} name="salario" accepter={InputNumber} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Data Pagamento:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="data_pagamento" placeholder="DD-MM-AAAA" format="dd-MM-yyyy" accepter={DatePicker} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Ajuda de Custo:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="ajuda_custo" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Auxílio Moradia:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="auxilio_moradia" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Crédito Convênio:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="credito_convenio" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Outros Créditos:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="outros_creditos" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Adiantamento:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="adiantamento" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Desconto Convênio:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="desconto_convenio" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Outros Descontos:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="outros_descontos" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group >
                                    <Form.ControlLabel>Faculdade:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="faculdade" accepter={InputNumber} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Panel>
                </MainModal.Body>
                <MainModal.FooterForm name="Criar" close={close} />
            </MainModal.Form>
        );
    });

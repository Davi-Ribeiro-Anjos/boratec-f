import { Form, useToaster, Panel, Message } from "rsuite";

import { memo, useState, useContext } from "react";
import { useMutation } from "react-query";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../../hooks/Api";
import { UserContext } from "../../../providers/UserProviders";
import { BranchesChoices, StatusEmployeeChoices } from "../../../services/Choices";
import { CompanyChoices } from "../../../services/Choices";
import { DateToString } from "../../../services/Date";
import { queryClient } from "../../../services/QueryClient";

import { MainModal } from "../../Global/Modal";
import { MainMessage } from "../../Global/Message";
import { MainFormComponent } from "../../Global/Component/Form";

interface Form {
    name: string;
    email: string;
    branch: number | null;
    role: string;
    company: string | null;
    type_contract: string
    cnpj: string;
    date_admission: any;
    status: string;
    bank: string;
    agency: number | null;
    account: number | null;
    pix: string;
    salary: number | null;
    college: number | null;
    allowance: number | null;
    housing_allowance: number | null;
    covenant_credit: number | null;
    others_credits: number | null;
    advance_money: number | null;
    covenant_discount: number | null;
    others_discounts: number | null;
    subsistence_allowance: number | null;
    observation: string | null;
    complements: any;
    pj_complements: number | null;
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


export const EmployeeCreate = memo(
    function EmployeeCreate({ open, setOpen }: EmployeeCreateProps) {
        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const initialData = {
            name: "",
            email: "",
            branch: null,
            role: "",
            company: null,
            cnpj: "",
            type_contract: "PJ",
            date_admission: null,
            status: "ATIVO",
            bank: "",
            agency: null,
            account: null,
            pix: "",
            salary: null,
            college: null,
            allowance: null,
            housing_allowance: null,
            covenant_credit: null,
            others_credits: null,
            advance_money: null,
            covenant_discount: null,
            others_discounts: null,
            subsistence_allowance: null,
            observation: "",
            complements: {},
            pj_complements: null
        }

        const [data, setData] = useState<Form>(initialData)

        // EMPLOYEES
        const sendEmployees = async (id_complement: number) => {
            let body: any = { ...data }

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

            body.pj_complements = id_complement
            body.name = body.name.toUpperCase()
            body.email = body.email.toLowerCase()
            body.role = body.role.toUpperCase()
            body.bank = body.bank.toUpperCase()
            if (body.date_admission) body.date_admission = DateToString(body.date_admission)

            return await api.post('employees/', body)
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
                    email: 'Email',
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
        const sendComplements = async () => {
            let body = { ...data }

            if (body.salary) body.complements["salary"] = body.salary
            if (body.college) body.complements["college"] = body.college
            if (body.allowance) body.complements["allowance"] = body.allowance
            if (body.housing_allowance) body.complements["housing_allowance"] = body.housing_allowance
            if (body.covenant_credit) body.complements["covenant_credit"] = body.covenant_credit
            if (body.others_credits) body.complements["others_credits"] = body.others_credits
            if (body.advance_money) body.complements["advance_money"] = body.advance_money
            if (body.covenant_discount) body.complements["covenant_discount"] = body.covenant_discount
            if (body.others_discounts) body.complements["others_discounts"] = body.others_discounts
            if (body.subsistence_allowance) body.complements["subsistence_allowance"] = body.subsistence_allowance
            if (body.observation) body.complements["observation"] = body.observation.toUpperCase()
            body.complements["author"] = me.id

            return await api.post('pj/complements/', body.complements)
        }

        const { mutate: complementsMutate } = useMutation({
            mutationKey: ["pj_complements"],
            mutationFn: sendComplements,
            onSuccess: (response: AxiosResponse) => {
                const dataRes = response.data

                employeesMutate(dataRes.id)
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
                    subsistence_allowance: "Ajuda de Custo",
                    others_discounts: "Outros Descontos",
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
            <MainModal.Form open={open} close={close} send={complementsMutate} data={data} setData={setData} size="md" overflow={false} >
                <MainModal.Header title="Adicionar Funcionário" />
                <MainModal.Body>
                    <Panel header="Informações Pessoais do Funcionário">
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Nome Completo:" name="name" />
                            <MainFormComponent.SelectPicker text="Filial:" name="branch" data={BranchesChoices} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Cargo:" name="role" />
                            <MainFormComponent.SelectPicker text="Empresa:" name="company" data={CompanyChoices} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="CNPJ:" name="cnpj" value={cnpjMask(data ? data.cnpj : "")} />
                            <MainFormComponent.DatePicker text="Data Admissão:" name="date_admission" showHelpText={true} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.SelectPicker text="Status:" name="status" data={StatusEmployeeChoices} />
                            <MainFormComponent.Input text="Email:" name="email" showHelpText={false} />
                        </MainFormComponent.Row>
                    </Panel>
                    <Panel header="Informações Bancárias do Funcionário">
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Banco:" name="bank" />
                            <MainFormComponent.InputNumber text="Agência:" name="agency" />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.InputNumber text="Conta:" name="account" />
                            <MainFormComponent.Input text="Pix:" name="pix" />
                        </MainFormComponent.Row>
                    </Panel>
                    <Panel header="Informações de Valores do Funcionário">
                        <MainFormComponent.Row>
                            <MainFormComponent.InputNumber text="Salário:" name="salary" />
                            <MainFormComponent.InputNumber text="Faculdade:" name="college" showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.InputNumber text="Ajuda de Custo:" name="allowance" showHelpText={false} />
                            <MainFormComponent.InputNumber text="Auxílio Moradia:" name="housing_allowance" showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.InputNumber text="Crédito Convênio:" name="covenant_credit" showHelpText={false} />
                            <MainFormComponent.InputNumber text="Outros Créditos:" name="others_credits" showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.InputNumber text="Adiantamento:" name="advance_money" showHelpText={false} />
                            <MainFormComponent.InputNumber text="Desconto Convênio:" name="covenant_discount" showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.InputNumber text="Outros Descontos:" name="others_discounts" showHelpText={false} />
                            <MainFormComponent.InputNumber text="Ajuda de Custo:" name="subsistence_allowance" showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.Textarea text="Observação:" name="observation" showHelpText={false} />
                        </MainFormComponent.Row>
                    </Panel>
                </MainModal.Body>
                <MainModal.FooterForm name="Criar" close={close} />
            </MainModal.Form>
        );
    });

import { Form, useToaster, Panel, Message } from "rsuite";

import { memo, useState, useContext } from "react";
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { BranchesChoices } from "../../services/Choices";
import { CompanyChoices } from "../../services/Choices";
import { DateToString } from "../../services/Date";
import { queryClient } from "../../services/QueryClient";

import { MainModal } from "../Global/Modal";
import { MainMessage } from "../Global/Message";
import { MainFormComponent } from "../Global/Component/Form";

const PriorityChoices = [
    { label: "NORMAL", value: "NORMAL" },
    { label: "MÉDIA", value: "MEDIA" },
    { label: "ALTA", value: "ALTA" },
].map(item => ({ label: item.label, value: item.value }))

const ContractModeChoices = [
    { label: "CLT", value: "CLT" },
    { label: "JOVEM APRENDIZ", value: "JA" },
    { label: "PCD", value: "PCD" },
    { label: "PESSOA JURÍDICA", value: "PJ" },
].map(item => ({ label: item.label, value: item.value }))

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

interface VacancyEditProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export const VacancyEdit = memo(
    function VacancyEdit({ open, setOpen }: VacancyEditProps) {
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

        const { mutate } = useMutation({
            mutationKey: ["employees"],
            mutationFn: sendEmployees,
            onSuccess: () => {
                queryClient.invalidateQueries(["employees"])

                MainMessage.Ok(toaster, "Sucesso - Funcionário cadastrado.")

                // close()
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

        const close = () => {
            setOpen(false);

            setData(initialData)
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size="full" overflow={false} >
                <MainModal.Header title="Adicionar Vaga" />
                <MainModal.Body>
                    <Panel header="Dados da Vaga">
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Título da Vaga:" name="title" />
                            <MainFormComponent.Input text="Cargo:" name="role" />
                            <MainFormComponent.SelectPicker text="Departamento:" name="department" data={CompanyChoices} />
                            <MainFormComponent.SelectPicker text="Filial:" name="branch" data={BranchesChoices} />
                            <MainFormComponent.DatePicker text="Previsão de Início:" name="date_expected_start" showHelpText={true} />
                            <MainFormComponent.DatePicker text="Data Relatada:" name="date_reported" showHelpText={true} />
                            <MainFormComponent.SelectPicker text="Prioridade:" name="priority" data={PriorityChoices} />
                            <MainFormComponent.SelectPicker text="Modalidade de Contrato:" name="contract_mode" data={ContractModeChoices} />
                            <MainFormComponent.DatePicker text="Faixa Salarial:" name="date_reported" showHelpText={true} />
                            <MainFormComponent.DatePicker text="Tipo de Vaga:" name="date_reported" showHelpText={true} />
                            <MainFormComponent.DatePicker text="Substituição:" name="date_reported" showHelpText={true} />
                            <MainFormComponent.DatePicker text="Descrição:" name="date_reported" showHelpText={true} />
                            <MainFormComponent.DatePicker text="Empresa:" name="date_reported" showHelpText={true} />
                            <MainFormComponent.DatePicker text="Escala de Trabalho:" name="date_reported" showHelpText={true} />
                            <MainFormComponent.DatePicker text="Recrutador:" name="date_reported" showHelpText={true} />
                        </MainFormComponent.Row>
                    </Panel>
                    <Panel header="Informações de Preenchimento do RH">
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Email Gestor:" name="bank" />
                            <MainFormComponent.Input text="Email Gestor Regional:" name="bank" />
                            <MainFormComponent.Input text="Email Gerente RH:" name="bank" />
                            <MainFormComponent.Input text="Email Diretor:" name="bank" />
                        </MainFormComponent.Row>
                    </Panel>
                    <Panel header="Resultado Aprovação">
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Aprovação Gestor:" name="salary" />
                            <MainFormComponent.Input text="Aprovação Gestor Regional:" name="college" showHelpText={false} />
                            <MainFormComponent.Input text="Aprovação Gerente RH:" name="salary" />
                            <MainFormComponent.Input text="Aprovação Diretor:" name="college" showHelpText={false} />
                            <MainFormComponent.Textarea text="Comentário Gestor:" name="salary" />
                            <MainFormComponent.Textarea text="Comentário Gestor Regional" name="college" showHelpText={false} />
                            <MainFormComponent.Textarea text="Comentário Gerente RH" name="salary" />
                            <MainFormComponent.Textarea text="Comentário Diretor:" name="college" showHelpText={false} />
                        </MainFormComponent.Row>
                    </Panel>
                    <Panel header="Status da Solicitação">
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Status de Liberação:" name="salary" />
                        </MainFormComponent.Row>
                    </Panel>
                </MainModal.Body>
                <MainModal.FooterForm name="Criar" close={close} />
            </MainModal.Form>
        );
    });

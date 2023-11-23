import { Form, useToaster, Panel, Message, Button } from "rsuite";

import { memo, useContext } from "react";
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { queryClient } from "../../services/QueryClient";

import { MainModal } from "../Global/Modal";
import { MainMessage } from "../Global/Message";
import { MainFormComponent } from "../Global/Component/Form";
import { UserContext } from "../../providers/UserProviders";

const DepartmentsChoices = [
    { label: "ADMINISTRATIVO", value: "ADMINISTRATIVO" },
    { label: "BORRACHARIA", value: "BORRACHARIA" },
    { label: "COMPRAS", value: "COMPRAS" },
    { label: "DEPARTAMENTO PESSOAL", value: "DEPARTAMENTO_PESSOAL" },
    { label: "DESENVOLVIMENTO", value: "DESENVOLVIMENTO" },
    { label: "EXPEDIÇÃO", value: "EXPEDICAO" },
    { label: "FATURAMENTO", value: "FATURAMENTO" },
    { label: "FINANCEIRO", value: "FINANCEIRO" },
    { label: "FISCAL", value: "FISCAL" },
    { label: "FROTAS", value: "FROTAS" },
    { label: "JOVEM APRENDIZ", value: "JOVEM_APRENDIZ" },
    { label: "LIMPEZA", value: "LIMPEZA" },
    { label: "MANUTENÇÃO", value: "MANUTENCAO" },
    { label: "MONITORAMENTO", value: "MONITORAMENTO" },
    { label: "OPERAÇÃO", value: "OPERACAO" },
    { label: "PORTARIA", value: "PORTARIA" },
    { label: "RECURSOS HUMANOS", value: "RECURSOS_HUMANOS" },
    { label: "RESERVA", value: "RESERVA" },
    { label: "TI", value: "TI" },
]

export const BranchesChoices = [
    { label: 'SPO', value: 1 },
    { label: 'REC', value: 2 },
    { label: 'SSA', value: 3 },
    { label: 'FOR', value: 4 },
    { label: 'MCZ', value: 5 },
    { label: 'NAT', value: 6 },
    { label: 'JPA', value: 7 },
    { label: 'AJU', value: 8 },
    { label: 'VDC', value: 9 },
    { label: 'CTG', value: 10 },
    { label: 'GVR', value: 11 },
    { label: 'VIX', value: 12 },
    { label: 'TCO', value: 13 },
    { label: 'UDI', value: 14 },
    { label: 'PNZ', value: 15 },
    { label: 'JSR', value: 151 },
    { label: 'JCT', value: 161 },
    { label: 'JCS', value: 162 },
]

const RecruiterChoices = [
    { label: "LARYSSA RODRIGUES", value: 1054 },
    { label: "MELISSA COSTA", value: 1640 },
    { label: "PAULA SANTOS", value: 2058 },
    { label: "RAQUEL SILVA", value: 1480 },
    { label: "THAYS ANDRADE", value: 650 },
]

const PrioritiesChoices = [
    "NORMAL",
    "MÉDIA",
    "ALTA",
].map(item => ({ label: item, value: item }))

const ContractsModeChoices = [
    "CLT",
    "JOVEM APRENDIZ",
    "PCD",
    "PESSOA JURÍDICA",
].map(item => ({ label: item, value: item }))

const TypeVacanciesChoices = [
    "AUMENTO DE QUADRO",
    "SUBSTITUIÇÃO",
    "TERCEIROS",
].map(item => ({ label: item, value: item }))

export const CompanyChoices = [
    "BORA",
    "JC",
    "JSR",
].map(item => ({ label: item, value: item }))

const styles: any = {
    input: {
        width: 240,
        textTransform: 'uppercase'
    }
}

interface VacancyEditProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    row: any;
    setRow: (value: any) => void;
    RolesChoices: any[];
}

export const VacancyEdit = memo(
    function VacancyEdit({ open, setOpen, row, setRow, RolesChoices }: VacancyEditProps) {
        const { verifyPermission }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        // EMPLOYEES
        const send = async () => {
            let body: any = { ...row }

            return await api.post('vacancies/', body)
        }

        const { mutate } = useMutation({
            mutationKey: ["vacancies"],
            mutationFn: send,
            onSuccess: () => {
                queryClient.invalidateQueries(["vacancies"])

                MainMessage.Ok(toaster, "Sucesso - Funcionário cadastrado.")

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

        const sendEmail = async () => {
            let body = {
                id: row.id,
                email_manager: row.email_manager,
                email_regional_manager: row.email_regional_manager,
                email_rh: row.email_rh,
                email_director: row.email_director,
            }

            if (!body.email_manager) {
                MainMessage.Error(toaster, "Preencha o campo de email do Gestor")
            } else body.email_manager = body.email_manager.toLowerCase()
            if (!body.email_regional_manager) {
                MainMessage.Error(toaster, "Preencha o campo de email do Gestor Regional")
            } else body.email_regional_manager = body.email_regional_manager.toLowerCase()
            if (!body.email_rh) {
                MainMessage.Error(toaster, "Preencha o campo de email do Gerente RH")
            } else body.email_rh = body.email_rh.toLowerCase()
            if (!body.email_director) {
                MainMessage.Error(toaster, "Preencha o campo de email do Diretor")
            } else body.email_director = body.email_director.toLowerCase()

            MainMessage.Info(toaster, "Emails estão sendo enviados...")

            return await api.patch('vacancies/emails/', body)
        }

        const { mutate: mutateEmail } = useMutation({
            mutationKey: ["vacancies"],
            mutationFn: sendEmail,
            onSuccess: () => {
                MainMessage.Ok(toaster, "Sucesso - Emails enviados.")
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
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={row} setData={setRow} size="full" overflow={false} >
                <MainModal.Header title="Adicionar Vaga" />
                <MainModal.Body>
                    {verifyPermission("employee_vacancy_admin") ? (
                        <>
                            <Panel header="Dados da Vaga">
                                <MainFormComponent.Row>
                                    <MainFormComponent.Input text="Título da Vaga:" name="title" style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.Input text="Faixa Salarial:" name="salary_range" style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.SelectPicker text="Modalidade de Contrato:" name="contract_mode" data={ContractsModeChoices} style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.SelectPicker text="Tipo de Vaga:" name="type_vacancy" data={TypeVacanciesChoices} style={styles.input} md={6} showHelpText={false} />
                                </MainFormComponent.Row>
                                <MainFormComponent.Row>
                                    <MainFormComponent.SelectPicker text="Cargo:" name="role" data={RolesChoices ? RolesChoices : []} style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.SelectPicker text="Departamento:" name="department" data={DepartmentsChoices} style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.SelectPicker text="Filial:" name="branch" data={BranchesChoices} style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.SelectPicker text="Empresa:" name="company" data={CompanyChoices} style={styles.input} md={6} showHelpText={false} />
                                </MainFormComponent.Row>
                                <MainFormComponent.Row>
                                    <MainFormComponent.DatePicker text="Previsão de Início:" name="date_expected_start" style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.DatePicker text="Data Relatada:" name="date_reported" style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.SelectPicker text="Prioridade:" name="priority" data={PrioritiesChoices} style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.Input text="Substituição:" name="replacement" style={styles.input} md={6} showHelpText={false} />
                                </MainFormComponent.Row>
                                <MainFormComponent.Row>
                                    <MainFormComponent.Input text="Escala de Trabalho:" name="work_schedule" style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.SelectPicker text="Recrutador:" name="recruiter" data={RecruiterChoices} style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.Textarea text="Descrição:" name="description" style={styles.input} md={6} showHelpText={false} />
                                </MainFormComponent.Row>
                            </Panel>
                            <Panel header="Informações de Preenchimento do RH">
                                <MainFormComponent.Row>
                                    <MainFormComponent.Input text="Email Gestor:" name="email_manager" style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.Input text="Email Gestor Regional:" name="email_regional_manager" style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.Input text="Email Gerente RH:" name="email_rh" style={styles.input} md={6} showHelpText={false} />
                                    <MainFormComponent.Input text="Email Diretor:" name="email_director" style={styles.input} md={6} showHelpText={false} />
                                </MainFormComponent.Row>
                                <Button appearance="primary" color="blue" onClick={() => mutateEmail()}>Enviar E-mails</Button>
                            </Panel>
                        </>) : (
                        <>
                            <Panel header="Dados da Vaga">
                                <MainFormComponent.Row>
                                    <MainFormComponent.Input text="Título da Vaga:" name="title" style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.Input text="Faixa Salarial:" name="salary_range" style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.SelectPicker text="Modalidade de Contrato:" name="contract_mode" data={ContractsModeChoices} style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.SelectPicker text="Tipo de Vaga:" name="type_vacancy" data={TypeVacanciesChoices} style={styles.input} md={6} showHelpText={false} readOnly />
                                </MainFormComponent.Row>
                                <MainFormComponent.Row>
                                    <MainFormComponent.SelectPicker text="Cargo:" name="role" data={RolesChoices ? RolesChoices : []} style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.SelectPicker text="Departamento:" name="department" data={DepartmentsChoices} style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.SelectPicker text="Filial:" name="branch" data={BranchesChoices} style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.SelectPicker text="Empresa:" name="company" data={CompanyChoices} style={styles.input} md={6} showHelpText={false} readOnly />
                                </MainFormComponent.Row>
                                <MainFormComponent.Row>
                                    <MainFormComponent.DatePicker text="Previsão de Início:" name="date_expected_start" style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.DatePicker text="Data Relatada:" name="date_reported" style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.SelectPicker text="Prioridade:" name="priority" data={PrioritiesChoices} style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.Input text="Substituição:" name="replacement" style={styles.input} md={6} showHelpText={false} readOnly />
                                </MainFormComponent.Row>
                                <MainFormComponent.Row>
                                    <MainFormComponent.Input text="Escala de Trabalho:" name="work_schedule" style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.SelectPicker text="Recrutador:" name="recruiter" data={RecruiterChoices} style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.Textarea text="Descrição:" name="description" style={styles.input} md={6} showHelpText={false} readOnly />
                                </MainFormComponent.Row>
                            </Panel>
                            <Panel header="Informações de Preenchimento do RH">
                                <MainFormComponent.Row>
                                    <MainFormComponent.Input text="Email Gestor:" name="email_manager" style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.Input text="Email Gestor Regional:" name="email_regional_manager" style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.Input text="Email Gerente RH:" name="email_rh" style={styles.input} md={6} showHelpText={false} readOnly />
                                    <MainFormComponent.Input text="Email Diretor:" name="email_director" style={styles.input} md={6} showHelpText={false} readOnly />
                                </MainFormComponent.Row>
                            </Panel>
                        </>)
                    }
                    <Panel header="Resultado Aprovação">
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Aprovação Gestor:" name="approval_manager" style={styles.input} md={6} showHelpText={false} readOnly />
                            <MainFormComponent.Input text="Aprovação Gestor Regional:" name="approval_regional_manager" style={styles.input} md={6} showHelpText={false} readOnly />
                            <MainFormComponent.Input text="Aprovação RH:" name="approval_rh" style={styles.input} md={6} showHelpText={false} readOnly />
                            <MainFormComponent.Input text="Aprovação Diretor:" name="approval_director" style={styles.input} md={6} showHelpText={false} readOnly />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.Textarea text="Comentário Gestor:" name="comment_manager" style={styles.input} md={6} showHelpText={false} readOnly />
                            <MainFormComponent.Textarea text="Comentário Gestor Regional" name="comment_regional_manager" style={styles.input} md={6} showHelpText={false} readOnly />
                            <MainFormComponent.Textarea text="Comentário RH" name="comment_rh" style={styles.input} md={6} showHelpText={false} readOnly />
                            <MainFormComponent.Textarea text="Comentário Diretor:" name="comment_director" style={styles.input} md={6} showHelpText={false} readOnly />
                        </MainFormComponent.Row>
                    </Panel>
                    <Panel header="Status da Solicitação">
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Status de Liberação:" name="status" style={styles.input} showHelpText={false} readOnly />
                        </MainFormComponent.Row>
                    </Panel>
                </MainModal.Body>
                {verifyPermission("employee_vacancy_admin") ?
                    <MainModal.FooterForm name="Alterar" close={close} /> :
                    <MainModal.FooterOne close={close} />
                }

            </MainModal.Form>
        )
    })

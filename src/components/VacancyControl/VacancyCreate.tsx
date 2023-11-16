import { Form, useToaster, Panel, Message } from "rsuite";

import { memo, useState } from "react";
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { DateToString } from "../../services/Date";
import { queryClient } from "../../services/QueryClient";

import { MainModal } from "../Global/Modal";
import { MainMessage } from "../Global/Message";
import { MainFormComponent } from "../Global/Component/Form";

const DepartmentsChoices = [
    { label: "ADMINISTRATIVO", value: "ADMINISTRATIVO " },
    { label: "BORRACHARIA", value: "BORRACHARIA " },
    { label: "COMPRAS", value: "COMPRAS " },
    { label: "DEPARTAMENTO PESSOAL", value: "DEPARTAMENTO_PESSOAL " },
    { label: "DESENVOLVIMENTO", value: "DESENVOLVIMENTO " },
    { label: "EXPEDIÇÃO", value: "EXPEDICAO " },
    { label: "FATURAMENTO", value: "FATURAMENTO " },
    { label: "FINANCEIRO", value: "FINANCEIRO " },
    { label: "FISCAL", value: "FISCAL " },
    { label: "FROTAS", value: "FROTAS " },
    { label: "JOVEM APRENDIZ", value: "JOVEM_APRENDIZ " },
    { label: "LIMPEZA", value: "LIMPEZA " },
    { label: "MANUTENÇÃO", value: "MANUTENCAO " },
    { label: "MONITORAMENTO", value: "MONITORAMENTO " },
    { label: "OPERAÇÃO", value: "OPERACAO " },
    { label: "PORTARIA", value: "PORTARIA " },
    { label: "RECURSOS HUMANOS", value: "RECURSOS_HUMANOS " },
    { label: "RESERVA", value: "RESERVA " },
    { label: "TI", value: "TI " },
].map(item => ({ label: item.label, value: item.value }))

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
].map(item => ({ label: item.label, value: item.value }))

const RecruiterChoices = [
    { label: "LARYSSA RODRIGUES", value: "ALTA" },
    { label: "MELISSA COSTA", value: "ALTA" },
    { label: "PAULA SANTOS", value: "NORMAL" },
    { label: "RAQUEL SILVA", value: "ALTA" },
    { label: "THAYS ANDRADE", value: "MEDIA" },
].map(item => ({ label: item.label, value: item.value }))

const PrioritiesChoices = [
    { label: "NORMAL", value: "NORMAL" },
    { label: "MÉDIA", value: "MEDIA" },
    { label: "ALTA", value: "ALTA" },
].map(item => ({ label: item.label, value: item.value }))

const ContractsModeChoices = [
    { label: "CLT", value: "CLT" },
    { label: "JOVEM APRENDIZ", value: "JA" },
    { label: "PCD", value: "PCD" },
    { label: "PESSOA JURÍDICA", value: "PJ" },
].map(item => ({ label: item.label, value: item.value }))

const TypeVacanciesChoices = [
    { label: "AUMENTO DE QUADRO", value: "AUMENTO_QUADRO" },
    { label: "SUBSTITUIÇÃO", value: "SUBSTITUICAO" },
    { label: "TERCEIROS", value: "TERCEIROS" },
].map(item => ({ label: item.label, value: item.value }))

export const CompanyChoices = [
    { label: "BORA", value: "BORA" },
    { label: "JC", value: "JC" },
    { label: "JSR", value: "JSR" },
].map(item => ({ label: item.label, value: item.value }))



const styles: any = {
    input: {
        width: 240,
        textTransform: 'uppercase'
    }
}

interface Form {

}

interface VacancyCreateProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

export const VacancyCreate = memo(
    function VacancyCreate({ open, setOpen }: VacancyCreateProps) {
        const api = useApi()
        const toaster = useToaster()

        const initialData = {
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
                            <MainFormComponent.Input text="Título da Vaga:" name="title" style={styles.input} md={6} />
                            <MainFormComponent.Input text="Faixa Salarial:" name="salary_range" style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.SelectPicker text="Modalidade de Contrato:" name="contract_mode" data={ContractsModeChoices} style={styles.input} md={6} />
                            <MainFormComponent.SelectPicker text="Tipo de Vaga:" name="type_vacancy" data={TypeVacanciesChoices} style={styles.input} md={6} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.SelectPicker text="Empresa:" name="company" data={CompanyChoices} style={styles.input} md={6} />
                            <MainFormComponent.SelectPicker text="Filial:" name="branch" data={BranchesChoices} style={styles.input} md={6} />
                            <MainFormComponent.SelectPicker text="Departamento:" name="department" data={DepartmentsChoices} style={styles.input} md={6} />
                            <MainFormComponent.SelectPicker text="Cargo:" name="role" data={CompanyChoices} style={styles.input} md={6} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.DatePicker text="Previsão de Início:" name="date_expected_start" style={styles.input} md={6} />
                            <MainFormComponent.DatePicker text="Data Relatada:" name="date_reported" style={styles.input} md={6} />
                            <MainFormComponent.SelectPicker text="Prioridade:" name="priority" data={PrioritiesChoices} style={styles.input} md={6} />
                            <MainFormComponent.Input text="Substituição:" name="replacement" style={styles.input} md={6} showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Escala de Trabalho:" name="work_schedule" style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.SelectPicker text="Recrutador:" name="date_reported" data={RecruiterChoices} style={styles.input} md={6} />
                            <MainFormComponent.Textarea text="Descrição:" name="description" style={styles.input} md={6} />
                        </MainFormComponent.Row>
                    </Panel>
                    <Panel header="Informações de Preenchimento do RH">
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Email Gestor:" name="bank" style={styles.input} md={6} />
                            <MainFormComponent.Input text="Email Gestor Regional:" name="bank" style={styles.input} md={6} />
                            <MainFormComponent.Input text="Email Gerente RH:" name="bank" style={styles.input} md={6} />
                            <MainFormComponent.Input text="Email Diretor:" name="bank" style={styles.input} md={6} />
                        </MainFormComponent.Row>
                    </Panel>
                    <Panel header="Resultado Aprovação">
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Aprovação Gestor:" name="salary" style={styles.input} md={6} />
                            <MainFormComponent.Input text="Aprovação Gestor Regional:" name="college" style={styles.input} md={6} />
                            <MainFormComponent.Input text="Aprovação Gerente RH:" name="salary" style={styles.input} md={6} />
                            <MainFormComponent.Input text="Aprovação Diretor:" name="college" style={styles.input} md={6} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.Textarea text="Comentário Gestor:" name="salary" style={styles.input} md={6} />
                            <MainFormComponent.Textarea text="Comentário Gestor Regional" name="college" style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.Textarea text="Comentário Gerente RH" name="salary" style={styles.input} md={6} />
                            <MainFormComponent.Textarea text="Comentário Diretor:" name="college" style={styles.input} md={6} showHelpText={false} />
                        </MainFormComponent.Row>
                    </Panel>
                    <Panel header="Status da Solicitação">
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Status de Liberação:" name="salary" style={styles.input} showHelpText={false} />
                        </MainFormComponent.Row>
                    </Panel>
                </MainModal.Body>
                <MainModal.FooterForm name="Criar" close={close} />
            </MainModal.Form>
        );
    });

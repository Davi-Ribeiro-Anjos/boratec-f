import { useToaster } from "rsuite";

import { memo, useState, useContext } from "react";
import { useMutation } from "react-query";
import { queryClient } from "../../../services/QueryClient";

import { AxiosError } from "axios";
import { useApi } from "../../../hooks/Api";
import { DateToString } from "../../../services/Date";

import { MainModal } from "../../Global/Modal";
import { MainMessage } from "../../Global/Message";
import { MainFormComponent } from "../../Global/Component/Form";
import { UserContext } from "../../../providers/UserProviders";

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

const BranchesChoices = [
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

interface Form {
    title: string | null;
    salary_range: string | null;
    contract_mode: string | null;
    type_vacancy: string | null;
    role: string | null;
    department: string | null;
    branch: number | null;
    company: string | null;
    date_expected_start: any;
    priority: string | null;
    replacement: string | null;
    work_schedule: string | null;
    description: string | null;
}

interface VacancyCreateProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    RolesChoices: any[];
}

export const VacancyCreate = memo(
    function VacancyCreate({ open, setOpen, RolesChoices }: VacancyCreateProps) {
        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const initialData = {
            title: null,
            salary_range: null,
            contract_mode: null,
            type_vacancy: null,
            role: null,
            department: null,
            branch: null,
            company: null,
            date_expected_start: null,
            priority: null,
            replacement: null,
            work_schedule: null,
            description: null,
            status: "NOVO",
            author: me.id
        }

        const [data, setData] = useState<Form>(initialData)

        // VACANCIES
        const send = async () => {
            let body = { ...data }


            if (body.date_expected_start) body.date_expected_start = DateToString(body.date_expected_start)

            if (body.title) body.title = body.title.toUpperCase()
            if (body.description) body.description = body.description.toUpperCase()
            if (body.replacement) body.replacement = body.replacement.toUpperCase()
            if (body.work_schedule) body.work_schedule = body.work_schedule.toUpperCase()
            if (body.salary_range) body.salary_range = body.salary_range.toUpperCase()


            console.log(body)

            return await api.post('vacancies/', body)
        }

        const { mutate } = useMutation({
            mutationKey: ["vacancies"],
            mutationFn: send,
            onSuccess: () => {
                queryClient.invalidateQueries(["vacancies"])

                MainMessage.Ok(toaster, "Sucesso - Vaga cadastrada.")

                close()
            },
            onError: (error: AxiosError) => {
                const message = {
                    title: "Título",
                    contract_mode: "Modalidade de Crontrato",
                    type_vacancy: "Tipo de Vaga",
                    role: "Cargo",
                    department: "Departamento",
                    branch: "Filial",
                    company: "Empresa",
                    date_expected_start: "Previsão de Início",
                    priority: "Prioridade",
                    work_schedule: "Escala de Trabalho",
                    description: "Descrição",
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
            }
        })

        const close = () => {
            setOpen(false)

            setData(initialData)
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size="full" overflow={false} >
                <MainModal.Header title="Adicionar Vaga" />
                <MainModal.Body>
                    <MainFormComponent.Row>
                        <MainFormComponent.Input text="Título da Vaga:" name="title" style={styles.input} md={6} />
                        <MainFormComponent.Input text="Faixa Salarial:" name="salary_range" style={styles.input} md={6} showHelpText={false} />
                        <MainFormComponent.SelectPicker text="Modalidade de Contrato:" name="contract_mode" data={ContractsModeChoices} style={styles.input} md={6} />
                        <MainFormComponent.SelectPicker text="Tipo de Vaga:" name="type_vacancy" data={TypeVacanciesChoices} style={styles.input} md={6} />
                    </MainFormComponent.Row>
                    <MainFormComponent.Row>
                        <MainFormComponent.SelectPicker text="Cargo:" name="role" data={RolesChoices ? RolesChoices : []} style={styles.input} md={6} />
                        <MainFormComponent.SelectPicker text="Departamento:" name="department" data={DepartmentsChoices} style={styles.input} md={6} />
                        <MainFormComponent.SelectPicker text="Filial:" name="branch" data={BranchesChoices} style={styles.input} md={6} />
                        <MainFormComponent.SelectPicker text="Empresa:" name="company" data={CompanyChoices} style={styles.input} md={6} />
                    </MainFormComponent.Row>
                    <MainFormComponent.Row>
                        <MainFormComponent.DatePicker text="Previsão de Início:" name="date_expected_start" style={styles.input} md={6} showHelpText={true} />
                        <MainFormComponent.SelectPicker text="Prioridade:" name="priority" data={PrioritiesChoices} style={styles.input} md={6} />
                        <MainFormComponent.Input text="Substituição:" name="replacement" style={styles.input} md={6} showHelpText={false} />
                        <MainFormComponent.Input text="Escala de Trabalho:" name="work_schedule" style={styles.input} md={6} showHelpText={false} />
                    </MainFormComponent.Row>
                    <MainFormComponent.Row>
                        <MainFormComponent.Textarea text="Descrição:" name="description" style={styles.input} md={6} />
                    </MainFormComponent.Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Criar" close={close} />
            </MainModal.Form>
        );
    });

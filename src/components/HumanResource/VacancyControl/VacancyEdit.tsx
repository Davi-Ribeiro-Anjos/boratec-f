import { useToaster, Panel } from "rsuite";

import { memo } from "react";
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../../hooks/Api";
import { queryClient } from "../../../services/QueryClient";

import { MainModal } from "../../Global/Modal";
import { MainMessage } from "../../Global/Message";
import { MainFormComponent } from "../../Global/Component/Form";
import { DateToString } from "../../../services/Date";

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
    "LARYSSA RODRIGUES",
    "MELISSA COSTA",
    "PAULA SANTOS",
    "RAQUEL SILVA",
    "THAYS ANDRADE",
].map(item => ({ label: item, value: item }))

const StatusChoices = [
    "NOVO",
    "EM ANDAMENTO",
    "APROVADO",
    "CONCLUIDO",
    "CANCELADO",
].map(item => ({ label: item, value: item }))

const MotiveChoices = [
    "DEMANDA FIM DE ANO",
    "NÃO PERFORMACE",
].map(item => ({ label: item, value: item }))

const InitiativeChoices = [
    "EMPREGADO",
    "EMPREGADOR",
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
}

export const VacancyEdit = memo(
    function VacancyEdit({ open, setOpen, row, setRow }: VacancyEditProps) {
        const api = useApi()
        const toaster = useToaster()

        // EMPLOYEES
        const send = async () => {
            let body: any = { ...row }

            if (body.date_requested) body.date_requested = DateToString(body.date_requested)
            if (body.date_expected_start) body.date_expected_start = DateToString(body.date_expected_start)
            if (body.date_limit) body.date_limit = DateToString(body.date_limit)
            if (body.date_vetta) body.date_vetta = DateToString(body.date_vetta)
            if (body.date_exam) body.date_exam = DateToString(body.date_exam)
            if (body.date_closed) body.date_closed = DateToString(body.date_closed)

            body.title = body.title.toUpperCase()
            if (body.selected) body.selected = body.selected.toUpperCase()
            if (body.observation) body.observation = body.observation.toUpperCase()

            delete body.author

            return await api.patch(`vacancies/${row.id}/`, body)
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

        const close = () => {
            setOpen(false)
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={row} setData={setRow} size="full" overflow={false} >
                <MainModal.Header title="Editar Vaga" />
                <MainModal.Body>
                    <Panel header="Dados da Vaga">
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Título da Vaga:" name="title" style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.SelectPicker text="Tipo de Vaga:" name="type_vacancy" data={TypeVacanciesChoices} style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.Input text="Solicitante:" name="author" style={styles.input} md={6} showHelpText={false} readOnly />
                            <MainFormComponent.SelectPicker text="Recrutador:" name="recruiter" data={RecruiterChoices} style={styles.input} md={6} showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.SelectPicker text="Empresa:" name="company" data={CompanyChoices} style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.SelectPicker text="Filial:" name="branch" data={BranchesChoices} style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.SelectPicker text="Motivo:" name="motive" data={MotiveChoices} style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.SelectPicker text="Iniciativa:" name="initiative" data={InitiativeChoices} style={styles.input} md={6} showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.InputNumber text="Quantidade:" name="quantity" style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.Input text="Selecionado:" name="selected" style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.SelectPicker text="Status:" name="status" data={StatusChoices} style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.Textarea text="Observação:" name="observation" style={styles.input} md={6} showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.DatePicker text="Data de Abertura:" name="date_requested" style={styles.input} md={6} showHelpText={false} readOnly />
                            <MainFormComponent.DatePicker text="Data Admissão:" name="date_expected_start" style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.DatePicker text="Data Limite:" name="date_limit" style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.DatePicker text="Data do Vetta:" name="date_vetta" style={styles.input} md={6} showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.DatePicker text="Date do Exame:" name="date_exam" style={styles.input} md={6} showHelpText={false} />
                            <MainFormComponent.DatePicker text="Data de Fechamento:" name="date_closed" style={styles.input} md={6} showHelpText={false} />
                        </MainFormComponent.Row>
                    </Panel>
                </MainModal.Body>
                <MainModal.FooterForm name="Alterar" close={close} />
            </MainModal.Form>
        )
    })

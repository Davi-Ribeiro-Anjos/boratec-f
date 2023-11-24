import { useToaster, Panel, Message } from "rsuite";

import { memo } from "react";
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { BranchesChoices, StatusEmployeeChoices } from "../../services/Choices";
import { CompanyChoices } from "../../services/Choices";
import { DateToString } from "../../services/Date";
import { queryClient } from "../../services/QueryClient";

import { MainMessage } from "../Global/Message";
import { MainModal } from "../Global/Modal";
import { MainFormComponent } from "../Global/Component/Form";

interface EmployeeEditProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    row: any | undefined;
    setRow: (value: any) => void;
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
            if (body.email) body.email = body.email.toLowerCase()
            if (body.date_admission) body.date_admission = DateToString(body.date_admission)

            delete body.user
            delete body.pj_complements

            return await api.patch(`employees/${row?.id}/`, body)
        }

        const { mutate: employeesMutate } = useMutation({
            mutationKey: ["employees"],
            mutationFn: editEmployees,
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
            if (body.subsistence_allowance) body.pj_complements.subsistence_allowance = Number(body.subsistence_allowance)
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
                    subsistence_allowance: "Ajuda de Custo",
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
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Nome Completo:" name="name" showHelpText={false} />
                            <MainFormComponent.SelectPicker text="Filial:" name="branch" data={BranchesChoices} showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Cargo:" name="role" showHelpText={false} />
                            <MainFormComponent.SelectPicker text="Empresa:" name="company" data={CompanyChoices} showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="CNPJ:" name="cnpj" value={cnpjMask(row ? row.cnpj : "")} showHelpText={false} />
                            <MainFormComponent.DatePicker text="Data Admissão:" name="date_admission" showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.SelectPicker text="Status:" name="status" data={StatusEmployeeChoices} showHelpText={false} />
                            <MainFormComponent.Input text="Email:" name="email" showHelpText={false} />
                        </MainFormComponent.Row>
                    </Panel>
                    <Panel header="Informações Bancárias do Funcionário">
                        <MainFormComponent.Row>
                            <MainFormComponent.Input text="Banco:" name="bank" showHelpText={false} />
                            <MainFormComponent.InputNumber text="Agência:" name="agency" showHelpText={false} />
                        </MainFormComponent.Row>
                        <MainFormComponent.Row>
                            <MainFormComponent.InputNumber text="Conta:" name="account" showHelpText={false} />
                            <MainFormComponent.Input text="Pix:" name="pix" showHelpText={false} />
                        </MainFormComponent.Row>
                    </Panel>
                    <Panel header="Informações de Valores do Funcionário">
                        <MainFormComponent.Row>
                            <MainFormComponent.InputNumber text="Salário:" name="salary" showHelpText={false} />
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
                <MainModal.FooterForm name="Editar" close={close} />
            </MainModal.Form>
        );
    });

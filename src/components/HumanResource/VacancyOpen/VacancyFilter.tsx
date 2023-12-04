import { useContext } from 'react'

import { UserContext } from "../../../providers/UserProviders";

import { MainFormComponent } from "../../Global/Component/Form";

const StatusChoices = [
    { label: "NOVO", value: "NOVO" },
    { label: "EM ANDAMENTO", value: "EM_ANDAMENTO" },
    { label: "APROVADO", value: "APROVADO" },
    { label: "CONCLUIDO", value: "CONCLUIDO" },
    { label: "CANCELADO", value: "CANCELADO" },
].map(item => ({ label: item.label, value: item.value }))

interface VacancyFilterProps { }


export function VacancyFilter({ }: VacancyFilterProps) {
    const { verifyPermission }: any = useContext(UserContext)

    return (
        <>
            <MainFormComponent.Row>
                <MainFormComponent.SelectPicker text="Status:" name="status" data={StatusChoices} showHelpText={false} />
                {verifyPermission("employee_vacancy_admin") && (
                    <MainFormComponent.Input text="Solicitante:" name="author__name__contains" showHelpText={false} />
                )}
            </MainFormComponent.Row>
        </>
    )
}
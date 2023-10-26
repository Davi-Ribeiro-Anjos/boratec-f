import { BranchesChoices, StatusEmployeeChoices, TypeContractChoices } from "../../services/Choices";

import { MainFormComponent } from "../Global/Component/Form";

interface RegistrationFilterProps {
    cnpj_cpf: string;
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

const cpfMask = (value: string) => {
    return value
        .replace(/\D+/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
}

const verifyMask = (value: string) => {
    if (value.length < 15) {
        return cpfMask(value)
    } else {
        return cnpjMask(value)
    }
}


export function RegistrationFilter({ cnpj_cpf }: RegistrationFilterProps) {

    return (
        <>
            <MainFormComponent.Row>
                <MainFormComponent.Input text="Funcionário:" name="name__contains" showHelpText={false} />
                <MainFormComponent.Input text="CNPJ/ CPF:" name="cnpj_cpf" value={verifyMask(cnpj_cpf)} showHelpText={false} />
            </MainFormComponent.Row>
            <MainFormComponent.Row>
                <MainFormComponent.SelectPicker text="Filial:" name="branch" data={BranchesChoices} showHelpText={false} />
                <MainFormComponent.SelectPicker text="Tipo Contrato:" name="type_contract" data={TypeContractChoices} showHelpText={false} />
            </MainFormComponent.Row>
            <MainFormComponent.Row>
                <MainFormComponent.SelectPicker text="Status:" name="status" data={StatusEmployeeChoices} showHelpText={false} />
            </MainFormComponent.Row>
        </>
    )
}
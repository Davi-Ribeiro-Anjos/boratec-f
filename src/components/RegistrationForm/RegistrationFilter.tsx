import { BranchesChoices, StatusEmployeeChoices, TypeContractChoices } from "../../services/Choices";

import { MainComponent } from "../Global/Component";

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
            <MainComponent.Row>
                <MainComponent.Input text="Funcionário:" name="name__contains" showHelpText={false} />
                <MainComponent.Input text="CNPJ/ CPF:" name="cnpj_cpf" value={verifyMask(cnpj_cpf)} showHelpText={false} />
            </MainComponent.Row>
            <MainComponent.Row>
                <MainComponent.SelectPicker text="Filial:" name="branch" data={BranchesChoices} showHelpText={false} />
                <MainComponent.SelectPicker text="Tipo Contrato:" name="type_contract" data={TypeContractChoices} showHelpText={false} />
            </MainComponent.Row>
            <MainComponent.Row>
                <MainComponent.SelectPicker text="Status:" name="status" data={StatusEmployeeChoices} showHelpText={false} />
            </MainComponent.Row>
        </>
    )
}
import { ColumnProps } from "rsuite";

export interface TokenInterface {
    accessToken: string | null;
    refreshToken: string | null;
}

interface Column extends ColumnProps {
    dataKey: string;
    url?: string;
    needAuth?: boolean;
    icon?: any;
    auth?: string;
    click?: (rowData: any) => void;
}

export interface ColumnsInterface {
    [key: string]: Column;
}

export interface PurchaseRequestInterface {
    id: number;
    numero_solicitacao: number;
    data_solicitacao_bo: string;
    data_vencimento_boleto?: string;
    data_conclusao_pedido?: string;
    status: string;
    departamento?: string;
    categoria?: string;
    forma_pagamento?: string;
    pago: boolean;
    observacao?: string;
    anexo?: string;
    filial: BranchesInterface;
    solicitante?: UserInterface;
    responsavel?: UserInterface;
    autor: UserInterface;
    ultima_atualizacao: UserInterface;
}

export interface AnnotationInterface {
    id: number;
    observacao: string;
    arquivo_1?: string;
    arquivo_2?: string;
    arquivo_3?: string;
    data_criacao: string;
    solicitacao: SimplePurchaseRequestInterface;
    autor?: UserInterface;
}

interface SimplePurchaseRequestInterface {
    id: number;
    numero_solicitacao: number;
    data_solicitacao_bo: string;
    data_vencimento_boleto?: string;
    data_conclusao_pedido?: string;
    status: string;
    observacao?: string;
}

interface UserInterface {
    id: number;
    username: string;
    email: string;
    is_active: boolean;
}

interface BranchesInterface {
    id: number;
    id_garagem: number;
    sigla: string;
}

export interface PalletControlInterface {
    localizacao_atual: string;
    CHEP: number;
    PBR: number;
    TOTAL: number;
}

export interface PalletMovementInterface {
    origem: number | null;
    destino: number | undefined;
    quantidade_paletes: number | null;
    tipo_palete: string | null;
    placa_veiculo: string;
    motorista: string;
    conferente: string;
}
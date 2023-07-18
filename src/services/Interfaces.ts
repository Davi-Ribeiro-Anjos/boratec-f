import { ColumnProps } from "rsuite";

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

export interface PurchaseRequest {
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
    filial: Branches;
    solicitante?: User;
    responsavel?: User;
    autor: User;
    ultima_atualizacao: User;
}

interface User {
    id: number;
    usernames: string;
    email: string;
    is_active: boolean;
}

interface Branches {
    id: number;
    id_garagem: number;
    sigla: string;
}
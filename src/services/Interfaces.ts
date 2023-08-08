import { ColumnProps } from "rsuite";

// TOKEN
export interface TokenInterface {
    accessToken: string | null;
    refreshToken: string | null;
}

// TABLE
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


// PURCHASES
export interface PurchaseRequestInterface {
    id: number;
    number_request: number;
    date_request: string;
    date_expiration?: string;
    date_completion?: string;
    status: string;
    department?: string;
    category?: string;
    payment_method?: string;
    paid: boolean;
    observation?: string;
    attachment?: string;
    branch: BranchesInterface;
    requester?: EmployeesSimpleInterface;
    responsible?: EmployeesSimpleInterface;
    author: EmployeesSimpleInterface;
    latest_updater: EmployeesSimpleInterface;
}
interface PurchaseRequestSimpleInterface {
    id: number;
    number_request: number;
    date_request: string;
    date_expiration?: string;
    date_completion?: string;
    status: string;
    observation?: string;
}
export interface AnnotationInterface {
    id: number;
    observation: string;
    file_1?: string;
    file_2?: string;
    file_3?: string;
    date_creation: string;
    request: PurchaseRequestSimpleInterface;
    author?: EmployeesSimpleInterface;
}


interface UserInterface {
    id: number;
    username: string;
    email: string;
    is_active: boolean;
}


// EMPLOYEES
export interface EmployeesInterface {
    id: number;
    name: string;
    cpf: string;
    cnpj: string;
    type_contract: string;
    role: string;
    bank: string;
    agency: string;
    account: string;
    pix: string;
    date_admission: string;
    active: boolean;
    branch: BranchesInterface;
    pj_complements: number;
    user: UserInterface;

    cnpj_cpf: string;
}
interface EmployeesSimpleInterface {
    id: number,
    name: string,
    user: UserInterface,
}


// BRANCHES
interface BranchesInterface {
    id: number;
    id_garage: number;
    abbreviation: string;
}


// PALLETS
export interface PalletControlInterface {
    current_location: string;
    CHEP: number;
    PBR: number;
    TOTAL: number;
}
export interface PalletMovementInterface {
    origin: number | null;
    destiny: number | undefined;
    quantity_pallets: number | null;
    type_pallet: string | null;
    vehicle_plate: string;
    driver: string;
    checker: string;
}
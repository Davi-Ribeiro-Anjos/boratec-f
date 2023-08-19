import { ColumnProps, IconButtonProps } from "rsuite";

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
    propsColumn?: ColumnProps;
    propsIcon?: IconButtonProps;
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


// USER
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
    date_birth: string;
    cpf: string;
    rg: string;
    cnpj: string;
    type_contract: string;
    role: string;
    company: string;
    street: string;
    number: string;
    complement: string;
    cep: string;
    district: string;
    city: string;
    uf: string;
    bank: string;
    agency: string;
    account: string;
    pix: string;
    date_admission: string;
    status: "ATIVO" | "DEMITIDO" | "AFASTADO";
    branch: BranchesInterface;
    pj_complements: number;
    user: UserInterface;

    cnpj_cpf: string;
}
export interface EmployeesSimpleInterface {
    id: number;
    name: string;
    user: UserInterface;
}
export interface EmployeesEPIsInterface {
    id: number;
    phone_model: string;
    phone_code: string;
    notebook_model: string;
    notebook_code: string;
    observation: string;
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

// DELIVERY HISTORY
export interface QueryNFInterface {
    garage: number;
    knowledge: number;
    date_emission: string;
    sender: string;
    recipient: string;
    weight: Float32Array;
    date_forecast: string;
    delivery_location: string;
    nf: string;
    occurrences: OccurrencesInterface[];
    packing_list: PackingListInterface[];
}

export interface OccurrencesInterface {
    date_occurrence: string;
    description_occurrence: string;
}

export interface PackingListInterface {
    packing_list: number;
    delivery_type: string;
    plate: string;
    date_exit: string;
    driver: string;
    phone: string;
    garage: number;
    knowledge: number;
    type_vehicle: string;
    nf: string;
}

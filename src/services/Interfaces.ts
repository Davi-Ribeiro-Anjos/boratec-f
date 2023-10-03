import { ColumnProps, IconButtonProps } from "rsuite";

// COMPONENT
export interface DefaultComponentFormInterface {
    text: string;
    name: string;
    helpText?: string;
    showHelpText?: boolean;
    tooltip?: boolean;
}
export interface DefaultComponentFormDataInterface {
    text: string;
    name: string;
    data: DataInterface[];
    helpText?: string;
    showHelpText?: boolean;
    tooltip?: boolean;
}
interface DataInterface {
    label: string;
    value: string | number;
}


// TOKEN
export interface TokenInterface {
    accessToken: string | null;
    refreshToken: string | null;
}
export interface MeInterface {
    id: number;
    name: string;
    branch: BranchesInterface;
    user: MeUserInterface;
}
export interface MeUserInterface {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    groups: Groups[];
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
}
interface Groups {
    name: string;
}

// TABLE
interface Column extends ColumnProps {
    dataKey: string;
    url?: string;
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
    pj_complements: PJComplementInterface;
    user: UserInterface;
    cnpj_cpf: string;
}
interface PJComplementInterface {
    salary: number;
    college: number;
    allowance: number;
    housing_allowance: number;
    covenant_credit: number;
    others_credits: number;
    advance_money: number;
    covenant_discount: number;
    others_discounts: number;
    observation: string;
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

// VEHICLE
export interface VehicleInterface {
    id: number;
    type_vehicle: string | null;
    vehicle_plate: string;
    last_movement: FleetAvailabilityInterface;
    active: boolean;
    branch: BranchesInterface;
}
interface FleetAvailabilityInterface {
    id: number;
    date_occurrence: string;
    date_release: string;
    date_forecast: string;
    status: string;
}

// EPIS
export interface EpiRequestInterface {
    id: number;
    date_requested: string;
    date_send: string;
    date_confirmed: string;
    date_canceled: string;
    attachment_confirm: any;
    status: string;
    employee_name: string | null;
    branch: BranchesInterface;
    employee: EmployeesInterface;
    author_create: EmployeesInterface;
    epis_carts: EpiCartInterface[];
}
export interface EpiCartInterface {
    id: number;
    quantity: number;
    size: EpiSizeRequestInterface[];
}

export interface EpiGroupInterface {
    id: number;
    name: string;
    epis_items: EpiItemInterface[];
}
export interface EpiItemInterface {
    id: number;
    description: string;
    ca?: string;
    validity: string;
    epis_sizes: EpiSizeInterface[];
}
export interface EpiItemRequestInterface {
    id: number;
    description: string;
    ca?: string;
    validity: string;
    time_for_use: number;
}
export interface EpiSizeInterface {
    id: number;
    size: string;
    quantity: number;
    quantity_minimum: number;
    quantity_provisory: number;
}
export interface EpiSizeRequestInterface {
    id: number;
    size: string;
    quantity: number;
    item: EpiItemRequestInterface;
}

import { EmployeeCreate } from "./EmployeeCreate";
import { EmployeeEdit } from "./EmployeeEdit";
import { EmployeeFilter } from "./EmployeeFilter";
import { EmployeeHeader } from "./EmployeeHeader";
import { EmployeeService } from "./EmployeeService";


export const Employee = {
    Header: EmployeeHeader,
    Filter: EmployeeFilter,
    Create: EmployeeCreate,
    Edit: EmployeeEdit,
    Service: EmployeeService,
}
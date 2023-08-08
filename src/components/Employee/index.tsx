import { EmployeeCreate } from "./EmployeeCreate";
import { EmployeeEdit } from "./EmployeeEdit";
import { EmployeeFilter } from "./EmployeeFilter";
import { EmployeeHeader } from "./EmployeeHeader";
import { EmployeeService } from "./EmployeeService";
import { EmployeeService13 } from "./EmployeeService13";
import { EmployeeServiceBonus } from "./EmployeeServiceBonus";
import { EmployeeServiceContract } from "./EmployeeServiceContract";
import { EmployeeServiceHoliday } from "./EmployeeServiceHoliday";



export const Employee = {
    Header: EmployeeHeader,
    Filter: EmployeeFilter,
    Create: EmployeeCreate,
    Edit: EmployeeEdit,
    Service: EmployeeService,
    ServiceContract: EmployeeServiceContract,
    Service13: EmployeeService13,
    ServiceHoliday: EmployeeServiceHoliday,
    ServiceBonus: EmployeeServiceBonus,
}
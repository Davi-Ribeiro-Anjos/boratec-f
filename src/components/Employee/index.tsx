import { EmployeeCreate } from "./EmployeeCreate";
import { EmployeeEdit } from "./EmployeeEdit";
import { EmployeeFilter } from "./EmployeeFilter";
import { EmployeeHeader } from "./EmployeeHeader";
import { EmployeeService } from "./Service/EmployeeService";
import { EmployeeService13 } from "./Service/EmployeeService13";
import { EmployeeServiceBonus } from "./Service/EmployeeServiceBonus";
import { EmployeeServiceContract } from "./Service/EmployeeServiceContract";
import { EmployeeServiceHoliday } from "./Service/EmployeeServiceHoliday";


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
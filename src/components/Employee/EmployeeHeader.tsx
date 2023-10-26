import PlusIcon from '@rsuite/icons/Plus';
import MoreIcon from '@rsuite/icons/More';

import { useState, memo, useContext } from "react";

import { UserContext } from '../../providers/UserProviders';

import { MainComponent } from "../Global/Component";
import { Employee } from ".";

interface EmployeeHeaderProps { }


export const EmployeeHeader = memo(function EmployeeHeader({ }: EmployeeHeaderProps) {
    const { verifyPermissionPage }: any = useContext(UserContext)

    const [openCreate, setOpenCreate] = useState(false)

    const [openService, setOpenService] = useState(false)

    return (
        <div>
            <MainComponent.ButtonHeader name="Nova Funcionário" setOpen={setOpenCreate} icon={<PlusIcon />} color="green" />
            <Employee.Create open={openCreate} setOpen={setOpenCreate} />

            {verifyPermissionPage("employee_admin") && (
                <>
                    <MainComponent.ButtonHeader name="Serviços PJ" setOpen={setOpenService} icon={<MoreIcon />} color="cyan" />
                    <Employee.Service open={openService} setOpen={setOpenService} />
                </>
            )}
        </div>
    )
})
import { IconButton, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
import EmailFillIcon from '@rsuite/icons/EmailFill';
// import ListIcon from '@rsuite/icons/List';
import { styles } from "../../assets/styles";

import { useState, memo, useContext } from "react";

import { Employee } from ".";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserProviders";

interface EmployeeHeaderProps { }


export const EmployeeHeader = memo(function EmployeeHeader({ }: EmployeeHeaderProps) {

    const { verifyPermissionPage }: any = useContext(UserContext)

    const navigate = useNavigate()

    const [openCreate, setOpenCreate] = useState(false)

    // const [openService, setOpenService] = useState(false)

    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Nova Funcionário</Tooltip>}>
                <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconButton} onClick={() => setOpenCreate(true)} />
            </Whisper>

            {verifyPermissionPage("employee_admin") &&
                <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Tela de Pagamento</Tooltip>}>
                    <IconButton icon={<EmailFillIcon />} appearance="primary" color="cyan" style={styles.iconButton} onClick={() => navigate("/rh/funcionarios-pj/pagamentos")} />
                </Whisper>
            }
            {/* <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Serviços</Tooltip>}>
                <IconButton icon={<ListIcon />} appearance="primary" color="cyan" style={styles.iconButton} onClick={() => setOpenService(true)} />
            </Whisper> */}
            <Employee.Create open={openCreate} setOpen={setOpenCreate} />
            {/* <Employee.Service open={openService} setOpen={setOpenService} /> */}
        </div>
    )
})
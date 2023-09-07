import { IconButton, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
import EmailFillIcon from '@rsuite/icons/EmailFill';
// import ListIcon from '@rsuite/icons/List';

import { useState, memo } from "react";

import { Employee } from ".";
import { styles } from "../../assets/styles";
import { useNavigate } from "react-router-dom";

interface EmployeeHeaderProps { }


export const EmployeeHeader = memo(function EmployeeHeader({ }: EmployeeHeaderProps) {
    console.log("painel solicitacao compra")

    const navigate = useNavigate()

    const [openCreate, setOpenCreate] = useState(false)

    // const [openService, setOpenService] = useState(false)

    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Nova Funcionário</Tooltip>}>
                <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconButton} onClick={() => setOpenCreate(true)} />
            </Whisper>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Tela de Pagamento</Tooltip>}>
                <IconButton icon={<EmailFillIcon />} appearance="primary" color="cyan" style={styles.iconButton} onClick={() => navigate("/rh/funcionarios-pj/pagamentos")} />
            </Whisper>
            {/* <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Serviços</Tooltip>}>
                <IconButton icon={<ListIcon />} appearance="primary" color="cyan" style={styles.iconButton} onClick={() => setOpenService(true)} />
            </Whisper> */}
            <Employee.Create open={openCreate} setOpen={setOpenCreate} />
            {/* <Employee.Service open={openService} setOpen={setOpenService} /> */}
        </div>
    )
})
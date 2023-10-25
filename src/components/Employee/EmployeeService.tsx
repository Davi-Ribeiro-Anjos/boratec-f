import { Grid, IconButton, Panel, Tooltip, Whisper } from "rsuite";
import EmailFillIcon from '@rsuite/icons/EmailFill';
import CharacterLockIcon from '@rsuite/icons/CharacterLock';
import GrowthIcon from '@rsuite/icons/Growth';
// import WaitIcon from '@rsuite/icons/Wait';
// import AdvancedAnalyticsIcon from '@rsuite/icons/AdvancedAnalytics';

import { memo } from "react"

import { MainDrawer } from "../Global/Drawer";
import { useNavigate } from "react-router-dom";
import { styles } from "../../assets/styles";

interface EmployeeServiceProps {
    open: boolean;
    setOpen: (value: any) => void;
}

interface PanelServiceInterface {
    title: string;
    icon: any;
    path: string;
    close: () => void;
}

const PanelService = ({ title, icon, path, close }: PanelServiceInterface) => {
    const navigate = useNavigate()

    const nav = () => {
        navigate(path)
        close()
    }

    return (
        <Panel bordered style={{ marginBottom: 15 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h6>{title}</h6>
                <Whisper placement="left" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Tela de {title}</Tooltip>}>
                    <IconButton style={styles.iconButton} appearance="primary" color="cyan" icon={icon} onClick={nav} />
                </Whisper>
            </div>
        </Panel>
    )
}


export const EmployeeService = memo(
    function EmployeeService({ open, setOpen }: EmployeeServiceProps) {

        const close = () => {
            setOpen(false)
        }

        return (
            <MainDrawer.Root open={open} close={close} placement="right" >
                <MainDrawer.HeaderView close={close} title="Serviços PJ" />
                <MainDrawer.Body>
                    <Grid fluid>
                        <PanelService title="Pagamentos" icon={<EmailFillIcon />} path="/rh/funcionarios-pj/pagamentos" close={close} />
                        <PanelService title="13º Salários" icon={<GrowthIcon />} path="/rh/funcionarios-pj/pagamentos" close={close} />
                        <PanelService title="Contratos" icon={<CharacterLockIcon />} path="/rh/funcionarios-pj/pagamentos" close={close} />
                        {/* <PanelService title="Férias" icon={<WaitIcon />} path="/rh/funcionarios-pj/pagamentos" close={close} />
                        <PanelService title="Bônus" icon={<AdvancedAnalyticsIcon />} path="/rh/funcionarios-pj/pagamentos" close={close} /> */}
                    </Grid>
                </MainDrawer.Body>
            </MainDrawer.Root >
        )
    }
)
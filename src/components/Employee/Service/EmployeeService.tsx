import { Grid, PanelGroup } from "rsuite";

import { memo } from "react"

import { MainDrawer } from "../../Global/Drawer";
import { Employee } from "..";

interface EmployeeServiceProps {
    open: boolean;
    setOpen: (value: any) => void;
}


export const EmployeeService = memo(
    function EmployeeService({ open, setOpen }: EmployeeServiceProps) {
        console.log("services")

        const close = () => {
            setOpen(false)
        }

        return (
            <MainDrawer.Root open={open} close={close} placement="right">
                <MainDrawer.HeaderView close={close} title="Serviços PJ" />
                <MainDrawer.Body>
                    <Grid fluid>
                        <PanelGroup accordion>
                            <Employee.ServiceContract />
                            <Employee.Service13 />
                            <Employee.ServiceHoliday />
                            <Employee.ServiceBonus />
                        </PanelGroup>
                    </Grid>
                </MainDrawer.Body>
            </MainDrawer.Root>
        )
    }
)
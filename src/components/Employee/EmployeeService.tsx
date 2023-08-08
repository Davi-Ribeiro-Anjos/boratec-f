import { Col, Grid, IconButton, Loader, Panel, PanelGroup, Row, Tooltip, Whisper, useToaster } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import ListIcon from '@rsuite/icons/List';

import { useState, memo, useContext } from "react"
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";


import { MainPanel } from "../Panel";
import { MainDrawer } from "../Drawer";
import { MainMessage } from "../Message";
import { Employee } from ".";

interface EmployeeServiceProps {
    open: boolean;
    setOpen: (value: any) => void;
}

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 250,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
    col: {
        margin: "10px 0",
    },
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
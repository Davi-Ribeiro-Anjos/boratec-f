import { Form, Grid } from "rsuite";

import { ReactNode } from "react";

import { PanelRoot } from "./PanelRoot";

interface PanelFilterProps {
    header?: string;
    filter: any;
    setFilter: any;
    send: () => void;
    children: ReactNode;
}


export function PanelFilter({ header = "Filtros", filter, setFilter, send, children }: PanelFilterProps) {

    return (
        <PanelRoot header={header} width={100} bordered collapsible defaultExpanded>
            <Grid style={{ width: "100%" }}>
                <Form fluid onSubmit={send} onChange={setFilter} formValue={filter}>
                    {children}
                </Form>
            </Grid>
        </PanelRoot>
    )
}
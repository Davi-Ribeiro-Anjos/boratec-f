import { Form, Grid } from "rsuite";

import { ReactNode } from "react";

import { PanelRoot } from "./PanelRoot";

interface PanelFilterProps {
    header?: string;
    filter: any;
    setFilter: any;
    refetch: () => void;
    defaultExpanded?: boolean;
    children: ReactNode;
}


export function PanelFilter({ header = "Filtros", filter, setFilter, refetch, defaultExpanded = true, children }: PanelFilterProps) {

    return (
        <PanelRoot header={header} width={100} bordered collapsible defaultExpanded={defaultExpanded}>
            <Grid style={{ width: "100%" }}>
                <Form fluid onSubmit={refetch} onChange={setFilter} formValue={filter}>
                    {children}
                </Form>
            </Grid>
        </PanelRoot>
    )
}
import { Button, Col, Form, Grid, Row } from "rsuite";
import { ReactNode } from "react";

import { PanelRoot } from "./PanelRoot";

interface PanelFilterProps<T extends Record<string, any>> {
    header?: string;
    filter: T;
    send: () => void;
    setFilter: any;
    clear: () => void;
    children: ReactNode;
}


export function PanelFilter<T extends Record<string, any>>({ header = "Filtros", send, filter, setFilter, clear, children }: PanelFilterProps<T>) {

    return (
        <PanelRoot header={header} width={100} bordered collapsible defaultExpanded>
            <Grid style={{ width: "100%" }}>
                <Form fluid onSubmit={send} onChange={setFilter} formValue={filter}>
                    {children}
                    <Row>
                        <Col xs={20}></Col>
                        <Col xs={2}>
                            <Button type="submit" appearance="primary">
                                Filtrar
                            </Button>
                        </Col>
                        <Col xs={2}>
                            <Button onClick={clear}>
                                Limpar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Grid>
        </PanelRoot>
    )
}
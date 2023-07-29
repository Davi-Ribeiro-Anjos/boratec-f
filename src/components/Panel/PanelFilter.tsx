import { Button, Col, Form, Grid, Row } from "rsuite";

import { ReactNode, useState } from "react";

import { PanelRoot } from "./PanelRoot";

interface PanelFilterProps<T> {
    header?: string;
    propsFilter: T
    send: (filter: any) => void;
    children: ReactNode;
}


export function PanelFilter<T>({ header = "Filtros", propsFilter, send, children }: PanelFilterProps<T>) {

    const [filter, setFilter] = useState<any>({})

    const clear = () => {
        setFilter(propsFilter)
    }

    return (
        <PanelRoot header={header} width={100} bordered collapsible defaultExpanded>
            <Grid style={{ width: "100%" }}>
                <Form fluid onSubmit={() => send(filter)} onChange={setFilter} formValue={filter}>
                    {children}
                    <Row>
                        <Col xs={20}></Col>
                        <Col xs={2}>
                            <Button type="submit" appearance="primary">
                                Filtrar
                            </Button>
                        </Col>
                        <Col xs={2}>
                            <Button onClick={() => clear()}>
                                Limpar
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Grid>
        </PanelRoot>
    )
}
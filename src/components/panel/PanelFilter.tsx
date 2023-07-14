import { Button, Col, Form, Grid, Row } from "rsuite";
import { ReactNode } from "react";

import { PanelRoot } from "./PanelRoot";

interface PanelFilterProps {
    header?: string;
    clear: () => void;
    children: ReactNode;
}


export function PanelFilter({ header = "Filtros", clear, children }: PanelFilterProps) {

    const pass = () => {
        console.log("pass")
    }

    return (
        <PanelRoot header={header} width={100} bordered collapsible>
            <Grid style={{ width: "100%" }}>
                <Form fluid onSubmit={pass}>
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
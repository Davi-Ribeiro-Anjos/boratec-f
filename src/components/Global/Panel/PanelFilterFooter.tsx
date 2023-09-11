import { Button, Col, Row } from "rsuite";

interface PanelFilterFooterProps {
    clear: () => void;
}


export function PanelFilterFooter({ clear }: PanelFilterFooterProps) {
    return (
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
    )
}
import { Button, Row } from "rsuite";

interface PanelFilterFooterProps {
    clear: () => void;
}


export function PanelFilterFooter({ clear }: PanelFilterFooterProps) {
    return (
        <Row>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                <Button type="submit" appearance="primary" style={{ margin: "0 15px" }}>
                    Filtrar
                </Button>
                <Button onClick={clear}>
                    Limpar
                </Button>
            </div>
        </Row>
    )
}
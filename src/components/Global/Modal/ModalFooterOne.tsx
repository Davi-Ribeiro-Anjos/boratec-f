import { Button, Modal } from "rsuite";

interface ModalFooterOneProps {
    close: () => void;
    appearance?: "default" | "primary" | "subtle" | "link";
}


export function ModalFooterOne({ close, appearance = "subtle" }: ModalFooterOneProps) {
    return (
        <Modal.Footer>
            <Button onClick={close} appearance={appearance}>
                Fechar
            </Button>
        </Modal.Footer>
    )
}
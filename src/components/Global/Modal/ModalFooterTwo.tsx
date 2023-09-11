import { Button, Modal } from "rsuite";

interface ModalFooterTwoProps {
    open: () => void;
    close: () => void;
    name: string;
    appearance?: "default" | "primary" | "subtle" | "link";
}


export function ModalFooterTwo({ open, close, name, appearance = "primary" }: ModalFooterTwoProps) {
    return (
        <Modal.Footer>
            <Button onClick={open} appearance={appearance}>
                {name}
            </Button>
            <Button onClick={close} appearance="subtle">
                Cancelar
            </Button>
        </Modal.Footer>
    )
}
import { Button, Modal } from "rsuite";

interface ModalFooterFormProps {
    close: () => void;
    name: string;
    appearance?: "default" | "primary" | "subtle" | "link";
}


export function ModalFooterForm({ close, name, appearance = "primary" }: ModalFooterFormProps) {
    return (
        <Modal.Footer>
            <Button type="submit" appearance={appearance}>
                {name}
            </Button>
            <Button onClick={close} appearance="subtle">
                Cancelar
            </Button>
        </Modal.Footer>
    )
}
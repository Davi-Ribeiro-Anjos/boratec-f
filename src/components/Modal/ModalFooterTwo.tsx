import { Button, Modal } from "rsuite";

interface ModalFooterTwoProps {
    close: () => void;
    name: string;
    appearance?: "default" | "primary" | "subtle" | "link";
}


export function ModalFooterTwo({ close, name, appearance = "primary" }: ModalFooterTwoProps) {
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
import { Button, Modal } from "rsuite";

interface ModalFooterThreeProps {
    otherFunction: () => void;
    close: () => void;
    name1: string;
    name2: string;
    appearance?: "default" | "primary" | "subtle" | "link";
}


export function ModalFooterThree({ otherFunction, close, name1, name2, appearance = "primary" }: ModalFooterThreeProps) {
    return (
        <Modal.Footer>
            <Button type="submit" appearance={appearance} color="green">
                {name1}
            </Button>
            <Button onClick={otherFunction} appearance={appearance} color="red">
                {name2}
            </Button>
            <Button onClick={close} appearance="subtle">
                Cancelar
            </Button>
        </Modal.Footer>
    )
}
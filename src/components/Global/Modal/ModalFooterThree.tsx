import { Button, Modal } from "rsuite";

interface ModalFooterThreeProps {
    otherFunction: () => void;
    close: () => void;
    name1: string;
    name2: string;
    color?: 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'violet';
    appearance?: "default" | "primary" | "subtle" | "link";
}


export function ModalFooterThree({ otherFunction, close, name1, name2, color = "red", appearance = "primary" }: ModalFooterThreeProps) {
    return (
        <Modal.Footer>
            <Button type="submit" appearance={appearance} color="green">
                {name1}
            </Button>
            <Button onClick={otherFunction} appearance={appearance} color={color}>
                {name2}
            </Button>
            <Button onClick={close} appearance="subtle">
                Cancelar
            </Button>
        </Modal.Footer>
    )
}
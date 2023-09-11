import { Modal } from "rsuite";

interface ModalHeaderProps {
    title: string;
}


export function ModalHeader({ title }: ModalHeaderProps) {
    return (
        <Modal.Header>
            <Modal.Title>
                {title}
            </Modal.Title>
        </Modal.Header>
    )
}
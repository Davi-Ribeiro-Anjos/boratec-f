import { Modal } from "rsuite";

import { ReactNode } from "react";

interface ModalBodyProps {
    children: ReactNode;
}


export function ModalBody({ children }: ModalBodyProps) {
    return (
        <Modal.Body>
            {children}
        </Modal.Body>
    )
}
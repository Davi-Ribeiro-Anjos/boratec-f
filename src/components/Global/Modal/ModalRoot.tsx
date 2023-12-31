import { Modal, ModalProps } from "rsuite";

import { ReactNode } from "react";

interface ModalRootProps extends ModalProps {
    close: () => void;
    children: ReactNode;
}

const styles: { [key: string]: React.CSSProperties } = {
    modal: {
        marginBottom: 30
    }
}

export function ModalRoot({ close, children, ...props }: ModalRootProps) {
    return (
        <Modal style={styles.modal} onClose={close} {...props} >
            {children}
        </Modal>
    )
}
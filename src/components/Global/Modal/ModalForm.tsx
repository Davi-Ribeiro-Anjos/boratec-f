import { Form, Modal, ModalProps } from "rsuite";

import { ReactNode } from "react";

interface ModalFormProps extends ModalProps {
    send: any;
    close: () => void;
    data: any;
    setData: (data: any) => void;
    fluid?: boolean;
    children: ReactNode;
}

const styles: { [key: string]: React.CSSProperties } = {
    modal: {
        marginBottom: 30
    }
}

export function ModalForm({ send, close, data, setData, fluid = false, children, ...props }: ModalFormProps) {
    return (
        <Modal style={styles.modal} onClose={close} {...props}  >
            <Form onSubmit={() => { if (send) send(data) }} onChange={setData} formValue={data} fluid={fluid}>
                {children}
            </Form>
        </Modal>
    )
}
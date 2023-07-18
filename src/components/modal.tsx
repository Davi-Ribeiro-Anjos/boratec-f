import { Modal, Button, Form, ModalProps } from "rsuite";

import { ReactNode } from "react";

interface MainModalProps extends ModalProps {
    send: () => void;
    close: () => void;
    form: any;
    setForm: any;
    title: string;
    nameButton: string;
    isView?: boolean;
    children: ReactNode;
}

const styles: { [key: string]: React.CSSProperties } = {
    modal: {
        marginBottom: 30
    }
}


export function MainModal({ form, setForm, send, close, open, title, nameButton,
    overflow = false, isView = false, size = "sm", children, ...props }: MainModalProps) {
    console.log("main modal")

    return (
        <Modal style={styles.modal} overflow={overflow} size={size} open={open} onClose={close}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            {isView === false ? (
                <Form onChange={setForm} formValue={form} >
                    <Modal.Body>
                        {children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={send} appearance="primary">
                            {nameButton}
                        </Button>
                        <Button onClick={close} appearance="subtle">
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Form>
            )
                : (
                    <>
                        <Modal.Body>
                            {children}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={close} appearance="subtle">
                                Cancelar
                            </Button>
                        </Modal.Footer>
                    </>
                )
            }
        </Modal>
    )
}

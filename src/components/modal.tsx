import { Modal, Button, Form } from "rsuite";

import React from "react";

interface MainModalProps {
    send: () => void;
    close: () => void;
    form: any;
    open: boolean;
    title: string;
    nameButton: string;
    overflow?: boolean;
    isView?: boolean;
    size?: "full" | "lg" | "md" | "sm" | "xs";
    children: React.ReactNode;
}

const styles: { [key: string]: React.CSSProperties } = {
    modal: {
        marginBottom: 30
    }
}


export function MainModal({ form, send, close, open, title, nameButton, overflow = false, isView = false, size = "sm", children }: MainModalProps) {
    console.log("main modal")

    return (
        <Modal style={styles.modal} overflow={overflow} size={size} open={open} onClose={() => close()}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            {isView === false ? (
                <Form onSubmit={send} formValue={form} >
                    <Modal.Body>
                        {children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" appearance="primary">
                            {nameButton}
                        </Button>
                        <Button onClick={() => close()} appearance="subtle">
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
                            <Button onClick={() => close()} appearance="subtle">
                                Cancelar
                            </Button>
                        </Modal.Footer>
                    </>
                )
            }
        </Modal>
    )
}

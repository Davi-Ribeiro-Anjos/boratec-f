import { Modal, Button, Form, ModalProps } from "rsuite";

import { ReactNode, memo } from "react";

interface MainModalProps extends ModalProps {
    send?: (data: any) => void;
    close: () => void;
    data?: any;
    setData?: any;
    title: string;
    nameButton?: string;
    isView?: boolean;
    children: ReactNode;
}

const styles: { [key: string]: React.CSSProperties } = {
    modal: {
        marginBottom: 30
    }
}


export const MainModal = memo(function MainModal({ data, setData, send, close, open, title, nameButton,
    overflow = false, isView = false, size = "sm", children, ...props }: MainModalProps) {
    console.log("main modal")

    return (
        <Modal style={styles.modal} overflow={overflow} size={size} open={open} onClose={close} {...props}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            {isView === false ? (
                <Form onSubmit={() => { if (send) send(data) }} onChange={setData} formValue={data}>
                    <Modal.Body>
                        {children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" appearance="primary">
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
})

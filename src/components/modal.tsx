import { Modal, Button } from 'rsuite';

import React from 'react';

interface MainModalProps {
    send: () => void;
    close: () => void;
    open: boolean;
    title: string;
    nameButton: string;
    overflow?: boolean;
    isView?: boolean;
    size?: 'full' | 'lg' | 'md' | 'sm' | 'xs';
    children: React.ReactNode;
}

const style: { [key: string]: React.CSSProperties } = {
    modal: {
        marginBottom: 30
    }
}


export function MainModal({ send, close, open, title, nameButton, overflow = false, isView = false, size = 'sm', children }: MainModalProps) {
    console.log("modal")

    return (
        <Modal style={style.modal} overflow={overflow} size={size} open={open} onClose={() => close()}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                {isView === false ?
                    <>
                        <Button onClick={() => send()} appearance="primary">
                            {nameButton}
                        </Button>
                        <Button onClick={() => close()} appearance="subtle">
                            Cancelar
                        </Button>
                    </>
                    :
                    <Button onClick={() => close()} appearance="subtle">
                        Fechar
                    </Button>
                }

            </Modal.Footer>
        </Modal>
    )
}

import { Button, Drawer } from "rsuite"

import React from "react"

interface MainDrawerProps {
    close: () => void;
    open: boolean;
    title: string;
    backdrop?: boolean;
    size?: 'full' | 'lg' | 'md' | 'sm' | 'xs';
    children: React.ReactNode;
}

const styles = {
    body: {
        padding: 15
    }
}

export function MainDrawer({ open, close, title, backdrop = true, size = "sm", children }: MainDrawerProps) {
    console.log("main drawer")

    return (
        <Drawer backdrop={backdrop} size={size} open={open} onClose={() => close()}>
            <Drawer.Header>
                <Drawer.Title>{title}</Drawer.Title>
                <Drawer.Actions>
                    <Button onClick={() => close()}>Fechar</Button>
                    {/* <Button onClick={() => setOpen(false)} appearance="primary">
                        Confirm
                    </Button> */}
                </Drawer.Actions>
            </Drawer.Header >
            <Drawer.Body style={styles.body} >
                {children}
            </Drawer.Body>
        </Drawer >
    )
}

export default MainDrawer;
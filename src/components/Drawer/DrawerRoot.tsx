import { Drawer, DrawerProps } from "rsuite"

import { ReactNode } from "react"


interface DrawerRootProps extends DrawerProps {
    open: boolean;
    close: () => void;
    children: ReactNode;
}


export function DrawerRoot({ open, close, children, ...props }: DrawerRootProps) {
    return (
        <Drawer open={open} onClose={close} {...props} >
            {children}
        </Drawer >
    )
}
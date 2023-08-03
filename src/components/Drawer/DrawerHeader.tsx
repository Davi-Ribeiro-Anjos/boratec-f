import { Button, Drawer } from "rsuite"

interface DrawerHeaderProps {
    title: string;
    name: string;
    openModal: () => void;
    close: () => void;
}


export function DrawerHeader({ openModal, close, title, name }: DrawerHeaderProps) {
    return (
        <Drawer.Header>
            <Drawer.Title>{title}</Drawer.Title>
            <Drawer.Actions>
                <Button onClick={close}>Fechar</Button>
                <Button onClick={openModal} appearance="primary">
                    {name}
                </Button>
            </Drawer.Actions>
        </Drawer.Header >
    )
}
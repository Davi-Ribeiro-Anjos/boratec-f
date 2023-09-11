import { Button, Drawer } from "rsuite"

interface DrawerHeaderViewProps {
    title: string;
    close: () => void;
}


export function DrawerHeaderView({ close, title }: DrawerHeaderViewProps) {
    return (
        <Drawer.Header>
            <Drawer.Title>{title}</Drawer.Title>
            <Drawer.Actions>
                <Button onClick={close}>Fechar</Button>
            </Drawer.Actions>
        </Drawer.Header >
    )
}
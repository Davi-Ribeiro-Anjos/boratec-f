import { useContext } from "react";
import { Button, Drawer } from "rsuite"
import { UserContext } from "../../providers/UserProviders";

interface DrawerHeaderProps {
    title: string;
    name: string;
    auth?: string;
    openModal: () => void;
    close: () => void;
}


export function DrawerHeader({ openModal, close, title, name, auth = "" }: DrawerHeaderProps) {

    const { verifyPermission }: any = useContext(UserContext)

    const has_permission = verifyPermission(auth)

    return (
        <Drawer.Header>
            <Drawer.Title>{title}</Drawer.Title>
            <Drawer.Actions>
                <Button onClick={close}>Fechar</Button>
                {(Boolean(auth) ? has_permission : true) && (
                    <Button onClick={openModal} appearance="primary">
                        {name}
                    </Button>
                )}
            </Drawer.Actions>
        </Drawer.Header >
    )
}
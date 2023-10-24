import { Whisper, IconButton, Tooltip, IconButtonProps } from "rsuite";
import { styles } from "../../../assets/styles";

interface ButtonHeaderInterface extends IconButtonProps {
    name: string;
    setOpen: any;
}


export default function MainButtonHeader({ name, setOpen, ...props }: ButtonHeaderInterface) {
    return (
        <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>{name}</Tooltip>}>
            <IconButton {...props} appearance="primary" style={styles.iconButton} onClick={() => setOpen(true)} />
        </Whisper>
    )
}
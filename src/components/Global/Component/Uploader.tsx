import { Col, Form, Uploader } from "rsuite";
import { styles } from "../../../assets/styles";
import { DefaultComponentFormInterface } from "../../../services/Interfaces";

interface UploaderInterface extends DefaultComponentFormInterface {
    multiple?: boolean;
}


export default function MainUploader({ multiple = false, helpText = "Obrigatório", showHelpText = true, tooltip = true, ...props }: UploaderInterface) {
    return (
        <Col xs={24} md={12}>
            <Form.Group>
                <Form.ControlLabel>{props.text}</Form.ControlLabel>
                <Form.Control style={styles.input} name={props.name} accepter={Uploader} multiple={multiple} action='' autoUpload={false} />
                {showHelpText &&
                    <Form.HelpText tooltip={tooltip}>{helpText}</Form.HelpText>
                }
            </Form.Group>
        </Col>
    )
}
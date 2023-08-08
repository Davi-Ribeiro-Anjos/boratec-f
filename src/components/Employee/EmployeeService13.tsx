import { Col, IconButton, Panel, Row, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import ListIcon from '@rsuite/icons/List';

import { styles } from "../../assets/styles";

interface EmployeeService13Props {

}


export function EmployeeService13({ }: EmployeeService13Props) {
    return (
        <Panel header="Décimo Terceiro" eventKey={2}>
            <Row style={styles.row}>
                <Col xs={20}>
                    <em>Criar 13º</em>
                </Col>
                <Col xs={4}>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Criar 13º</Tooltip>}>
                        <IconButton icon={<PlusIcon />} style={styles.iconBu} />
                    </Whisper>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col xs={20}>
                    <em>Listar 13ºs</em>
                </Col>
                <Col xs={4}>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Listar 13ºs</Tooltip>}>
                        <IconButton icon={<ListIcon />} style={styles.iconBu} />
                    </Whisper>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col xs={20}>
                    <em>Exportar 13ºs</em>
                </Col>
                <Col xs={4}>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Exportar 13ºs</Tooltip>}>
                        <IconButton icon={<FileDownloadIcon />} style={styles.iconBu} />
                    </Whisper>
                </Col>
            </Row>
        </Panel>
    )
}
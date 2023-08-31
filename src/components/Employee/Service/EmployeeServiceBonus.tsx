import { Col, IconButton, Panel, Row, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import ListIcon from '@rsuite/icons/List';

import { styles } from "../../../assets/styles";

interface EmployeeServiceBonusProps {

}


export function EmployeeServiceBonus({ }: EmployeeServiceBonusProps) {
    return (
        <Panel header="Bônus" eventKey={4}>
            <Row style={styles.row}>
                <Col xs={20}>
                    <em>Criar Bônus</em>
                </Col>
                <Col xs={4}>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Criar Bônus</Tooltip>}>
                        <IconButton icon={<PlusIcon />} style={styles.iconBu} />
                    </Whisper>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col xs={20}>
                    <em>Listar Bônus</em>
                </Col>
                <Col xs={4}>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Listar Bônus</Tooltip>}>
                        <IconButton icon={<ListIcon />} style={styles.iconBu} />
                    </Whisper>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col xs={20}>
                    <em>Exportar Bônus</em>
                </Col>
                <Col xs={4}>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Exportar Bônus</Tooltip>}>
                        <IconButton icon={<FileDownloadIcon />} style={styles.iconBu} />
                    </Whisper>
                </Col>
            </Row>
        </Panel>
    )
}
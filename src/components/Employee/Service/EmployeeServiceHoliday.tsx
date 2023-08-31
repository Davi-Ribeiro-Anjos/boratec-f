import { Col, IconButton, Panel, Row, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import ListIcon from '@rsuite/icons/List';

import { styles } from "../../../assets/styles";

interface EmployeeServiceHolidayProps {

}


export function EmployeeServiceHoliday({ }: EmployeeServiceHolidayProps) {
    return (
        <Panel header="Férias" eventKey={3}>
            <Row style={styles.row}>
                <Col xs={20}>
                    <em>Criar Férias</em>
                </Col>
                <Col xs={4}>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Criar Férias</Tooltip>}>
                        <IconButton icon={<PlusIcon />} style={styles.iconBu} />
                    </Whisper>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col xs={20}>
                    <em>Listar Férias</em>
                </Col>
                <Col xs={4}>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Listar Férias</Tooltip>}>
                        <IconButton icon={<ListIcon />} style={styles.iconBu} />
                    </Whisper>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col xs={20}>
                    <em>Exportar Férias</em>
                </Col>
                <Col xs={4}>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Exportar Férias</Tooltip>}>
                        <IconButton icon={<FileDownloadIcon />} style={styles.iconBu} />
                    </Whisper>
                </Col>
            </Row>
        </Panel>
    )
}
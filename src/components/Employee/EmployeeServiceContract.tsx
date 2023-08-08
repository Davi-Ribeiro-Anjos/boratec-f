import { Col, IconButton, Panel, Row, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import ListIcon from '@rsuite/icons/List';

import { styles } from "../../assets/styles";

interface EmployeeServiceContractProps { }


export function EmployeeServiceContract({ }: EmployeeServiceContractProps) {
    return (
        <Panel header="Contratos" eventKey={1}>
            <Row style={styles.row}>
                <Col xs={20}>
                    <em>Criar Contrato</em>
                </Col>
                <Col xs={4}>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Criar Contrato</Tooltip>}>
                        <IconButton icon={<PlusIcon />} style={styles.iconBu} onClick={() => { }} />
                    </Whisper>
                </Col>

            </Row>
            <Row style={styles.row}>
                <Col xs={20}>
                    <em>Listar Contratos</em>
                </Col>
                <Col xs={4}>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Listar Contratos</Tooltip>}>
                        <IconButton icon={<ListIcon />} style={styles.iconBu} />
                    </Whisper>
                </Col>
            </Row>
            <Row style={styles.row}>
                <Col xs={20}>
                    <em>Exportar Contratos</em>
                </Col>
                <Col xs={4}>
                    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Exportar Contratos</Tooltip>}>
                        <IconButton icon={<FileDownloadIcon />} style={styles.iconBu} />
                    </Whisper>
                </Col>
            </Row>
        </Panel>
    )
}
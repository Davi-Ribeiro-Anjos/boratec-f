import { IconButton, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
import FileDownloadIcon from '@rsuite/icons/FileDownload';
import { styles } from "../../assets/styles";

import { useState, memo } from "react";

// import { Xml } from ".";

interface XmlHeaderProps { }


export const XmlHeader = memo(function XmlHeader({ }: XmlHeaderProps) {

    const [openCreate, setOpenCreate] = useState(false)

    const [openDownload, setOpenDownload] = useState(false)

    openCreate
    openDownload

    return (
        <div>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Adicionar Xmls</Tooltip>}>
                <IconButton icon={<PlusIcon />} appearance="primary" color="green" style={styles.iconButton} onClick={() => setOpenCreate(true)} />
            </Whisper>
            <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Baixar Arquivos</Tooltip>}>
                <IconButton icon={<FileDownloadIcon />} appearance="primary" color="blue" style={styles.iconButton} onClick={() => setOpenDownload(true)} />
            </Whisper>
            {/* <Xml.Create open={openCreate} setOpen={setOpenCreate} /> */}
            {/* <Xml.DownLoad open={openDownLoad} setOpen={setOpenDownLoad} /> */}
        </div>
    )
})
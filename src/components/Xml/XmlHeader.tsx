import PlusIcon from '@rsuite/icons/Plus';
import FileDownloadIcon from '@rsuite/icons/FileDownload';

import { useState, memo } from "react";

import { Xml } from ".";
import { MainComponent } from "../Global/Component";

// import { Xml } from ".";

interface XmlHeaderProps {
    checkedKeys: number[];
}


export const XmlHeader = memo(function XmlHeader({ checkedKeys }: XmlHeaderProps) {

    const [openCreate, setOpenCreate] = useState(false)

    const [openDownload, setOpenDownload] = useState(false)

    return (
        <div>
            <MainComponent.ButtonHeader name="Adicionar Xmls" func={() => setOpenCreate(true)} icon={<PlusIcon />} color="green" />
            <MainComponent.ButtonHeader name="Baixar Arquivos" func={() => setOpenDownload(true)} icon={<FileDownloadIcon />} color="blue" />
            <Xml.Create open={openCreate} setOpen={setOpenCreate} />
            <Xml.Download open={openDownload} setOpen={setOpenDownload} checkedKeys={checkedKeys} />
        </div>
    )
})
import { Table, IconButton, SelectPicker, Uploader } from 'rsuite';
import { Icon } from '@rsuite/icons';
import DetailIcon from '@rsuite/icons/Detail';
import AttachmentIcon from '@rsuite/icons/Attachment';

import { useState } from 'react';

import { JustificationChoices } from '../../../services/Choices';
import { Justification } from '.';

interface JustificationTableProps {
    data: any;
    setData: any;
    isLoading: boolean;
}

const { Column, HeaderCell, Cell } = Table

const SelectCell = ({ rowData, dataKey, onChange, ...props }: any) => {
    return (
        <Cell {...props} style={{ padding: '4px 6px 6px 4px' }}>
            <SelectPicker style={{ width: 170 }} data={JustificationChoices} onChange={event => {
                onChange && onChange(rowData.id, dataKey, event)
            }} />
        </Cell>
    )
}

const FileCell = ({ rowData, dataKey, onChange, ...props }: any) => {
    return (
        <Cell {...props} style={{ padding: '4px 6px 6px 4px' }}>
            <Uploader multiple={false} action='' autoUpload={false}
                onChange={event => {
                    onChange && onChange(rowData.id, dataKey, event[0].blobFile)
                }}>
                <IconButton icon={<Icon as={AttachmentIcon} />} />
            </Uploader>
        </Cell >
    )
}


export function JustificationTable({ data, setData, isLoading }: JustificationTableProps) {

    const handleChange = (id: number, key: any, value: any) => {
        const nextData = Object.assign([], data)
        nextData.find((item: any) => item.id === id)[key] = value
        setData(nextData)
    }

    const [row, setRow] = useState([])
    const [open, setOpen] = useState(false)
    const click = (rowData: any) => {
        setRow(rowData.occurrences)
        setOpen(true)
    }

    return (
        <>
            <Table
                height={400}
                data={data}
                loading={isLoading}
                hover={false}
                wordWrap="break-word"
            >
                <Column width={180} align='center' fixed='left'>
                    <HeaderCell>Justificativa</HeaderCell>
                    <SelectCell dataKey="description_justification" onChange={handleChange} />
                </Column>

                <Column width={150} align='center' fixed='left'>
                    <HeaderCell>Anexo</HeaderCell>
                    <FileCell dataKey="file" onChange={handleChange} />
                </Column>
                <Column width={100} align='center'>
                    <HeaderCell>CTE</HeaderCell>
                    <Cell dataKey="cte" />
                </Column>

                <Column width={130} align='center'>
                    <HeaderCell>Remetente</HeaderCell>
                    <Cell dataKey="sender" />
                </Column>

                <Column width={150} align='center'>
                    <HeaderCell>Destinatário</HeaderCell>
                    <Cell dataKey="recipient" />
                </Column>

                <Column width={100} align='center'>
                    <HeaderCell>Emissão</HeaderCell>
                    <Cell dataKey="date_emission" />
                </Column>

                <Column width={100} align='center'>
                    <HeaderCell>Lead Time</HeaderCell>
                    <Cell dataKey="lead_time" />
                </Column>

                <Column width={100} align='center'>
                    <HeaderCell>Entrega</HeaderCell>
                    <Cell dataKey="date_delivery" />
                </Column>

                <Column width={80} align='center'>
                    <HeaderCell>Em Aberto</HeaderCell>
                    <Cell dataKey="opened" />
                </Column>

                <Column width={100} align='center'>
                    <HeaderCell>Nota Fiscal</HeaderCell>
                    <Cell dataKey="nf" />
                </Column>

                <Column width={100} align='center'>
                    <HeaderCell>Peso</HeaderCell>
                    <Cell dataKey="weight" />
                </Column>

                <Column width={100} align='center' fixed='right'>
                    <HeaderCell>Ocorrências</HeaderCell>
                    <Cell style={{ padding: '6px' }}>
                        {rowData => {
                            return <IconButton icon={<Icon as={DetailIcon} />} onClick={() => click(rowData)} />
                        }}
                    </Cell>
                </Column>

            </Table>
            <Justification.Occurrence row={row} open={open} setOpen={setOpen} />
        </>
    )
}
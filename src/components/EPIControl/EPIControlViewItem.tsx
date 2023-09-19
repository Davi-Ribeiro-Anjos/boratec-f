import { Table } from 'rsuite';

import { memo, useState } from 'react';


import { MainDrawer } from '../Global/Drawer';
import { EpiGroupInterface, EpiItemInterface } from '../../services/Interfaces';
import { EPIControl } from '.';

interface EpiControlViewItemProps {
    open: boolean;
    setOpen: any;
    row: EpiGroupInterface | undefined;
}

const { Column, HeaderCell, Cell } = Table;


export const EpiControlViewItem = memo(
    function EpiControlViewItem({ open, setOpen, row }: EpiControlViewItemProps) {
        const [size, setSize] = useState<EpiItemInterface>()
        const [modalSize, setModalSize] = useState(false)
        const openModalSize = (rowData: EpiItemInterface) => {
            setSize(rowData)
            setModalSize(true)
            close()
        }

        const [modalCrate, setModalCrate] = useState(false)
        const openCreateItem = () => {
            setModalCrate(true)
            close()
        }

        const close = () => {
            setOpen(false);
        }

        return (
            <>
                <MainDrawer.Root open={open} close={close} size='md'>
                    <MainDrawer.Header title="Itens Cadastrados" close={close} name='Cadastrar Item' openModal={openCreateItem} />
                    <MainDrawer.Body>
                        <Table
                            data={row ? row.epis_items : []}
                            bordered
                            cellBordered
                            autoHeight
                            onRowClick={(rowData: EpiItemInterface) => {
                                openModalSize(rowData)
                            }}
                        >
                            <Column align="center" flexGrow={1} fullText>
                                <HeaderCell>Descrição</HeaderCell>
                                <Cell dataKey="description" />
                            </Column>
                            <Column align="center" flexGrow={1}>
                                <HeaderCell>CA</HeaderCell>
                                <Cell dataKey="ca" />
                            </Column>
                            <Column align="center" flexGrow={1}>
                                <HeaderCell>Validade</HeaderCell>
                                <Cell dataKey="validity" />
                            </Column>
                            <Column align="center" flexGrow={1}>
                                <HeaderCell>Período de Troca</HeaderCell>
                                <Cell dataKey="time_for_use" />
                            </Column>
                        </Table>
                    </MainDrawer.Body>
                </MainDrawer.Root>
                <EPIControl.CreateItem open={modalCrate} setOpen={setModalCrate} idGroup={row?.id} modalView={setOpen} />
                <EPIControl.ViewSize open={modalSize} setOpen={setModalSize} row={size} modalItem={setOpen} />
            </>
        );
    });

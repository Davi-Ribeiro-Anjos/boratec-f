import { Table } from 'rsuite';

import { memo, useState } from 'react';

import { EpiItemInterface } from '../../services/Interfaces';

import { EPIControl } from '.';
import { MainDrawer } from '../Drawer';

interface EpiControlViewSizeProps {
    open: boolean;
    setOpen: any;
    modalItem: (value: boolean) => void;
    row: EpiItemInterface | undefined;
}

const { Column, HeaderCell, Cell } = Table;


export const EpiControlViewSize = memo(
    function EpiControlViewSize({ open, setOpen, modalItem, row }: EpiControlViewSizeProps) {
        console.log("view - size")

        const [modalCrate, setModalCrate] = useState(false)
        const openCreateSize = () => {
            setModalCrate(true)
            setOpen(false)
        }

        const close = () => {
            setOpen(false)
            modalItem(true)
        }

        return (
            <>
                <MainDrawer.Root open={open} close={close} size='sm'>
                    <MainDrawer.Header title="Tamanhos Cadastrados" name='Cadastrar Tamanho' close={close} openModal={openCreateSize} />
                    <MainDrawer.Body>
                        <Table
                            data={row ? row.epis_sizes : []}
                            bordered
                            cellBordered
                            autoHeight
                        >
                            <Column align="center" flexGrow={1}>
                                <HeaderCell>Tamanho</HeaderCell>
                                <Cell dataKey="size" />
                            </Column>
                            <Column align="center" flexGrow={1}>
                                <HeaderCell>Quantidade</HeaderCell>
                                <Cell dataKey="quantity" />
                            </Column>
                            <Column align="center" flexGrow={1}>
                                <HeaderCell>Quantidade Mínima</HeaderCell>
                                <Cell dataKey="quantity_minimum" />
                            </Column>
                        </Table>
                    </MainDrawer.Body>
                </MainDrawer.Root>
                <EPIControl.CreateSize open={modalCrate} setOpen={setModalCrate} idItem={row?.id} modalView={setOpen} />
            </>
        );
    });

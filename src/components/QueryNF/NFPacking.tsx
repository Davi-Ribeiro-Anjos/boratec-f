import { Table } from "rsuite";

import { memo } from "react";

import { PackingListInterface } from "../../services/Interfaces";

import { MainModal } from "../Modal";

interface NFPackingProps {
    row: PackingListInterface[];
    open: boolean;
    setOpen: (value: boolean) => void;
}

const { Column, HeaderCell, Cell } = Table;


export const NFPacking = memo(
    function NFPacking({ row, open, setOpen }: NFPackingProps) {
        const close = () => {
            setOpen(false);
        }

        return (
            <MainModal.Root open={open} close={close} size="lg" overflow={false}>
                <MainModal.Header title="Lista de Ocorrências" />
                <MainModal.Body>
                    <Table
                        data={row}
                        bordered
                        cellBordered
                        autoHeight
                    >
                        <Column width={100} align="center">
                            <HeaderCell>Romaneio</HeaderCell>
                            <Cell dataKey="packing_list" />
                        </Column>
                        <Column width={150} align="center">
                            <HeaderCell>Tipo de Entrega</HeaderCell>
                            <Cell dataKey="delivery_type" />
                        </Column>
                        <Column width={120} align="center">
                            <HeaderCell>Data Saída</HeaderCell>
                            <Cell dataKey="date_exit" />
                        </Column>
                        <Column width={120} align="center">
                            <HeaderCell>Placa Veículo</HeaderCell>
                            <Cell dataKey="plate" />
                        </Column>
                        <Column width={110} align="center">
                            <HeaderCell>Tipo Veículo</HeaderCell>
                            <Cell dataKey="type_vehicle" />
                        </Column>
                        <Column width={180} align="center" fullText>
                            <HeaderCell>Motorista</HeaderCell>
                            <Cell dataKey="driver" />
                        </Column>
                        <Column width={160} align="center">
                            <HeaderCell>Telefone do Motorista</HeaderCell>
                            <Cell dataKey="phone" />
                        </Column>
                    </Table>
                </MainModal.Body>
                <MainModal.FooterOne close={close} />
            </MainModal.Root>
        );
    });

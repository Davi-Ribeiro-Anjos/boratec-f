import { Table } from "rsuite";

import { memo } from "react";

import { MainModal } from "../Modal";
import { OccurrencesInterface } from "../../services/Interfaces";

interface NFOccurrenceProps {
    row: OccurrencesInterface[];
    open: boolean;
    setOpen: (value: boolean) => void;
}

const { Column, HeaderCell, Cell } = Table;


export const NFOccurrence = memo(
    function NFOccurrence({ row, open, setOpen }: NFOccurrenceProps) {
        console.log("criar solicitacao compra")

        console.log(row)

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
                        <Column flexGrow={2} align="center">
                            <HeaderCell>Descrição da Ocorrência</HeaderCell>
                            <Cell dataKey="description_occurrence" />
                        </Column>
                        <Column flexGrow={2} align="center">
                            <HeaderCell>Data da Ocorrência</HeaderCell>
                            <Cell dataKey="date_occurrence" />
                        </Column>
                    </Table>
                </MainModal.Body>
                <MainModal.FooterOne close={close} />
            </MainModal.Root>
        );
    });

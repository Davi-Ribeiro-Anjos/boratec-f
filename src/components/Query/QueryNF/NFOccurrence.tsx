import { memo } from "react";

import { ColumnsInterface, OccurrencesInterface } from "../../../services/Interfaces";

import { MainModal } from "../../Global/Modal";
import { MainTable } from "../../Global/Table";

interface NFOccurrenceProps {
    row: OccurrencesInterface[];
    open: boolean;
    setOpen: (value: boolean) => void;
}



export const NFOccurrence = memo(
    function NFOccurrence({ row, open, setOpen }: NFOccurrenceProps) {
        const close = () => {
            setOpen(false);
        }

        const columns: ColumnsInterface = {
            "Descrição da Ocorrência": { dataKey: "description_occurrence", propsColumn: { flexGrow: 1 } },
            "Data da Ocorrência": { dataKey: "date_occurrence", propsColumn: { flexGrow: 1 } },
        }

        return (
            <MainModal.Root open={open} close={close} size="sm" overflow={false}>
                <MainModal.Header title="Lista de Ocorrências" />
                <MainModal.Body>
                    <MainTable.Root data={row} columns={columns} isLoading={false} pagination={false}
                        bordered cellBordered autoHeight />
                </MainModal.Body>
                <MainModal.FooterOne close={close} />
            </MainModal.Root>
        );
    });

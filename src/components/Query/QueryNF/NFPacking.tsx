import { memo } from "react";

import { ColumnsInterface, PackingListInterface } from "../../../services/Interfaces";

import { MainModal } from "../../Global/Modal";
import { MainTable } from "../../Global/Table";

interface NFPackingProps {
    row: PackingListInterface[];
    open: boolean;
    setOpen: (value: boolean) => void;
}


export const NFPacking = memo(
    function NFPacking({ row, open, setOpen }: NFPackingProps) {
        const close = () => {
            setOpen(false);
        }

        const columns: ColumnsInterface = {
            "Romaneio": { dataKey: "packing_list", propsColumn: { flexGrow: 2 } },
            "Tipo de Entrega": { dataKey: "delivery_type", propsColumn: { flexGrow: 2, fullText: true } },
            "Data Saída": { dataKey: "date_exit", propsColumn: { flexGrow: 2 } },
            "Placa Veículo": { dataKey: "plate", propsColumn: { flexGrow: 2 } },
            "Tipo Veículo": { dataKey: "type_vehicle", propsColumn: { flexGrow: 3 } },
            "Motorista": { dataKey: "driver", propsColumn: { flexGrow: 3, fullText: true } },
            "Telefone do Motorista": { dataKey: "phone", propsColumn: { flexGrow: 3 } },
        }

        return (
            <MainModal.Root open={open} close={close} size="lg" overflow={false}>
                <MainModal.Header title="Lista de Ocorrências" />
                <MainModal.Body>
                    <MainTable.Root columns={columns} data={row} isLoading={false}
                        height={250} pagination={false}
                        bordered cellBordered autoHeight />
                </MainModal.Body>
                <MainModal.FooterOne close={close} />
            </MainModal.Root>
        );
    });

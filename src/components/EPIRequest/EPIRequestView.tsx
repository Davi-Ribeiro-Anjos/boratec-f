import { memo } from "react"

import { ColumnsInterface, EpiRequestInterface } from "../../services/Interfaces";

import { MainModal } from "../Global/Modal";
import { MainTable } from "../Global/Table";

interface EPIRequestViewProps {
    open: boolean;
    setOpen: (value: any) => void;
    row: EpiRequestInterface | undefined;
}

export const EPIRequestView = memo(
    function EPIRequestView({ open, setOpen, row }: EPIRequestViewProps) {
        const close = () => {
            setOpen(false)
        }

        const columns: ColumnsInterface = {
            "Item": { dataKey: "size.item.description", propsColumn: { flexGrow: 1 } },
            "CA": { dataKey: "size.item.ca", propsColumn: { flexGrow: 1 } },
            "Tamanho": { dataKey: "size.size", propsColumn: { flexGrow: 1 } },
            "Quantidade": { dataKey: "quantity", propsColumn: { flexGrow: 1 } },
        }

        return (
            <MainModal.Root open={open} close={close} size="md">
                <MainModal.Header title="Visualizar Solicitação" />
                <MainModal.Body>
                    <MainTable.Root data={row ? row.epis_carts : []} columns={columns} isLoading={false} pagination={false}
                        cellBordered bordered autoHeight />
                </MainModal.Body>
                <MainModal.FooterOne close={close} />
            </MainModal.Root>
        )
    }
)
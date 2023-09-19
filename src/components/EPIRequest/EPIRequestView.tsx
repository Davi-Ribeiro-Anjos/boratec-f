import { Table } from "rsuite";

import { memo } from "react"

import { EpiRequestInterface } from "../../services/Interfaces";

import { MainModal } from "../Global/Modal";

interface EPIRequestViewProps {
    open: boolean;
    setOpen: (value: any) => void;
    row: EpiRequestInterface | undefined;
}

const { Column, HeaderCell, Cell } = Table


export const EPIRequestView = memo(
    function EPIRequestView({ open, setOpen, row }: EPIRequestViewProps) {
        const close = () => {
            setOpen(false)
        }

        return (
            <MainModal.Root open={open} close={close} size="md">
                <MainModal.Header title="Visualizar Solicitação" />
                <MainModal.Body>
                    <Table
                        data={row ? row.epis_carts : []}
                        bordered
                        cellBordered
                        autoHeight
                        hover={false}
                    >
                        <Column align="center" flexGrow={1} >
                            <HeaderCell>Item</HeaderCell>
                            <Cell dataKey="size.item.description" />
                        </Column>
                        <Column align="center" flexGrow={1} >
                            <HeaderCell>CA</HeaderCell>
                            <Cell dataKey="size.item.ca" />
                        </Column>
                        <Column align="center" flexGrow={1} >
                            <HeaderCell>Tamanho</HeaderCell>
                            <Cell dataKey="size.size" />
                        </Column>
                        <Column align="center" flexGrow={1} >
                            <HeaderCell>Quantidade</HeaderCell>
                            <Cell dataKey="quantity" />
                        </Column>
                    </Table>
                </MainModal.Body>
                <MainModal.FooterOne close={close} />
            </MainModal.Root>
        )
    }
)
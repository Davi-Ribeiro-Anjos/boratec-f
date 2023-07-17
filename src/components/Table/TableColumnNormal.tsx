import { ColumnProps, Table } from "rsuite"

const { Column, HeaderCell, Cell } = Table;

interface TableColumnNormalProps extends ColumnProps {
    header: string;
    dataKey: string;
    index?: number;
}


export function TableColumnNormal({ header, dataKey, index, width = 150, align = "center", fixed = false }: TableColumnNormalProps) {
    return (
        <Column width={width} align={align} fixed={fixed} key={index}>
            <HeaderCell>{header}</HeaderCell>
            <Cell dataKey={dataKey} />
        </Column>
    )
}
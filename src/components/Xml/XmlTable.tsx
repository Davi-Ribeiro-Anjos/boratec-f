import { useState } from "react";
import { Table, Checkbox, Pagination } from "rsuite";

interface XmlTableProps {
    data: any[],
    isLoading: boolean;
    checkedKeys: number[];
    setCheckedKeys: any;
}

interface CheckCellProps {
    rowData?: any
    onChange: any
    checkedKeys: any
    dataKey: any
}

const { Column, HeaderCell, Cell } = Table;

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }: CheckCellProps) => (
    <Cell {...props} style={{ padding: 0 }}>
        <div style={{ lineHeight: '46px' }}>
            <Checkbox
                value={rowData[dataKey]}
                inline
                onChange={onChange}
                checked={checkedKeys.some((item: any) => item === rowData[dataKey])}
            />
        </div>
    </Cell>
);


export function XmlTable({ data, isLoading, checkedKeys, setCheckedKeys }: XmlTableProps) {
    let checked = false
    let indeterminate = false

    const [page, setPage] = useState<number>(1)

    if (data && data.length > 0) {
        if (checkedKeys.length === data.length) {
            checked = true
        } else if (checkedKeys.length === 0) {
            checked = false
        } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
            indeterminate = true
        }
    }

    const handleCheckAll = (value: any, checked: boolean) => {
        value
        const keys = checked ? data.map(item => item.id) : []
        setCheckedKeys(keys)
    }
    const handleCheck = (value: any, checked: boolean) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value)
        setCheckedKeys(keys)
    }

    return (
        <>
            <Table
                height={400}
                data={data}
                loading={isLoading}
                hover={false}
                cellBordered
                wordWrap="break-word"
            >
                <Column align="center" width={50} fixed="left" >
                    <HeaderCell style={{ padding: 0 }}>
                        <div style={{ lineHeight: '40px' }}>
                            <Checkbox
                                inline
                                checked={checked}
                                indeterminate={indeterminate}
                                onChange={handleCheckAll}
                            />
                        </div>
                    </HeaderCell>
                    <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
                </Column>
                <Column align="center" flexGrow={1} >
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column align="center" flexGrow={1} >
                    <HeaderCell>Data Emissão</HeaderCell>
                    <Cell dataKey="pj_complements.salary" />
                </Column>
                <Column align="center" flexGrow={1} >
                    <HeaderCell>NF</HeaderCell>
                    <Cell dataKey="pj_complements.college" />
                </Column>
                <Column align="center" flexGrow={1} >
                    <HeaderCell>Valor NF</HeaderCell>
                    <Cell dataKey="pj_complements.allowance" />
                </Column>
                <Column align="center" flexGrow={2} fullText={true}  >
                    <HeaderCell>Remetente</HeaderCell>
                    <Cell dataKey="pj_complements.housing_allowance" />
                </Column>
                <Column align="center" flexGrow={2} fullText={true} >
                    <HeaderCell>Destinatário</HeaderCell>
                    <Cell dataKey="pj_complements.covenant_credit" />
                </Column>
                <Column align="center" flexGrow={1} >
                    <HeaderCell>Peso</HeaderCell>
                    <Cell dataKey="pj_complements.others_credits" />
                </Column>
                <Column align="center" flexGrow={1} >
                    <HeaderCell>Volume</HeaderCell>
                    <Cell dataKey="pj_complements.advance_money" />
                </Column>
                <Column align="center" flexGrow={1} >
                    <HeaderCell>Autor</HeaderCell>
                    <Cell dataKey="pj_complements.covenant_discount" />
                </Column>
                <Column align="center" flexGrow={1} >
                    <HeaderCell>Data Importado</HeaderCell>
                    <Cell dataKey="pj_complements.others_discounts" />
                </Column>
            </Table>
            <div style={{ padding: 20 }}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size="md"
                    layout={['total', '-', 'pager', '-', 'skip']}
                    limitOptions={[10, 30, 50]}
                    total={data ? data.length : 0}
                    activePage={page}
                    onChangePage={setPage}
                />
            </div >
        </>
    );
}

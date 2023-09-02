import { Table, Checkbox } from "rsuite";

interface PaymentTableProps {
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


export function PaymentTable({ data, isLoading, checkedKeys, setCheckedKeys }: PaymentTableProps) {
    console.log("table - payment")

    let checked = false
    let indeterminate = false

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
        <Table
            height={400}
            data={data}
            loading={isLoading}
            hover={false}
            cellBordered
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
            <Column align="center" flexGrow={2} fullText={true} >
                <HeaderCell>Nome</HeaderCell>
                <Cell dataKey="name" />
            </Column>
            <Column align="center" flexGrow={1} >
                <HeaderCell>Salário</HeaderCell>
                <Cell dataKey="pj_complements.salary" />
            </Column>
            <Column align="center" flexGrow={1} >
                <HeaderCell>Faculdade</HeaderCell>
                <Cell dataKey="pj_complements.college" />
            </Column>
            <Column align="center" flexGrow={1} >
                <HeaderCell>Ajuda Custo</HeaderCell>
                <Cell dataKey="pj_complements.allowance" />
            </Column>
            <Column align="center" flexGrow={1} >
                <HeaderCell>Aux. Moradia</HeaderCell>
                <Cell dataKey="pj_complements.housing_allowance" />
            </Column>
            <Column align="center" flexGrow={1} >
                <HeaderCell>Cred. Convênvio</HeaderCell>
                <Cell dataKey="pj_complements.covenant_credit" />
            </Column>
            <Column align="center" flexGrow={1} >
                <HeaderCell>Outros Cred.</HeaderCell>
                <Cell dataKey="pj_complements.others_credits" />
            </Column>
            <Column align="center" flexGrow={1} >
                <HeaderCell>Adiantamento</HeaderCell>
                <Cell dataKey="pj_complements.advance_money" />
            </Column>
            <Column align="center" flexGrow={1} >
                <HeaderCell>Desc. Convênio</HeaderCell>
                <Cell dataKey="pj_complements.covenant_discount" />
            </Column>
            <Column align="center" flexGrow={1} >
                <HeaderCell>Outros Desc.</HeaderCell>
                <Cell dataKey="pj_complements.others_discounts" />
            </Column>
            <Column align="center" flexGrow={1} fixed="right" >
                <HeaderCell>Total a Pagar</HeaderCell>
                <Cell dataKey="pj_complements.total" />
            </Column>
        </Table>
    );
}

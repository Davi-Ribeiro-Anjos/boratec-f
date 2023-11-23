import { Table, Checkbox, useToaster } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";

import { useState, useMemo, useEffect } from "react";
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../../hooks/Api";
import { ColumnsInterface } from "../../../services/Interfaces";
import { StringToDate } from "../../../services/Date";

import { MainPanel } from "../../../components/Global/Panel";
import { MainMessage } from "../../../components/Global/Message";
import { Thirteenth } from "../../../components/EmployeeService/Thirteenth";
import { MainTable } from "../../../components/Global/Table";

interface EmployeesThirteenthsProps { }

interface Filter {
    employee__name__contains: string;
    send: boolean;
}

interface CheckCellProps {
    rowData?: any
    onChange: any
    checkedKeys: any
    dataKey: any
}

const { Column, HeaderCell, Cell } = Table

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


export default function EmployeesThirteenths({ }: EmployeesThirteenthsProps) {
    const api = useApi()
    const toaster = useToaster()

    // FILTER
    const initialFilter = {
        employee__name__contains: "",
        send: false
    }
    const [filter, setFilter] = useState<Filter>(initialFilter)


    // DATA
    const searchData = async () => {
        const response = await api.get("pj/thirteenths/", { params: { ...filter } })

        return response.data
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["pj-thirteenth"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error400(toaster, error, {})
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
    })


    // TABLE
    const [showColumn, setShowColumn] = useState<any>({})
    const [row, setRow] = useState()
    const [openEdit, setOpenEdit] = useState(false)
    const modalEdit = (rowData: any) => {
        let row_ = { ...rowData }

        row_.date_payment = StringToDate(row_.date_payment, true)

        setRow(row_)
        setOpenEdit(true)
    }

    let checked = false
    let indeterminate = false
    const [checkedKeys, setCheckedKeys] = useState<any>([])

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
        const keys = checked ? data.map((item: any) => item.id) : []
        setCheckedKeys(keys)
    }

    const handleCheck = (value: any, checked: boolean) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter((item: any) => item !== value)
        setCheckedKeys(keys)
    }

    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Funcionário": { dataKey: "employee.name", propsColumn: { width: 250, fullText: true } },
            "Tipo": { dataKey: "type_payment", propsColumn: { width: 150 } },
            "Valor": { dataKey: "value", propsColumn: { width: 150 } },
            "Meses": { dataKey: "months", propsColumn: { width: 130 } },
            "Data Pagamento": { dataKey: "date_payment", propsColumn: { width: 150 } },
        }
    }, [])
    const toSend = useMemo<ColumnsInterface>(() => {
        return {
            "Editar": { dataKey: "button", propsColumn: { width: 100 }, click: modalEdit, icon: EditIcon, auth: "employee_admin" },
        }
    }, [])

    const clear = () => {
        setFilter(initialFilter)
    }

    useEffect(() => {
        setShowColumn(() => {
            return data && data.length > 0 &&
                !filter.send && { ...columns, ...toSend } ||
                { ...columns }
        })
    }, [data])

    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="13º Salários">
                <Thirteenth.Header checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                <Thirteenth.Filter filter={filter} setFilter={setFilter} />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={showColumn} isLoading={isLoading} >
                    {showColumn["Editar"] && (
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
                    )}
                </MainTable.Root>
            </MainPanel.Body>

            <Thirteenth.Edit open={openEdit} setOpen={setOpenEdit} row={row} setRow={setRow} />

        </MainPanel.Root>
    )
}

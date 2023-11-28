import { Checkbox, Table, useToaster } from "rsuite";

import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { ColumnsInterface, XmlInterface } from "../../services/Interfaces";

import { Xml } from "../../components/Tool/Xml";
import { MainPanel } from "../../components/Global/Panel";
import { MainMessage } from "../../components/Global/Message";
import { MainTable } from "../../components/Global/Table";
import { DateToString } from "../../services/Date";

interface ResponseInterface {
    senders: string[];
    data: XmlInterface[];
}

interface CheckCellProps {
    rowData?: any
    onChange: any
    checkedKeys: any
    dataKey: any
}

interface Filter {
    date_published: any;
    date_emission: any;
    date_published__gte: any;
    date_published__lte: any;
    date_emission__gte: any;
    date_emission__lte: any;
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


export default function Xmls() {
    const api = useApi()
    const toaster = useToaster()

    // FILTER
    const initialFilter = {
        date_published: null,
        date_emission: null,
        date_published__gte: null,
        date_published__lte: null,
        date_emission__gte: null,
        date_emission__lte: null,
    }
    const [filter, setFilter] = useState<Filter>(initialFilter)
    const [senders, setSenders] = useState<any>([])


    // DATA
    const searchData = async () => {
        const filter_ = { ...filter }

        if (filter_.date_emission) {
            filter_.date_emission__gte = DateToString(filter_.date_emission[0])
            filter_.date_emission__lte = DateToString(filter_.date_emission[1])

            delete filter_.date_emission
        }
        if (filter_.date_published) {
            filter_.date_published__gte = DateToString(filter_.date_published[0])
            filter_.date_published__lte = DateToString(filter_.date_published[1])

            delete filter_.date_published
        }

        const response = await api.get<ResponseInterface>("xmls/", { params: { ...filter_ } })

        setSenders(response.data.senders)

        const dataRes = response.data.data

        dataRes.map((data: XmlInterface) => {
            if (data.author) data.author.username = data.author?.username.toUpperCase()
        })

        return dataRes
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["xmls"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
        enabled: true
    })


    // TABLE
    const [checkedKeys, setCheckedKeys] = useState([])

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
        if (data) {
            value
            const keys: any = checked ? data.map((item: any) => item.id) : []
            setCheckedKeys(keys)
        }
    }
    const handleCheck = (value: any, checked: boolean) => {
        const keys: any = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value)
        setCheckedKeys(keys)
    }
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Id": { dataKey: "id", propsColumn: { flexGrow: 80 } },
            "Data Emissão": { dataKey: "date_emission", propsColumn: { flexGrow: 130 } },
            "NF": { dataKey: "nf", propsColumn: { flexGrow: 100 } },
            "Valor NF": { dataKey: "value_nf", propsColumn: { flexGrow: 120 } },
            "Remetente": { dataKey: "sender", propsColumn: { flexGrow: 130 } },
            "Destinatário": { dataKey: "recipient", propsColumn: { flexGrow: 170 } },
            "UF": { dataKey: "uf", propsColumn: { flexGrow: 80 } },
            "Peso": { dataKey: "weight", propsColumn: { flexGrow: 120 } },
            "Volume": { dataKey: "volume", propsColumn: { flexGrow: 100 } },
            "Autor": { dataKey: "author.username", propsColumn: { flexGrow: 170 } },
            "Data Importado": { dataKey: "date_published", propsColumn: { flexGrow: 130 } },
        }
    }, [])

    const clear = () => {
        setFilter(initialFilter)
    }

    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="XML's">
                <Xml.Header checkedKeys={checkedKeys} />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} defaultExpanded={false} >
                <Xml.Filter senders={senders} />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} cellBordered wordWrap="break-word" limit={50}>
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
                </MainTable.Root>
            </MainPanel.Body>

        </MainPanel.Root >
    )
}
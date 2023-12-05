import { Checkbox, Message, Table, useToaster } from "rsuite";
import FileDownloadIcon from '@rsuite/icons/FileDownload';

import { useContext, useState, useMemo } from "react";
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi, useApiDownload } from "../../../hooks/Api";
import { UserContext } from "../../../providers/UserProviders";
import { ColumnsInterface, DeliveryHistoryInterface } from "../../../services/Interfaces";

import { MainPanel } from "../../../components/Global/Panel";
import { MainMessage } from "../../../components/Global/Message";
import { JustificationConfirm } from "../../../components/Commercial/JustificationConfirm";
import { MainTable } from "../../../components/Global/Table";

import FileDownload from 'js-file-download';

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


export default function JustificationsConfirmed() {
    const { }: any = useContext(UserContext)
    const apiDownload = useApiDownload()
    const api = useApi()
    const toaster = useToaster()


    // DATA
    const searchData = async () => {
        const response = await api.get<DeliveryHistoryInterface[]>("/deliveries-histories/confirm/")

        let dataRes = response.data

        for (const res in dataRes) {
            if (Object.prototype.hasOwnProperty.call(dataRes, res)) {
                const line = dataRes[res];

                if (line.date_delivery === "01/01/0001" || line.date_delivery === "01/01/1") line.date_delivery = null
                if (line.lead_time === "01/01/0001" || line.lead_time === "01/01/1") line.lead_time = null

            }
        }
        return response.data
    }
    const { data, isLoading } = useQuery({
        queryKey: ["justification-confirm"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error400(toaster, error, {})
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
        enabled: true
    })


    // DOWNLOAD
    const download = async (rowData: any) => {
        await apiDownload.post(rowData.file + "/").then((response: any) => {
            let file = rowData.file.split("/")[6]

            FileDownload(response.data, file)
        }).catch(() => {
            let message = (
                <Message showIcon type="error" closable >
                    Ocorreu um erro ao buscar o arquivo.
                </ Message>
            )
            throw toaster.push(message, { placement: "topEnd", duration: 4000 })
        })

    }


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
            "CTE": { dataKey: "cte", propsColumn: { flexGrow: 1 } },
            "NF": { dataKey: "nf", propsColumn: { flexGrow: 1 } },
            "Justificativa": { dataKey: "description_justification", propsColumn: { flexGrow: 2 } },
            "Data Emissão": { dataKey: "date_emission", propsColumn: { flexGrow: 1 } },
            "Lead Time": { dataKey: "lead_time", propsColumn: { flexGrow: 1 } },
            "Data Entrega": { dataKey: "date_delivery", propsColumn: { flexGrow: 1 } },
            "Anexo": { dataKey: "button", propsColumn: { flexGrow: 1 }, click: download, icon: FileDownloadIcon },
        }
    }, [])



    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="Confirmar Justificativa">
                <JustificationConfirm.Header checkedKeys={checkedKeys} />
            </MainPanel.Header>

            <br />
            <br />

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} >
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

        </MainPanel.Root>
    )
}
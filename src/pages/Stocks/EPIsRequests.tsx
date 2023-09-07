import { useToaster } from "rsuite";
import DocPassIcon from '@rsuite/icons/DocPass';
import DetailIcon from '@rsuite/icons/Detail';
import CheckIcon from '@rsuite/icons/Check';

import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { ColumnsInterface, EpiRequestInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Panel";
import { MainTable } from "../../components/Table";
import { EPIRequest } from "../../components/EPIRequest";
import { MainMessage } from "../../components/Message";

interface Filter {
    status: "PROVISORIO" | "ABERTO" | "ANDAMENTO" | "CONCLUIDO" | "CANCELADO";
}


export default function EPIsRequests() {
    const api = useApi()
    const toaster = useToaster()


    // FILTER
    const initialFilter: Filter = {
        status: "ABERTO",
    }
    const [filter, setFilter] = useState(initialFilter)
    const clear = () => {
        setFilter(initialFilter)
    }


    // DATA
    const searchData = async () => {
        const response = await api.get("epis/requests/", { params: { ...filter } })

        return response.data
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["epis-requests"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error)
        },
        enabled: false
    })


    // TABLE
    const [row, setRow] = useState<EpiRequestInterface>()
    const [openView, setOpenView] = useState(false)
    const modalView = (rowData: any) => {
        setRow(rowData)
        setOpenView(true)
    }
    const [openSend, setOpenSend] = useState(false)
    const modalSend = (rowData: any) => {
        setRow(rowData)
        setOpenSend(true)
    }
    const [openConfirm, setOpenConfirm] = useState(false)
    const modalConfirm = (rowData: any) => {
        setRow(rowData)
        setOpenConfirm(true)
    }
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Id": { dataKey: "id", propsColumn: { width: 120 } },
            "Funcionário": { dataKey: "employee.name", propsColumn: { width: 200, fullText: true } },
            "Filial": { dataKey: "branch.abbreviation", propsColumn: { width: 150 } },
            "Data Solicitação": { dataKey: "date_requested", propsColumn: { width: 130 } },
            "Solicitante": { dataKey: "author_create.name", propsColumn: { width: 200, fullText: true } },
        }
    }, [])
    const send = useMemo<ColumnsInterface>(() => {
        return {
            "Vizualizar": { dataKey: "button", propsColumn: { width: 130 }, click: modalView, icon: DetailIcon },
            "Enviar": { dataKey: "button", propsColumn: { width: 130 }, click: modalSend, icon: DocPassIcon }
        }
    }, [])
    const confirm = useMemo<ColumnsInterface>(() => {
        return {
            "Confirmar": { dataKey: "button", propsColumn: { width: 130 }, click: modalConfirm, icon: CheckIcon }
        }
    }, [])
    const view = useMemo<ColumnsInterface>(() => {
        return {
            "Vizualizar": { dataKey: "button", propsColumn: { width: 130 }, click: modalView, icon: DetailIcon },
        }
    }, [])


    return (
        <MainPanel.Root>

            <MainPanel.Header title="Solicitações EPI's">
                <EPIRequest.Header />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                <EPIRequest.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} isLoading={isLoading}
                    columns={
                        data && data.length > 0 ?
                            data[0].status == "PROVISORIO" && { ...columns, ...send } ||
                            data[0].status == "ABERTO" && { ...columns, ...send } ||
                            data[0].status == "ANDAMENTO" && { ...columns, ...confirm } ||
                            data[0].status == "CONCLUIDO" && { ...columns, ...view } ||
                            data[0].status == "CANCELADO" && { ...columns, ...view } ||
                            { ...columns, ...send }
                            :
                            columns
                    } />
                <EPIRequest.View open={openView} setOpen={setOpenView} row={row} />
                <EPIRequest.Send open={openSend} setOpen={setOpenSend} row={row} />
                <EPIRequest.Confirm open={openConfirm} setOpen={setOpenConfirm} row={row} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
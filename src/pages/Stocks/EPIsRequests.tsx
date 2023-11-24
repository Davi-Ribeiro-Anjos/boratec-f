import { useToaster } from "rsuite";
import DocPassIcon from '@rsuite/icons/DocPass';
import DetailIcon from '@rsuite/icons/Detail';
import CheckIcon from '@rsuite/icons/Check';

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { ColumnsInterface, EpiRequestInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Global/Panel";
import { MainTable } from "../../components/Global/Table";
import { EPIRequest } from "../../components/EPIRequest";
import { MainMessage } from "../../components/Global/Message";
import { DateToString } from "../../services/Date";

interface Filter {
    status: "PROVISORIO" | "ABERTO" | "ANDAMENTO" | "CONCLUIDO" | "CANCELADO" | null;
    author_create: number | null;
    branch: number | null;
    date_requested: any;
    employee: any;
}


export default function EPIsRequests() {
    const api = useApi()
    const toaster = useToaster()


    // FILTER
    const initialFilter: Filter = {
        employee: "",
        status: null,
        author_create: null,
        branch: null,
        date_requested: null,
    }
    const [filter, setFilter] = useState(initialFilter)
    const clear = () => {
        setFilter(initialFilter)
    }


    // DATA
    const searchData = async () => {
        let filter_ = { ...filter }

        if (filter_.employee) filter_.employee = filter_.employee.toUpperCase()
        else delete filter_.employee

        filter_.date_requested = DateToString(filter_.date_requested)

        const response = await api.get("epis/requests/", { params: { ...filter_ } })

        for (let index = 0; index < response.data.length; index++) {
            const element = response.data[index];

            element["employee_name"] = element.employee?.name || element.employee_provisory
        }

        return response.data
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["epis-requests"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error400(toaster, error, {})
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error)
        },
        enabled: false
    })


    // TABLE
    const [showColumn, setShowColumn] = useState<any>({})
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
            "Id": { dataKey: "id", propsColumn: { width: 100 } },
            "Funcionário": { dataKey: "employee_name", propsColumn: { width: 200, fullText: true } },
            "Filial": { dataKey: "branch.abbreviation", propsColumn: { width: 100 } },
            "Data Solicitação": { dataKey: "date_requested", propsColumn: { width: 130 } },
            "Solicitante": { dataKey: "author_create.name", propsColumn: { width: 200, fullText: true } },
            "Status": { dataKey: "status", propsColumn: { width: 150 } },
        }
    }, [])
    const send = useMemo<ColumnsInterface>(() => {
        return {
            "Vizualizar": { dataKey: "button", propsColumn: { width: 115 }, click: modalView, icon: DetailIcon },
            "Enviar": { dataKey: "button", propsColumn: { width: 115 }, click: modalSend, icon: DocPassIcon }
        }
    }, [])
    const confirm = useMemo<ColumnsInterface>(() => {
        return {
            "Confirmar": { dataKey: "button", propsColumn: { width: 115 }, click: modalConfirm, icon: CheckIcon }
        }
    }, [])
    const view = useMemo<ColumnsInterface>(() => {
        return {
            "Vizualizar": { dataKey: "button", propsColumn: { width: 115 }, click: modalView, icon: DetailIcon },
        }
    }, [])


    useEffect(() => {
        setShowColumn(() => {
            return data && data.length > 0 &&
                filter.status == "PROVISORIO" && { ...columns, ...send } ||
                filter.status == "ABERTO" && { ...columns, ...send } ||
                filter.status == "ANDAMENTO" && { ...columns, ...confirm } ||
                filter.status == "CONCLUIDO" && { ...columns, ...view } ||
                filter.status == "CANCELADO" && { ...columns, ...view } ||
                { ...columns, ...view }
        })
    }, [data])

    return (
        <MainPanel.Root>

            <MainPanel.Header title="Solicitações de EPI's">
                <EPIRequest.Header />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                <EPIRequest.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} isLoading={isLoading} columns={showColumn} />
                <EPIRequest.View open={openView} setOpen={setOpenView} row={row} />
                <EPIRequest.Send open={openSend} setOpen={setOpenSend} row={row} />
                <EPIRequest.Confirm open={openConfirm} setOpen={setOpenConfirm} row={row} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
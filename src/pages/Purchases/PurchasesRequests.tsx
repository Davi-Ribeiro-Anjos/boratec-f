import { useToaster } from "rsuite";
import ListIcon from "@rsuite/icons/List";
import EditIcon from "@rsuite/icons/Edit";

import { useCallback, useState, useMemo, useContext } from "react";
import { useQuery } from "react-query";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { ColumnsInterface, PurchaseRequestInterface } from "../../services/Interfaces";
import { DateToString, StringToDate } from "../../services/Date";

import { MainTable } from "../../components/Global/Table"
import { MainPanel } from "../../components/Global/Panel"
import { Annotation } from "../../components/PurchaseRequest/Annotation";
import { PurchaseRequest } from "../../components/PurchaseRequest";
import { MainMessage } from "../../components/Global/Message";

interface Filter {
    number_request: string | number | null,
    date_request: any,
    date_request__gte: any,
    date_request__lte: any,
    status: string | null,
    branch: number | null,
    requester: number | null,
}

const initialFilter = {
    number_request: null,
    date_request: null,
    date_request__gte: null,
    date_request__lte: null,
    status: null,
    branch: null,
    requester: null,
}


export default function PurchasesRequests() {
    console.log("solicitacao compra")

    const { me }: any = useContext(UserContext)
    const api = useApi()
    const toaster = useToaster()

    // FILTER
    const [filter, setFilter] = useState<Filter>({ ...initialFilter, branch: me.branch.id })
    const clear = () => {
        setFilter(initialFilter)
    }

    // DATA
    const searchData = async () => {
        let filter_ = { ...filter }

        if (filter_.number_request === "") {
            filter_.number_request = null
        }

        if (filter_.date_request) {
            filter_.date_request__gte = DateToString(filter_.date_request[0])
            filter_.date_request__lte = DateToString(filter_.date_request[1])

            delete filter_.date_request
        }

        return await api.get("purchases-requests/", { params: { ...filter_ } })
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["purchases-requests"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error)
        },
        enabled: false
    })

    // EDIT
    const [row, setRow] = useState<any>({})
    const [openEdit, setOpenEdit] = useState(false)
    const editData = useCallback((rowData: PurchaseRequestInterface) => {
        let row_: any = { ...rowData }

        if (rowData.branch) row_.branch = rowData.branch.id
        if (!rowData.observation) row_.observation = ""
        if (rowData.responsible) row_.responsible = rowData.responsible.id
        if (rowData.date_request) row_.date_request = StringToDate(rowData.date_request, true)
        if (rowData.date_expiration) row_.date_expiration = StringToDate(rowData.date_expiration, true)


        setRow(row_)

        setOpenEdit(true)

        if (row_.date_expiration && row_.paid === false) {
            const today = new Date()
            const timeDifference = row_.date_expiration.getTime() - today.getTime()
            const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

            if (dayDifference > 1) {
                MainMessage.Info(toaster, `O boleto vence em ${dayDifference - 1} dias.`)
            } else if (dayDifference < 1) {
                MainMessage.Info(toaster, `O boleto venceu faz ${(dayDifference - 1) * -1} dias.`)
            } else {
                MainMessage.Info(toaster, "O boleto vence hoje!")
            }
        }
    }, [row])

    // ANNOTATION
    const [openAnnotation, setOpenAnnotation] = useState(false)
    const [annotations, setAnnotations] = useState()
    const annotationsData = async (rowData: PurchaseRequestInterface) => {
        await api.get(`purchases-entries/${rowData.id}/`).then((response: AxiosResponse) => {
            setAnnotations(response.data)
            setRow(rowData)
            setOpenAnnotation(true)
        }).catch((error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error)
        })
    }

    // TABLE
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Nº Solicitação": { dataKey: "number_request", propsColumn: { width: 120 } },
            "Data Solicitação": { dataKey: "date_request", propsColumn: { width: 120 } },
            "Data Vencimento": { dataKey: "date_expiration", propsColumn: { width: 120 } },
            "Status": { dataKey: "status", propsColumn: { width: 120 } },
            "Filial": { dataKey: "branch.abbreviation", propsColumn: { width: 100 } },
            "Departamento": { dataKey: "department", propsColumn: { width: 170 } },
            "Solicitante": { dataKey: "requester.name", propsColumn: { width: 170, fullText: true } },
            "Responsável": { dataKey: "responsible.name", propsColumn: { width: 170, fullText: true } },
            "Entradas": { dataKey: "button", propsColumn: { width: 130 }, click: annotationsData, icon: ListIcon },
            "Editar": { dataKey: "button", propsColumn: { width: 130 }, click: editData, icon: EditIcon }
        }
    }, [])

    return (
        <MainPanel.Root shaded>
            <MainPanel.Header title="Solicitações compras">
                <PurchaseRequest.Header refetch={refetch} />
            </MainPanel.Header>

            <MainPanel.Filter refetch={refetch} filter={filter} setFilter={setFilter} >
                <PurchaseRequest.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data.data : []} columns={columns} isLoading={isLoading} />
                <Annotation.View annotations={annotations} id={row.id}
                    open={openAnnotation} setOpen={setOpenAnnotation} />
                <PurchaseRequest.Edit row={row} setRow={setRow} refetch={refetch} open={openEdit} setOpen={setOpenEdit} />
            </MainPanel.Body>

        </MainPanel.Root >
    )
}
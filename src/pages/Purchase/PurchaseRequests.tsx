import { useToaster } from "rsuite";
import ListIcon from "@rsuite/icons/List";
import EditIcon from "@rsuite/icons/Edit";

import { useCallback, useState, useMemo, useContext } from "react";
import { useQuery } from "react-query";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { ColumnsInterface, PurchaseRequestInterface } from "../../services/Interfaces";
import { StringToDate } from "../../services/Date";

import { MainTable } from "../../components/Table"
import { MainPanel } from "../../components/Panel"
import { Annotation } from "../../components/PurchaseRequest/Annotation";
import { PurchaseRequest } from "../../components/PurchaseRequest";
import { MainMessage } from "../../components/Message";

interface Filter {
    numero_solicitacao: string | number | null,
    data_solicitacao_bo: string | null,
    status: string | null,
    filial: number | null,
    solicitante: number | null,
}

const initialFilter = {
    numero_solicitacao: null,
    data_solicitacao_bo: null,
    status: null,
    filial: null,
    solicitante: null,
}


export default function PurchaseRequests() {
    console.log("solicitacao compra")

    const { token }: any = useContext(UserContext)
    const api = useApi(token)
    const toaster = useToaster()

    // FILTER
    const [filter, setFilter] = useState<Filter>({ ...initialFilter, filial: 1 })
    const clear = () => {
        setFilter(initialFilter)
    }

    // DATA
    const searchData = useCallback(async () => {
        if (filter.numero_solicitacao === "") {
            filter.numero_solicitacao = null
        }
        return await api.get("solicitacoes-compras/", { params: { ...filter } })
    }, [filter])
    const { data, isLoading, refetch } = useQuery({
        queryKey: "solic_compras",
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

        if (rowData.filial) row_.filial = rowData.filial.id
        if (!rowData.observacao) row_.observacao = ""
        if (rowData.responsavel) row_.responsavel = rowData.responsavel.id
        if (rowData.data_solicitacao_bo) row_.data_solicitacao_bo = StringToDate(rowData.data_solicitacao_bo, true)
        if (rowData.data_vencimento_boleto) row_.data_vencimento_boleto = StringToDate(rowData.data_vencimento_boleto, true)


        setRow(row_)

        setOpenEdit(true)

        if (row_.data_vencimento_boleto && row_.pago === false) {
            const today = new Date()
            const timeDifference = row_.data_vencimento_boleto.getTime() - today.getTime()
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
        await api.get(`solicitacoes-entradas/${rowData.id}/`).then((response: AxiosResponse) => {
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
            "Nº Solicitação": { dataKey: "numero_solicitacao", width: 120 },
            "Dt Solicitação": { dataKey: "data_solicitacao_bo", width: 120 },
            "Status": { dataKey: "status", width: 120 },
            "Filial": { dataKey: "filial.sigla", width: 100 },
            "Departamento": { dataKey: "departamento", width: 170 },
            "Solicitante": { dataKey: "solicitante.nome", width: 170 },
            "Responsável": { dataKey: "responsavel.nome", width: 170 },
            "Entradas": { dataKey: "button", width: 130, click: annotationsData, icon: ListIcon },
            "Editar": { dataKey: "button", width: 130, click: editData, icon: EditIcon, needAuth: true, auth: "solic_compras_edit" }
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
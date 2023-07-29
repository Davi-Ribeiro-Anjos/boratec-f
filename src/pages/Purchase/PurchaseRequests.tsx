import { useToaster } from "rsuite";
import ListIcon from "@rsuite/icons/List";
import EditIcon from "@rsuite/icons/Edit";

import { useCallback, useState, useMemo } from "react";

import { api } from "../../hooks/Api";
import { ColumnsInterface, PurchaseRequestInterface, AnnotationInterface } from "../../services/Interfaces";

import { MainTable } from "../../components/Table"
import { MainPanel } from "../../components/Panel"
import { Annotation } from "../../components/PurchaseRequest/Annotation";
import { PurchaseRequest } from "../../components/PurchaseRequest";
import { StringToDate } from "../../services/Date";
import { MainMessage } from "../../components/Message";
import { useQuery } from "react-query";

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

    const toaster = useToaster()

    // FILTER
    const [filter, setFilter] = useState<Filter>({ ...initialFilter, filial: 1, solicitante: 1, status: "ABERTO" })
    const clear = () => {
        setFilter(initialFilter)
    }

    // DATA
    const { data, isLoading, refetch } = useQuery({
        queryKey: "solic_compras",
        queryFn: () => searchData(),
        // onSuccess: () => {
        // },
        onError: (err: any) => {
            MainMessage.Error(toaster, err, undefined, "Erro - Ocorreu um erro ao buscar os dados.")
        },
    })
    const searchData = useCallback(async () => {
        if (filter.numero_solicitacao === "") {
            filter.numero_solicitacao = null
        }

        return await api.get("solicitacoes-compras/", { params: { ...filter } })
    }, [filter])

    // ANNOTATION
    const [openAnnotation, setOpenAnnotation] = useState(false)
    const [annotations, setAnnotations] = useState<AnnotationInterface[]>([])
    const annotationsData = useCallback(async (rowData: PurchaseRequestInterface) => {
        await api.get(`solicitacoes-entradas/${rowData.id}/`).then((response) => {

            setAnnotations(response.data)
        }).catch((error) => {
            console.log(error)
        })

        setOpenAnnotation(true)
    }, [])

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
                <Annotation.View annotations={annotations} open={openAnnotation} setOpen={setOpenAnnotation} />
                <PurchaseRequest.Edit row={row} setRow={setRow} refetch={refetch} open={openEdit} setOpen={setOpenEdit} />
            </MainPanel.Body>

        </MainPanel.Root >
    )
}
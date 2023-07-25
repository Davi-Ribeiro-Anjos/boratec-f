import { Message, toaster } from "rsuite";
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

interface Filter {
    numero_solicitacao: number | null,
    data_solicitacao_bo: string | null,
    status: string | null,
    filial: number | null,
    solicitante: string | null,
}


export default function PurchaseRequests() {
    console.log("solicitacao compra")

    // FILTER
    const propsFilter: Filter = {
        numero_solicitacao: null,
        data_solicitacao_bo: null,
        status: null,
        filial: null,
        solicitante: null,
    }

    // DATA
    const [data, setData] = useState<PurchaseRequestInterface[]>([])
    const searchData = useCallback(async (filter: any) => {
        if (typeof filter.numero_solicitacao === "string") {
            try {
                filter.numero_solicitacao = parseInt(filter.numero_solicitacao)
            } catch (error) {
                filter.numero_solicitacao = null
            }
        }

        await api.get("solicitacoes-compras/", { params: { ...filter } }).then((response) => {
            let dataResponse = response.data

            setData(dataResponse)
        }).catch(() => {
            let message = (
                <Message showIcon type="error" closable >
                    Erro - Ocorreu um erro ao buscar os dados.
                </Message>
            )
            toaster.push(message, { placement: "topEnd", duration: 4000 })
        })
    }, [])

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
        if (rowData.data_vencimento_boleto) row_.data_vencimento_boleto = StringToDate(rowData.data_vencimento_boleto)

        setRow(row_)

        setOpenEdit(true)
    }, [row])

    // TABLE
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Nº Solicitação": { dataKey: "numero_solicitacao", width: 130 },
            "Dt Solicitação": { dataKey: "data_solicitacao_bo", width: 150 },
            "Status": { dataKey: "status", width: 120 },
            "Filial": { dataKey: "filial.sigla", width: 120 },
            "Departamento": { dataKey: "departamento", width: 170 },
            "Solicitante": { dataKey: "solicitante.username", width: 150 },
            "Responsável": { dataKey: "responsavel.username", width: 150 },
            "Entradas": { dataKey: "button", width: 130, click: annotationsData, icon: ListIcon },
            "Editar": { dataKey: "button", width: 130, click: editData, icon: EditIcon, needAuth: true, auth: "solic_compras_edit" }
        }
    }, [])

    return (
        <MainPanel.Root shaded>
            <MainPanel.Header title="Solicitações compras">
                <PurchaseRequest.Header />
            </MainPanel.Header>

            <MainPanel.Filter send={searchData} propsFilter={propsFilter}>
                <PurchaseRequest.Filter />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data} columns={columns} />
                <Annotation.View annotations={annotations} open={openAnnotation} setOpen={setOpenAnnotation} />
                <PurchaseRequest.Edit row={row} setRow={setRow} open={openEdit} setOpen={setOpenEdit} />
            </MainPanel.Body>

        </MainPanel.Root >
    )
}
import { Message, toaster } from "rsuite";
import ListIcon from "@rsuite/icons/List";
import EditIcon from "@rsuite/icons/Edit";

import { useCallback, useState, useMemo } from "react";

import { api } from "../../hooks/api";
import { ColumnsInterface, PurchaseRequestInterface, AnnotationInterface } from "../../services/Interfaces";

import { MainTable } from "../../components/Table"
import { MainPanel } from "../../components/Panel/index"
import { FilterPurchaseRequest } from "../../components/PurchaseRequest/FilterPurchaseRequest"
import { HeaderPurchaseRequest } from "../../components/PurchaseRequest/HeaderPurchaseRequest"
import { Annotation } from "../../components/PurchaseRequest/Annotation/Annotation";

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
    const [filter, setFilter] = useState<Filter>({
        numero_solicitacao: null,
        data_solicitacao_bo: null,
        status: null,
        filial: null,
        solicitante: null,
    })
    const clearFilter = () => {
        setFilter({
            numero_solicitacao: null,
            data_solicitacao_bo: null,
            status: null,
            filial: null,
            solicitante: null,
        })
    }

    // DATA
    const [data, setData] = useState<PurchaseRequestInterface[]>([])
    const searchData = useCallback(async () => {
        if (typeof filter.numero_solicitacao === "string") filter.numero_solicitacao = null

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
    const annotationsData = useCallback(async (rowData: any) => {
        await api.get(`solicitacoes-entradas/${rowData.id}/`).then((response) => {
            setAnnotations(response.data)
        }).catch((error) => {
            console.log(error)
        })

        setOpenAnnotation(true)
    }, [])

    const dataEdit = useCallback((rowData: any) => {
        console.log(rowData)
    }, [])



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
            "Editar": { dataKey: "button", width: 130, click: dataEdit, icon: EditIcon, needAuth: true, auth: "solic_compras_edit" }
        }
    }, [dataEdit, annotationsData])

    return (
        <MainPanel.Root shaded>
            <MainPanel.Header title="Solicitações compras">
                <HeaderPurchaseRequest />
            </MainPanel.Header>

            <MainPanel.Filter send={searchData} filter={filter} setFilter={setFilter} clear={clearFilter}>
                <FilterPurchaseRequest />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data} columns={columns} />
                <Annotation annotations={annotations} open={openAnnotation} setOpen={setOpenAnnotation} />
            </MainPanel.Body>

        </MainPanel.Root >
    )
}
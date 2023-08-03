import { useToaster } from "rsuite";
import CheckIcon from "@rsuite/icons/Check";
import PageIcon from "@rsuite/icons/Page";

import { useState, useMemo, useCallback, useContext } from "react"
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { baseUrl, useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { ColumnsInterface, PalletMovementInterface } from "../../services/Interfaces";

import { PalletBranch } from "../../components/PalletBranch";
import { MainPanel } from "../../components/Panel";
import { MainTable } from "../../components/Table";
import { MainMessage } from "../../components/Message";
import { BranchConfirmTransfer } from "../../components/PalletBranch/BranchConfirmTransfer";
import { DateToString } from "../../services/Date";

interface Filter {
    origem: number | null,
    destino: number | null,
    placa_veiculo: string | null,
    autor: number | null,
    recebido: boolean,
}

const initialFilter = {
    origem: null,
    destino: null,
    placa_veiculo: "",
    autor: null,
    recebido: false,
}


export default function BranchPallet() {
    console.log("palete filial")

    const { token }: any = useContext(UserContext)
    const api = useApi(token)
    const toaster = useToaster()

    const [showReceived, setShowReceived] = useState(false)

    const [filter, setFilter] = useState<Filter>({ ...initialFilter, autor: 1 })
    const clear = () => {
        setFilter(initialFilter)
    }

    const searchData = useCallback(async () => {
        let newFilter: any = { ...filter }

        if (newFilter.placa_veiculo) {
            newFilter['placa_veiculo__contains'] = newFilter.placa_veiculo

            delete newFilter.placa_veiculo
        } else {
            delete newFilter.placa_veiculo
        }

        const response = await api.get<PalletMovementInterface[]>('paletes-movimentos/', { params: { ...newFilter } })

        return response.data
    }, [filter])

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["movement-pallet"],
        queryFn: searchData,
        onSuccess: () => {
            setShowReceived(filter.recebido)
        },
        onError: (error: AxiosError) => {
            let message = {
                origem: "Origem",
                destino: "Destino",
                placa_veiculo: "Placa do Veiculo",
                autor: "Autor",
                recebido: "Recebido"
            }
            MainMessage.Error400(toaster, error, message)
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
        enabled: false
    })

    // CONFIRM
    const [row, setRow] = useState({})
    const [openConfirm, setOpenConfirm] = useState(false)
    const confirmData = useCallback((rowData: any) => {
        const today = new Date()

        rowData['data_recebimento'] = DateToString(today, true)
        rowData['quantidadeInicial'] = rowData.quantidade_paletes

        setRow(rowData)
        setOpenConfirm(true)
    }, [row])

    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Nº Solicitação": { dataKey: "solicitacao", width: 170 },
            "Nº de Paletes": { dataKey: "quantidade_paletes", width: 110 },
            "Dt Solicitação": { dataKey: "data_solicitacao", width: 150 },
            "Origem": { dataKey: "origem.sigla", width: 100 },
            "Destino": { dataKey: "destino.sigla", width: 100 },
            "Placa Veiculo": { dataKey: "placa_veiculo", width: 130 },
            "Autor": { dataKey: "autor.nome", width: 140 },
            "Código de barras": { dataKey: "link", width: 130, url: `${baseUrl}/api/paletes-movimentos/documento/`, icon: PageIcon },
            "Confirmar Recebimento": { dataKey: "button", width: 160, click: confirmData, icon: CheckIcon, needAuth: true, auth: "solic_compras_edit" }
        }
    }, [])

    const columnsComplete = useMemo<ColumnsInterface>(() => {
        return {
            "Nº Solicitação": { dataKey: "solicitacao", width: 160 },
            "Nº de Paletes": { dataKey: "quantidade_paletes", width: 110 },
            "Dt Solicitação": { dataKey: "data_solicitacao", width: 170 },
            "Dt Recebimento": { dataKey: "data_recebimento", width: 170 },
            "Origem": { dataKey: "origem.sigla", width: 100 },
            "Destino": { dataKey: "destino.sigla", width: 100 },
            "Placa Veiculo": { dataKey: "placa_veiculo", width: 130 },
            "Autor": { dataKey: "autor.nome", width: 200 },
        }
    }, [])

    return (
        <MainPanel.Root shaded>
            <MainPanel.Header title="Paletes Filiais">
                <PalletBranch.Header />
            </MainPanel.Header>

            <MainPanel.Filter refetch={refetch} filter={filter} setFilter={setFilter}>
                <PalletBranch.Filter filter={filter} setFilter={setFilter} />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={showReceived ? columnsComplete : columns} isLoading={isLoading} />
                <PalletBranch.ConfirmTransfer open={openConfirm} setOpen={setOpenConfirm} row={row} setRow={setRow} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
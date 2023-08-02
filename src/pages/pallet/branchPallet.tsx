import CheckIcon from "@rsuite/icons/Check";
import PageIcon from "@rsuite/icons/Page";

import { useState, useMemo } from "react"

import { ColumnsInterface } from "../../services/Interfaces";

import { PalletBranch } from "../../components/PalletBranch";
import { MainPanel } from "../../components/Panel";
import { MainTable } from "../../components/Table";
import { baseUrl } from "../../hooks/Api";


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

    const [filter, setFilter] = useState<Filter>({ ...initialFilter })
    const clear = () => {
        setFilter(initialFilter)
    }

    const refetch = () => { }
    const data: any = []
    const isLoading: any = false
    const received: any = false

    // CONFIRM
    const confirmData = () => { }



    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Nº Solicitação": { dataKey: "solicitacao", width: 170 },
            "Nº de Paletes": { dataKey: "quantidade_paletes", width: 110 },
            "Dt Solicitação": { dataKey: "data_solicitacao", width: 150 },
            "Origem": { dataKey: "origem.sigla", width: 100 },
            "Destino": { dataKey: "destino.sigla", width: 100 },
            "Placa Veiculo": { dataKey: "placa_veiculo", width: 130 },
            "Autor": { dataKey: "autor.username", width: 140 },
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
            "Autor": { dataKey: "autor.username", width: 140 },
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
                <MainTable.Root data={data} columns={received ? columnsComplete : columns} isLoading={isLoading} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
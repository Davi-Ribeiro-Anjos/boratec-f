import { useEffect, useState } from "react"

import { api } from "../../hooks/api"

import MainTable from "../../components/table"
import { MainPanel } from "../../components/panel"
import { FilterPurchaseRequest } from "../../components/purchaseRequest/filterPurchaseRequest"
import { PanelPurchaseRequest } from "../../components/purchaseRequest/panelPurchaseRequest"
import { Message, toaster } from "rsuite"

interface Filter {
    numero_solicitacao: number | null;
    data_solicitacao_bo: string | null;
    status: string | null;
    filial: number | null;
    solicitante: number | null;
}

export default function PurchaseRequests() {
    console.log("solicitacao compra")

    // DATA
    const [data, setData] = useState()
    const [filter, setFilter] = useState<Filter>({
        numero_solicitacao: null,
        data_solicitacao_bo: null,
        status: null,
        filial: null,
        solicitante: null,
    })
    const searchData = async () => {
        await api.get('solicitacoes-compras/', { params: { ...filter } }).then((response) => {
            let resData = response.data

            for (const line in resData) {
                if (Object.hasOwnProperty.call(resData, line)) {
                    const element = resData[line];

                    element.data_solicitacao_bo = element.data_solicitacao_bo.split(' ')[0]
                }
            }
            console.log(resData)

            setData(resData)
        }).catch((error) => {
            let message = (
                < Message showIcon type="error" closable >
                    Erro - Ocorreu um erro ao buscar os dados.
                </ Message>
            )
            toaster.push(message, { placement: 'topEnd', duration: 4000 })
        })
    }

    // COLUMNS
    const columns = {
        'Nº Solicitação': { dataKey: 'numero_solicitacao', width: 130 },
        'Dt Solicitação': { dataKey: 'data_solicitacao_bo', width: 150 },
        'Status': { dataKey: 'status', width: 120 },
        'Filial': { dataKey: 'filial.sigla', width: 120 },
        'Departamento': { dataKey: 'departamento', width: 170 },
        'Solicitante': { dataKey: 'solicitante.username', width: 150 },
        'Responsável': { dataKey: 'responsavel.username', width: 150 },
        // 'Entradas': { dataKey: "botao", width: 130, click: dadosEntradas, icon: ListIcon },
        // 'Editar': { dataKey: "botao", width: 130, click: dadosEditar, icon: EditIcon, needAuth: true, auth: auth }
    };


    return (
        <MainPanel>
            <PanelPurchaseRequest />

            <FilterPurchaseRequest />

            {/* <MainTable data={data} columns={columns} searchData={searchData} /> */}

        </MainPanel>
    )
}
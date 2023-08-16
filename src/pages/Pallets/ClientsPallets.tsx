import { useToaster } from "rsuite";
import PageIcon from '@rsuite/icons/Page';

import { useState, useMemo, useContext } from "react";
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { baseUrl, useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { ColumnsInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Panel";
import { MainTable } from "../../components/Table";
import { MainMessage } from "../../components/Message";
import { PalletClient } from "../../components/PalletClient";

interface Filter {
    filial: number | null,
    cliente_id: number | null,
}

const initialFilter = {
    filial: null,
    cliente_id: null,
}


export default function ClientsPallets() {
    console.log("palete cliente")

    const { token }: any = useContext(UserContext)
    const api = useApi(token)
    const toaster = useToaster()

    const [filter, setFilter] = useState<Filter>(initialFilter)
    const clear = () => {
        setFilter(initialFilter)
    }

    const searchData = async () => {
        const response = await api.get('clientes/', { params: { ...filter } })

        const dataRes = [...response.data]

        for (const value in dataRes) {
            if (Object.hasOwnProperty.call(dataRes, value)) {
                const element = dataRes[value];

                if (element.saldo) {
                    if (element.saldo > 0) {
                        element.status = "A BORA DEVE"
                    } else {
                        element.status = "O CLIENTE DEVE"
                        element.saldo *= -1
                    }
                }
            }
        }

        return dataRes
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["pallet-client"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Erro - Ocorreu um erro ao buscar os dados")
        },
        enabled: false
    })

    const columns = useMemo<ColumnsInterface>(() => {
        return {
            'Filial': { dataKey: 'filial.sigla', width: 150 },
            'Saldo': { dataKey: 'saldo', width: 110 },
            'Tipo Palete': { dataKey: 'tipo_palete', width: 110 },
            'Razão Social/ Motorista': { dataKey: 'cliente.razao_social_motorista', width: 250 },
            'Status': { dataKey: 'status', width: 130 },
            'Documento': { dataKey: "link", width: 130, url: `${baseUrl}api/clientes/documento/`, icon: PageIcon }
        }
    }, [])

    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="Paletes Clientes">
                <PalletClient.Header />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                <PalletClient.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
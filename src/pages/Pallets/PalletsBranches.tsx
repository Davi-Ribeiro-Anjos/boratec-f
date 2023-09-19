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
import { MainPanel } from "../../components/Global/Panel";
import { MainTable } from "../../components/Global/Table";
import { MainMessage } from "../../components/Global/Message";
import { DateToString } from "../../services/Date";

interface Filter {
    origin: number | null,
    destiny: number | null,
    vehicle_plate: string | null,
    author: number | null,
    received: boolean,
}

const initialFilter = {
    origin: null,
    destiny: null,
    vehicle_plate: "",
    author: null,
    received: false,
}


export default function PalletsBranches() {
    const { me }: any = useContext(UserContext)
    const api = useApi()
    const toaster = useToaster()

    const [showReceived, setShowReceived] = useState(false)

    const [filter, setFilter] = useState<Filter>({ ...initialFilter, author: me.id })
    const clear = () => {
        setFilter(initialFilter)
    }

    const searchData = useCallback(async () => {
        let newFilter: any = { ...filter }

        if (newFilter.vehicle_plate) {
            newFilter['vehicle_plate__contains'] = newFilter.vehicle_plate

            delete newFilter.vehicle_plate
        } else {
            delete newFilter.vehicle_plate
        }


        const response = await api.get<PalletMovementInterface[]>('pallets-movements/', { params: { ...newFilter } })

        return response.data
    }, [filter])

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["movement-pallet"],
        queryFn: searchData,
        onSuccess: () => {
            setShowReceived(filter.received)
        },
        onError: (error: AxiosError) => {
            let message = {
                origin: "Origem",
                destiny: "Destino",
                vehicle_plate: "Placa do Veiculo",
                author: "Autor",
                received: "Recebido"
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

        rowData['date_received'] = DateToString(today, true)
        rowData['quantityInitial'] = rowData.quantity_pallets

        setRow(rowData)
        setOpenConfirm(true)
    }, [row])

    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Nº Solicitação": { dataKey: "request", propsColumn: { width: 170 } },
            "Nº de Paletes": { dataKey: "quantity_pallets", propsColumn: { width: 110 } },
            "Dt Solicitação": { dataKey: "date_request", propsColumn: { width: 150 } },
            "Origem": { dataKey: "origin.abbreviation", propsColumn: { width: 100 } },
            "Destino": { dataKey: "destiny.abbreviation", propsColumn: { width: 100 } },
            "Placa Veiculo": { dataKey: "vehicle_plate", propsColumn: { width: 130 } },
            "Autor": { dataKey: "author.name", propsColumn: { width: 160, fullText: true } },
            "Código de barras": { dataKey: "link", propsColumn: { width: 130 }, url: `${baseUrl}/api/pallets-movements/document/`, icon: PageIcon },
            "Confirmar Recebimento": { dataKey: "button", propsColumn: { width: 160 }, click: confirmData, icon: CheckIcon, auth: "pallet_branch_admin" }
        }
    }, [])

    const columnsComplete = useMemo<ColumnsInterface>(() => {
        return {
            "Nº Solicitação": { dataKey: "request", propsColumn: { width: 170 } },
            "Nº de Paletes": { dataKey: "quantity_pallets", propsColumn: { width: 110 } },
            "Dt Solicitação": { dataKey: "date_request", propsColumn: { width: 150 } },
            "Dt Recebimento": { dataKey: "date_received", propsColumn: { width: 150 } },
            "Origem": { dataKey: "origin.abbreviation", propsColumn: { width: 100 } },
            "Destino": { dataKey: "destiny.abbreviation", propsColumn: { width: 100 } },
            "Placa Veiculo": { dataKey: "vehicle_plate", propsColumn: { width: 130 } },
            "Autor": { dataKey: "author.name", propsColumn: { width: 200, fullText: true } },
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
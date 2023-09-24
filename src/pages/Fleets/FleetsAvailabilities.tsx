import { Progress, useToaster } from "rsuite";
import ToolsIcon from '@rsuite/icons/Tools';
import BlockIcon from '@rsuite/icons/Block';
import CheckOutlineIcon from '@rsuite/icons/CheckOutline';


import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useApi } from "../../hooks/Api";
import { ColumnsInterface, VehicleInterface } from "../../services/Interfaces";
import { UserContext } from "../../providers/UserProviders";

import { MainPanel } from "../../components/Global/Panel";
import { MainTable } from "../../components/Global/Table";
import { FleetAvailability } from "../../components/FleetAvailability";
import { DateToString } from "../../services/Date";
import { MainMessage } from "../../components/Global/Message";
import { AxiosError, AxiosResponse } from "axios";
import { queryClient } from "../../services/QueryClient";
import { getCookie, setCookie } from "../../services/Cookies";

interface GetVehicles {
    total: number;
    data: VehicleInterface[];
}
interface Filter {
    branch_id: number | null;
}


export default function FleetsAvailabilities() {
    const { me, verifyPermission }: any = useContext(UserContext)
    const api = useApi()
    const toaster = useToaster()


    // FILTER
    const [filter, setFilter] = useState<Filter>({ branch_id: me.branch.id })
    const clear = () => {
        setFilter({ branch_id: me.branch.id })
    }


    // DATA
    const [total, setTotal] = useState(parseInt(getCookie("total_vehicles") || "0"))
    const searchData = async () => {
        const response = await api.get<GetVehicles>("vehicles/", { params: filter })

        setTotal(response.data.total)
        setCookie("total_vehicles", response.data.total.toString(), 1)

        const dataRes = response.data.data.filter((vehicle: VehicleInterface) => {
            if (vehicle.last_movement) {
                const last = vehicle.last_movement

                const today = DateToString(new Date())

                if (last == today) return false
            }
            return true
        })

        return dataRes
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["fleets-availabilities"],
        queryFn: searchData,
        onSuccess: () => { },
        onError: () => { },
        enabled: true,
    })
    const send = async (rowData: VehicleInterface) => {
        let body = {
            status: "FUNCIONANDO",
            author: me.id,
            vehicle: rowData.id
        }

        await api.post('fleets-availabilities/', { ...body }).then((response: AxiosResponse) => {
            let dataRes: any = response.data

            queryClient.setQueryData(["fleets-availabilities"], (currentData: any) => {
                return currentData.filter((vehicle: VehicleInterface) => vehicle.id !== dataRes.vehicle.id)
            })

            MainMessage.Ok(toaster, "Sucesso - Registro criado.", 2000)

        }).catch((error: AxiosError) => {
            const listMessage = {
                status: "Status",
                author: "Autor",
                vehicle: "Veículo",
            }

            MainMessage.Error400(toaster, error, listMessage)
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error)
        })
    }


    // TABLE
    const [row, setRow] = useState<VehicleInterface>()
    const [preventive, setPreventive] = useState(false)
    const [openStopped, setOpenStopped] = useState(false)
    const modalStopped = (rowData: VehicleInterface) => {
        setRow(rowData)

        setOpenStopped(true)
    }
    const modalPreventive = (rowData: VehicleInterface) => {
        setRow(rowData)

        setOpenStopped(true)
        setPreventive(true)
    }
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Placa Veículo": { dataKey: "vehicle_plate", propsColumn: { width: 100, fullText: true } },
            "Tipo Veículo": { dataKey: "type_vehicle", propsColumn: { width: 100, fullText: true } },
            "Parado": {
                dataKey: "button", propsIcon: { appearance: "primary", color: "red" },
                propsColumn: { flexGrow: 1 }, click: modalStopped, icon: BlockIcon
            },
            "Preventivo": {
                dataKey: "button", propsIcon: { appearance: "primary", color: "yellow" },
                propsColumn: { flexGrow: 1 }, click: modalPreventive, icon: ToolsIcon
            },
            "Liberado": {
                dataKey: "button", propsIcon: { appearance: "primary", color: "green" },
                propsColumn: { flexGrow: 1 }, click: send, icon: CheckOutlineIcon
            },
        }
    }, [])


    // PERCENT
    const calculateProgress = (): number => {
        let percent = 0

        if (data) {
            const difference = total - data.length
            percent = Math.ceil((difference / total) * 100)
        }

        if (percent > 100) percent = 100
        if (percent < 0) percent = 0

        // if (percent == 100) MainMessage.Info(toaster, "Todas as marcações para essa filial foram realizadas.", 6000)

        return percent
    }


    return (
        <MainPanel.Root>

            <MainPanel.Header title="Disponibilidade Frota">
            </MainPanel.Header>

            {verifyPermission("fleet_availability_admin") && (
                <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                    <FleetAvailability.Filter />
                    <MainPanel.FilterFooter clear={clear} />
                </MainPanel.Filter>
            )}

            <br />
            <Progress.Line percent={calculateProgress()} status={calculateProgress() == 100 ? "success" : "active"} />
            <br />

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} />
                <FleetAvailability.Status open={openStopped} setOpen={setOpenStopped} preventive={preventive} setPreventive={setPreventive} row={row} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
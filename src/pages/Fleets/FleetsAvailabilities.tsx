import { Progress, useToaster } from "rsuite";
import ToolsIcon from '@rsuite/icons/Tools';
import BlockIcon from '@rsuite/icons/Block';
import CheckOutlineIcon from '@rsuite/icons/CheckOutline';


import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useApi } from "../../hooks/Api";
import { ColumnsInterface } from "../../services/Interfaces";
import { UserContext } from "../../providers/UserProviders";

import { MainPanel } from "../../components/Panel";
import { MainTable } from "../../components/Table";
import { FleetAvailability } from "../../components/FleetAvailability";

interface Filter {
    branch_id: number | null;
}

const initialFilter: Filter = {
    branch_id: 1,
}


export default function FleetsAvailabilities() {
    const { token }: any = useContext(UserContext)
    const api = useApi(token)
    const toaster = useToaster()

    const auth = false

    // FILTER
    const [filter, setFilter] = useState(initialFilter)
    const clear = () => {
        setFilter(initialFilter)
    }


    // DATA
    const searchData = async () => {

        const response = await api.get("vehicles/", { params: filter })

        return response.data
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["fleets-availabilities"],
        queryFn: searchData,
        onError: () => { },
        enabled: auth ? false : true
    })


    // TABLE
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Placa Veículo": { dataKey: "vehicle_plate", propsColumn: { flexGrow: 1 } },
            "Tipo Veículo": { dataKey: "type_vehicle", propsColumn: { flexGrow: 1 } },
            "Parado": {
                dataKey: "button", propsIcon: { appearance: "primary", color: "red" },
                propsColumn: { flexGrow: 1 }, click: () => { }, icon: BlockIcon
            },
            "Preventivo": {
                dataKey: "button", propsIcon: { appearance: "primary", color: "yellow" },
                propsColumn: { flexGrow: 1 }, click: () => { }, icon: ToolsIcon
            },
            "Liberado": {
                dataKey: "button", propsIcon: { appearance: "primary", color: "green" },
                propsColumn: { flexGrow: 1 }, click: () => { }, icon: CheckOutlineIcon
            },
        }
    }, [])
    const calculateProgress = () => {
        let dataLength: number;

        if (data) dataLength = data.length

        // console.log(dataLength)
    }


    return (
        <MainPanel.Root>

            <MainPanel.Header title="Disponibilidade Frota">
            </MainPanel.Header>

            {auth && (
                <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                    <FleetAvailability.Filter />
                    <MainPanel.FilterFooter clear={clear} />
                </MainPanel.Filter>
            )}

            <>
                <br />
                <Progress.Line percent={0} status="active" />
                <br />
            </>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} />
                {/* <FleetAvailability.Stopped open={openOccurrence} setOpen={setOpenOccurrence} />
                <FleetAvailability.Preventive open={openPacking} setOpen={setOpenPacking} /> */}
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
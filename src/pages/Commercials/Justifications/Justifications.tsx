import { useToaster } from "rsuite";


import { useContext, useState } from "react";
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../../hooks/Api";
import { UserContext } from "../../../providers/UserProviders";
import { DateToString } from "../../../services/Date";

import { MainPanel } from "../../../components/Global/Panel";
import { MainMessage } from "../../../components/Global/Message";
import { Justification } from "../../../components/Justification";
import { DeliveryHistoryInterface } from "../../../services/Interfaces";

interface Filter {
    opened__gt: number;
    description_justification__isnull: boolean;
    date_emission: any;
    date_emission__gte: any;
    date_emission__lte: any;
    id_garage: number | null;
    confirmed: boolean;
}


export default function Justifications() {
    const { }: any = useContext(UserContext)
    const api = useApi()
    const toaster = useToaster()


    // FILTER
    const initialFilter = {
        opened__gt: 0,
        description_justification__isnull: true,
        date_emission: null,
        date_emission__gte: null,
        date_emission__lte: null,
        id_garage: null,
        confirmed: false,
    }
    const [filter, setFilter] = useState<Filter>({ ...initialFilter })
    const clear = () => {
        setFilter(initialFilter)
    }


    // DATA
    const [data, setData] = useState([])
    const searchData = async () => {
        let filter_ = { ...filter }

        if (filter_.date_emission) {
            filter_.date_emission__gte = DateToString(filter_.date_emission[0])
            filter_.date_emission__lte = DateToString(filter_.date_emission[1])

            delete filter_.date_emission
        }

        const response = await api.get<DeliveryHistoryInterface[]>("/deliveries-histories/", { params: { ...filter_ } })

        let dataRes = response.data

        for (const res in dataRes) {
            if (Object.prototype.hasOwnProperty.call(dataRes, res)) {
                const line = dataRes[res];

                if (line.date_delivery === "01/01/0001") line.date_delivery = null
                if (line.lead_time === "01/01/0001") line.lead_time = null

            }
        }

        return response.data
    }
    const { isLoading, refetch } = useQuery({
        queryKey: ["justification"],
        queryFn: searchData,
        onSuccess: (response: any) => {
            setData(response)
        },
        onError: (error: AxiosError) => {
            MainMessage.Error400(toaster, error, {})
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
        enabled: false
    })


    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="Justificativas">
                <Justification.Header data={data} />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                <Justification.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <Justification.Table data={data} setData={setData} isLoading={isLoading} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
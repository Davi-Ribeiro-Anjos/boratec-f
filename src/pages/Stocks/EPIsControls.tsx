import { useToaster } from "rsuite";
// import DetailIcon from '@rsuite/icons/Detail';
import ListIcon from "@rsuite/icons/List";


import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { ColumnsInterface, EpiGroupInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Global/Panel";
import { MainTable } from "../../components/Global/Table";
import { EPIControl } from "../../components/EPIControl";
import { MainMessage } from "../../components/Global/Message";


export default function EPIsControls() {
    const api = useApi()
    const toaster = useToaster()


    // DATA
    const searchData = async () => {
        const response = await api.get("epis/groups/")

        const dataRes = response.data

        return dataRes
    }
    const { data, isLoading } = useQuery({
        queryKey: ["epis-groups"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error)
        },
    })


    // TABLE
    const [row, setRow] = useState<EpiGroupInterface>()
    const [modalItem, setModalItem] = useState(false)
    const open = (rowData: EpiGroupInterface) => {
        setRow(rowData)
        setModalItem(true)

    }

    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Grupo": { dataKey: "name", propsColumn: { flexGrow: 1, } },
            "Itens": { dataKey: "button", propsColumn: { flexGrow: 1 }, click: open, icon: ListIcon },
            // "Visualizar": { dataKey: "button", propsColumn: { flexGrow: 1 }, click: () => { }, icon: DetailIcon },
        }
    }, [])


    return (
        <MainPanel.Root>

            <MainPanel.Header title="Controle EPI's">
                <EPIControl.Header />
            </MainPanel.Header>

            <br />
            <br />

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} />
                <EPIControl.ViewItem open={modalItem} setOpen={setModalItem} row={row} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
// let dataFiltered: any = []
// dataRes.map((group: EpiGroupInterface) => {
//     const data: any = {
//         group: group.name
//     }

//     group.epis_items.map((item) => {
//         const data_item = {
//             ...data,
//             description: item.description,
//             ca: item.ca,
//             validity: item.validity
//         }

//         item.epis_sizes.map((size) => {
//             const data_size = {
//                 ...data_item,
//                 size: size.size,
//                 quantity: size.quantity
//             }

//             dataFiltered.push(data_size)
//         })
//     })
// })
// return dataFiltered
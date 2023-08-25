import { Message, useToaster } from "rsuite";
import DetailIcon from '@rsuite/icons/Detail';

import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useApi } from "../../hooks/Api";
import { ColumnsInterface, EpiGroupInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Panel";
import { MainTable } from "../../components/Table";
import { EPIControl } from "../../components/EPIControl";


export default function EPIsControls() {
    const api = useApi()
    const toaster = useToaster()


    // DATA
    const searchData = async () => {
        const response = await api.get("epis/groups/")

        const dataRes = response.data

        let dataFiltered: any = []
        dataRes.map((group: EpiGroupInterface) => {
            const data: any = {
                group: group.name
            }

            group.epis_items.map((item) => {
                const data_item = {
                    ...data,
                    description: item.description,
                    ca: item.ca,
                    validity: item.validity
                }

                item.epis_sizes.map((size) => {
                    const data_size = {
                        ...data_item,
                        size: size.size,
                        quantity: size.quantity
                    }

                    dataFiltered.push(data_size)
                })
            })
        })

        return dataFiltered
    }
    const { data, isLoading } = useQuery({
        queryKey: ["epis-groups"],
        queryFn: searchData,
        onError: () => { },
    })


    // TABLE
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Grupo": {
                dataKey: "name",
                propsColumn: {
                    flexGrow: 1,
                    rowSpan: (rowData) => {

                        // return rowData.epi_items.length
                    }
                }
            },
            "CA": { dataKey: "ca", propsColumn: { flexGrow: 1 } },
            "Validade": { dataKey: "validity", propsColumn: { flexGrow: 1 } },
            // "Itens": { dataKey: "button", propsColumn: { flexGrow: 1 }, click: () => { }, icon: DetailIcon },
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
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
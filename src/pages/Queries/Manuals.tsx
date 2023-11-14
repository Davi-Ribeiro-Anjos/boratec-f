import { Message, useToaster } from "rsuite";
import FileDownloadIcon from '@rsuite/icons/FileDownload';

import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi, useApiDownload } from "../../hooks/Api";
import { ColumnsInterface, ManualInterface } from "../../services/Interfaces";

import { Manual } from "../../components/Manual";
import { MainPanel } from "../../components/Global/Panel";
import { MainTable } from "../../components/Global/Table";
import { MainMessage } from "../../components/Global/Message";

import FileDownload from 'js-file-download';

interface Filter {
    title__contains: string | null;
    module: string | null;
    system: string | null;
}

interface DataInterface {
    data: ManualInterface[],
    systems: any[];
    modules: any[];
}


export default function Manuals() {
    const api = useApi()
    const apiDownload = useApiDownload()
    const toaster = useToaster()


    // FILTER
    const initialFilter: Filter = {
        title__contains: "",
        module: null,
        system: null,
    }
    const [filter, setFilter] = useState(initialFilter)
    const clear = () => {
        setFilter(initialFilter)
    }


    // DATA
    const [SystemsChoices, setSystemsChoices] = useState<any[]>([])
    const [ModulesChoices, setModulesChoices] = useState<any[]>([])
    const searchData = async () => {
        let filter_ = { ...filter }

        if (filter_.title__contains) filter_.title__contains = filter_.title__contains.toUpperCase()

        const response = await api.get<DataInterface>("queries/manuals/", { params: { ...filter_ } })

        setSystemsChoices(response.data.systems.map((value) => { return value.system }).map(item => ({ label: item, value: item })))
        setModulesChoices(response.data.modules.map((value) => { return value.module }).map(item => ({ label: item, value: item })))

        return response.data.data
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["query-manual"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error)
        },
        enabled: true
    })

    const download = async (rowData: any) => {
        await apiDownload.post(rowData.file + "/").then((response: any) => {
            let file = rowData.file.split("/")[6]

            FileDownload(response.data, file)
        }).catch(() => {
            let message = (
                <Message showIcon type="error" closable >
                    Ocorreu um erro ao buscar o arquivo.
                </ Message>
            )
            throw toaster.push(message, { placement: "topEnd", duration: 4000 })
        })

    }

    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Título": { dataKey: "title", propsColumn: { flexGrow: 2 } },
            "Sistema": { dataKey: "system", propsColumn: { flexGrow: 1 } },
            "Módulo": { dataKey: "module", propsColumn: { flexGrow: 1 } },
            "Arquivo": { dataKey: "button", propsColumn: { flexGrow: 1 }, click: download, icon: FileDownloadIcon },
        }
    }, [])


    return (
        <MainPanel.Root>

            <MainPanel.Header title="Manuais">
                <Manual.Header />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} defaultExpanded={false} >
                <Manual.Filter SystemsChoices={SystemsChoices} ModulesChoices={ModulesChoices} />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} />

        </MainPanel.Root>
    )
}
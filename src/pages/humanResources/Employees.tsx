import { useToaster } from "rsuite";
import ListIcon from "@rsuite/icons/List";
import EditIcon from "@rsuite/icons/Edit";

import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { ColumnsInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Panel";
import { MainTable } from "../../components/Table";
import { Employee } from "../../components/Employee";
import { AxiosError } from "axios";
import { MainMessage } from "../../components/Message";

interface Filter {
    id: number | null,
    filial: number | null,
    tipo_contrato: string
}

const initialFilter = {
    id: null,
    filial: null,
    tipo_contrato: "PJ"
}


export default function Employees() {
    console.log("funcionarios pj")

    const { token }: any = useContext(UserContext)
    const api = useApi(token)
    const toaster = useToaster()

    const [filter, setFilter] = useState<Filter>({ ...initialFilter })
    const clear = () => {
        setFilter(initialFilter)
    }

    // DATA
    const searchData = async () => {
        const response = await api.get("funcionarios/", { params: { ...filter } })

        let dataRes = response.data
        for (const line in dataRes) {
            if (Object.hasOwnProperty.call(dataRes, line)) {
                const element = dataRes[line];

                element["dados_bancarios"] = `BCO: ${element.banco} | AG: ${element.agencia} | CC: ${element.conta}`
            }
        }

        return dataRes
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["employees"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            let message = {
                funcionario: "Funcionário",
                filial: "Filial",
                tipo_contrato: "Tipo Contrato",
            }

            MainMessage.Error400(toaster, error, message)
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
        enabled: false
    })

    // EDIT
    const [open, setOpen] = useState(false)
    const edit = () => {
        setOpen(true)
    }


    // TABLE

    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Nome": { dataKey: "nome", width: 300 },
            "Filial": { dataKey: "filial.sigla", width: 120 },
            "CNPJ": { dataKey: "cnpj", width: 150 },
            "Dados Bancários": { dataKey: "dados_bancarios", width: 350 },
            "Editar": { dataKey: "button", width: 130, click: edit, icon: EditIcon }
        }
    }, [])


    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="Funcionários PJ">
                <Employee.Header />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                <Employee.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} />
                <Employee.Edit open={open} setOpen={setOpen} />
            </MainPanel.Body>
        </MainPanel.Root>
    )
}
import { useToaster } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";

import { useContext, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { ColumnsInterface, EmployeesInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Global/Panel";
import { MainTable } from "../../components/Global/Table";
import { Employee } from "../../components/Employee";
import { AxiosError } from "axios";
import { MainMessage } from "../../components/Global/Message";
import { VacancyControl } from "../../components/VacancyControl";

interface Filter {
    status: string | null;
}


export default function VacanciesControls() {
    const { }: any = useContext(UserContext)
    const api = useApi()
    const toaster = useToaster()

    // FILTER
    const initialFilter = {
        status: null
    }
    const [filter, setFilter] = useState<Filter>({ ...initialFilter })
    const clear = () => {
        setFilter(initialFilter)
    }


    // DATA
    const searchData = async () => {
        const response = await api.get("employees/", { params: { ...filter } })

        let dataRes = response.data
        for (const line in dataRes) {
            if (Object.hasOwnProperty.call(dataRes, line)) {
                const element = dataRes[line];

                element["bank_details"] = `BCO: ${element.bank} | AG: ${element.agency} | CC: ${element.account}`
            }
        }

        return dataRes
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["employees"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
        enabled: false
    })


    // EDIT
    const [row, setRow] = useState<EmployeesInterface>()
    const [openEdit, setOpenEdit] = useState(false)
    const modalEdit = (rowData: any) => {
        let row_ = { ...rowData }

        setRow(row_)
        setOpenEdit(true)
    }


    // TABLE
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Título da Vaga": { dataKey: "name", propsColumn: { width: 200, fullText: true } },
            "Cargo": { dataKey: "name", propsColumn: { width: 200, fullText: true } },
            "Departamento": { dataKey: "bank_details", propsColumn: { width: 200, fullText: true } },
            "Filial": { dataKey: "branch.abbreviation", propsColumn: { width: 100 } },
            "Status": { dataKey: "status", propsColumn: { width: 130 } },
            "Visualizar": { dataKey: "button", propsColumn: { width: 80 }, click: modalEdit, icon: EditIcon },
            "Editar": { dataKey: "button", propsColumn: { width: 80 }, click: modalEdit, icon: EditIcon }
        }
    }, [])


    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="Controle de Vagas">
                <VacancyControl.Header />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} defaultExpanded={false} >
                <VacancyControl.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} />
                <Employee.Edit open={openEdit} setOpen={setOpenEdit} row={row} setRow={setRow} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
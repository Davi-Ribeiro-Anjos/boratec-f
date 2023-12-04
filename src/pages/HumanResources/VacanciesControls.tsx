import { useToaster } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";

import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useApi } from "../../hooks/Api";
import { ColumnsInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Global/Panel";
import { MainTable } from "../../components/Global/Table";
import { AxiosError } from "axios";
import { MainMessage } from "../../components/Global/Message";
import { VacancyControl } from "../../components/HumanResource/VacancyControl";
import { StringToDate } from "../../services/Date";

interface Filter {
    status: string | null;
    author__name__contains: string | null;
}


export default function VacanciesControls() {
    const api = useApi()
    const toaster = useToaster()

    // FILTER
    const initialFilter = {
        status: null,
        author__name__contains: null,
    }
    const [filter, setFilter] = useState<Filter>({ ...initialFilter })
    const clear = () => {
        setFilter(initialFilter)
    }


    // DATA
    const searchData = async () => {
        const response = await api.get("vacancies/", { params: { ...filter } })

        return response.data
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["vacancies"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
        enabled: true
    })


    // TABLE
    const [row, setRow] = useState({})
    const [openEdit, setOpenEdit] = useState(false)
    const modalEdit = (rowData: any) => {
        let row_ = { ...rowData }

        row_.author = row_.author.name
        row_.branch = row_.branch.id
        row_.role = row_.role.id
        row_.date_expected_start = StringToDate(row_.date_expected_start, true)
        row_.date_requested = StringToDate(row_.date_requested, true)

        if (row_.date_limit) row_.date_limit = StringToDate(row_.date_limit, true)
        if (row_.date_closed) row_.date_closed = StringToDate(row_.date_closed, true)
        if (row_.date_vetta) row_.date_vetta = StringToDate(row_.date_vetta, true)
        if (row_.date_exam) row_.date_exam = StringToDate(row_.date_exam, true)

        setRow(row_)
        setOpenEdit(true)

        // let names = ""
        // if (!row_.email_send_manager) names += "Gestor, "
        // if (!row_.email_send_regional_manager) names += "Gestor Regional, "
        // if (!row_.email_send_rh) names += "Gerente RH, "
        // if (!row_.email_send_director) names += "Diretor, "

        // if (names.split(",").length > 1) MainMessage.Info(toaster, `Os e-mails de ${names}ainda não foram enviados.`, 7000)
        // else if (names) MainMessage.Info(toaster, `O e-mail do ${names}ainda não foi enviado.`, 7000)
        // else MainMessage.Info(toaster, "Todos os e-mails foram enviados.", 7000)
    }
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Solicitante": { dataKey: "author.name", propsColumn: { width: 300, fullText: true } },
            "Responsavel": { dataKey: "recruiter", propsColumn: { width: 250, fullText: true } },
            "Cargo": { dataKey: "role.name", propsColumn: { width: 300, fullText: true } },
            "Status": { dataKey: "status", propsColumn: { width: 130 } },
            "Empresa": { dataKey: "company", propsColumn: { width: 100 } },
            "Filial": { dataKey: "branch.abbreviation", propsColumn: { width: 100 } },
            "Editar": { dataKey: "button", propsColumn: { width: 80 }, click: modalEdit, icon: EditIcon }
        }
    }, [])


    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="Controle de Vagas">
                <VacancyControl.Header filter={filter} />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} defaultExpanded={false} >
                <VacancyControl.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={columns} isLoading={isLoading} />
            </MainPanel.Body>

            <VacancyControl.Edit open={openEdit} setOpen={setOpenEdit} row={row} setRow={setRow} />

        </MainPanel.Root>
    )
}
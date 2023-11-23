import { useToaster } from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import SearchIcon from '@rsuite/icons/Search';

import { useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { ColumnsInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Global/Panel";
import { MainTable } from "../../components/Global/Table";
import { AxiosError } from "axios";
import { MainMessage } from "../../components/Global/Message";
import { VacancyControl } from "../../components/VacancyControl";
import { StringToDate } from "../../services/Date";

interface Filter {
    status: string | null;
}


export default function VacanciesControls() {
    const { verifyPermission }: any = useContext(UserContext)
    const api = useApi()
    const toaster = useToaster()

    const getRoles = async () => {
        const response = await api.get('roles/')

        return response.data.map((item: any) => ({ label: item.name, value: item.id }))
    }
    const { data: RolesChoices } = useQuery({
        queryKey: ["roles-choices"],
        queryFn: getRoles,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
        enabled: true
    })

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
    const [showColumn, setShowColumn] = useState<any>({})
    const [row, setRow] = useState({})
    const [openEdit, setOpenEdit] = useState(false)
    const modalEdit = (rowData: any) => {
        let row_ = { ...rowData }

        if (row_.recruiter) row_.recruiter = row_.recruiter.id
        row_.branch = row_.branch.id
        row_.role = row_.role.id
        row_.date_expected_start = StringToDate(row_.date_expected_start)
        row_.date_reported = StringToDate(row_.date_reported)

        setRow(row_)
        setOpenEdit(true)

        let names = ""
        if (!row_.email_send_manager) names += "Gestor, "
        if (!row_.email_send_regional_manager) names += "Gestor Regional, "
        if (!row_.email_send_rh) names += "Gerente RH, "
        if (!row_.email_send_director) names += "Diretor, "

        if (names.split(",").length > 1) MainMessage.Info(toaster, `Os e-mails de ${names}ainda não foram enviados.`, 7000)
        else if (names) MainMessage.Info(toaster, `O e-mail do ${names}ainda não foi enviado.`, 7000)
        else MainMessage.Info(toaster, "Todos os e-mails foram enviados.", 7000)
    }
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Solicitante": { dataKey: "author.name", propsColumn: { width: 300, fullText: true } },
            "Cargo": { dataKey: "role.name", propsColumn: { width: 300, fullText: true } },
            "Status": { dataKey: "status", propsColumn: { width: 130 } },
            "Empresa": { dataKey: "company", propsColumn: { width: 100 } },
            "Filial": { dataKey: "branch.abbreviation", propsColumn: { width: 100 } },
        }
    }, [])
    const view = useMemo<ColumnsInterface>(() => {
        return {
            "Visualizar": { dataKey: "button", propsColumn: { width: 80 }, click: modalEdit, icon: SearchIcon },
        }
    }, [])
    const edit = useMemo<ColumnsInterface>(() => {
        return {
            "Editar": { dataKey: "button", propsColumn: { width: 80 }, click: modalEdit, icon: EditIcon }
        }
    }, [])

    useEffect(() => {
        setShowColumn(() => {
            return data && data.length > 0 &&
                (verifyPermission("employee_vacancy_admin") && { ...columns, ...edit }) ||
                { ...columns, ...view }
        })
    }, [data])


    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="Controle de Vagas">
                <VacancyControl.Header RolesChoices={RolesChoices} />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} defaultExpanded={false} >
                <VacancyControl.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={showColumn} isLoading={isLoading} />
            </MainPanel.Body>

            <VacancyControl.Edit open={openEdit} setOpen={setOpenEdit} row={row} setRow={setRow} RolesChoices={RolesChoices} />

        </MainPanel.Root>
    )
}
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
import { VacancyOpen } from "../../components/HumanResource/VacancyOpen";
import { StringToDate } from "../../services/Date";

interface Filter {
    status: string | null;
    author: number | undefined;
    author__name__contains: string;
}


export default function VacanciesOpen() {
    const { me, verifyPermission }: any = useContext(UserContext)
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
        status: null,
        author: me.id,
        author__name__contains: ""
    }
    const [filter, setFilter] = useState<Filter>({ ...initialFilter })
    const clear = () => {
        setFilter(initialFilter)
    }


    // DATA
    const searchData = async () => {
        let filter_ = { ...filter }

        if (verifyPermission("employee_vacancy_admin")) delete filter_.author

        const response = await api.get("vacancies/", { params: filter_ })

        let dataRes = response.data

        const today: any = new Date()

        for (const key in dataRes) {
            if (Object.prototype.hasOwnProperty.call(dataRes, key)) {
                let vacancy = dataRes[key]

                if (vacancy.date_limit) vacancy.date_limit = StringToDate(vacancy.date_limit, true)

                vacancy.opened = null

                if (vacancy.date_limit && vacancy.date_limit < today) {
                    vacancy.alert = "EM ATRASO"
                    vacancy.opened = Math.abs(Math.trunc((vacancy.date_limit - today) / (1000 * 60 * 60 * 24)))
                }
                else vacancy.alert = "NO PRAZO"
            }
        }

        return dataRes
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
        row_.date_requested = StringToDate(row_.date_requested)

        if (!row_.email_send_manager) row_.approval_manager = "NÃO ENVIADO"
        if (!row_.email_send_regional_manager) row_.approval_regional_manager = "NÃO ENVIADO"
        if (!row_.email_send_rh) row_.approval_rh = "NÃO ENVIADO"
        if (!row_.email_send_director) row_.approval_director = "NÃO ENVIADO"

        setRow(row_)
        setOpenEdit(true)
    }
    const columns = useMemo<ColumnsInterface>(() => {
        return {
            "Solicitante": { dataKey: "author.name", propsColumn: { width: 230, fullText: true } },
            "Responsavel": { dataKey: "recruiter", propsColumn: { width: 170, fullText: true } },
            "Cargo": { dataKey: "role.name", propsColumn: { width: 170, fullText: true } },
            "Status": { dataKey: "status", propsColumn: { width: 130 } },
            "Empresa": { dataKey: "company", propsColumn: { width: 100 } },
            "Filial": { dataKey: "branch.abbreviation", propsColumn: { width: 100 } },
            "Alerta": { dataKey: "alert", propsColumn: { width: 100 } },
            "Dias em Aberto": { dataKey: "opened", propsColumn: { width: 110 } },
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

            <MainPanel.Header title="Abertura de Vagas">
                <VacancyOpen.Header RolesChoices={RolesChoices} />
            </MainPanel.Header>

            <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} defaultExpanded={false} >
                <VacancyOpen.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter>

            <MainPanel.Body>
                <MainTable.Root data={data ? data : []} columns={showColumn} isLoading={isLoading} />
            </MainPanel.Body>

            <VacancyOpen.Edit open={openEdit} setOpen={setOpenEdit} row={row} setRow={setRow} RolesChoices={RolesChoices} />

        </MainPanel.Root>
    )
}
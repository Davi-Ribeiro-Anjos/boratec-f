import { useToaster } from "rsuite";
// import EditIcon from "@rsuite/icons/Edit";

import { useContext, useState } from "react";
import { useQuery } from "react-query";

import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
// import { EmployeesInterface } from "../../services/Interfaces";

import { MainPanel } from "../../components/Global/Panel";
// import { MainTable } from "../../components/Table";
// import { Employee } from "../../components/Employee";
import { AxiosError } from "axios";
import { MainMessage } from "../../components/Global/Message";
// import { StringToDate } from "../../services/Date";
import { Xml } from "../../components/Xml";


export default function Xmls() {
    const { }: any = useContext(UserContext)
    const api = useApi()
    const toaster = useToaster()


    // DATA
    const searchData = async () => {
        const response = await api.get("employees/")

        let dataRes = response.data
        for (const line in dataRes) {
            if (Object.hasOwnProperty.call(dataRes, line)) {
                const element = dataRes[line];

                element["bank_details"] = `BCO: ${element.bank} | AG: ${element.agency} | CC: ${element.account}`
            }
        }

        return dataRes
    }
    const { data, isLoading } = useQuery({
        queryKey: ["xmls"],
        queryFn: searchData,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
        },
        enabled: false
    })


    // TABLE
    const [checkedKeys, setCheckedKeys] = useState([])


    return (
        <MainPanel.Root shaded>

            <MainPanel.Header title="XMLS">
                <Xml.Header />
            </MainPanel.Header>

            {/* <MainPanel.Filter filter={filter} setFilter={setFilter} refetch={refetch} >
                <Employee.Filter />
                <MainPanel.FilterFooter clear={clear} />
            </MainPanel.Filter> */}

            <br />
            <br />

            <MainPanel.Body>
                <Xml.Table data={data ? data : []} isLoading={isLoading} checkedKeys={checkedKeys} setCheckedKeys={setCheckedKeys} />
            </MainPanel.Body>

        </MainPanel.Root>
    )
}
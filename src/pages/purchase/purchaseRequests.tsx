import { MainPanel } from "../../components/Panel/index"
import { FilterPurchaseRequest } from "../../components/PurchaseRequest/FilterPurchaseRequest"
import { HeaderPurchaseRequest } from "../../components/PurchaseRequest/HeaderPurchaseRequest"
import MainTable from "../../components/table"


export default function PurchaseRequests() {
    console.log("solicitacao compra")

    const clearFilter = () => {
        console.log("limpa")
    }

    return (
        <MainPanel.Root shaded>
            <MainPanel.Header title="Solicitações compras">
                <HeaderPurchaseRequest />
            </MainPanel.Header>
            <MainPanel.Filter clear={clearFilter}>
                <FilterPurchaseRequest />
            </MainPanel.Filter>
            <MainPanel.Body>
                {/* <MainTable> */}
            </MainPanel.Body>

            {/* <MainTable data={data} columns={columns} searchData={searchData} /> */}

        </MainPanel.Root>
    )
}
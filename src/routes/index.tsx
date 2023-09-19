import { Suspense, lazy, useContext } from "react";
import { Routes, Route } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

// import { getCookie } from "../services/Cookies.ts";
// import { Message, useToaster } from "rsuite";
import { UserContext } from "../providers/UserProviders.tsx";

const Home = lazy(() => import("../pages/Home/Home.tsx"));
const Login = lazy(() => import("../pages/Login/Login.tsx"));
const PalletsBranches = lazy(() => import("../pages/Pallets/PalletsBranches.tsx"));
const PalletsClients = lazy(() => import("../pages/Pallets/PalletsClients.tsx"));
const FleetsAvailabilities = lazy(() => import("../pages/Fleets/FleetsAvailabilities.tsx"));
const PurchaseRequests = lazy(() => import("../pages/Purchases/PurchasesRequests.tsx"));
const Employees = lazy(() => import("../pages/HumanResources/Employees/Employees.tsx"));
const EmployeesPayments = lazy(() => import("../pages/HumanResources/Employees/EmployeesPayments.tsx"));
const RegistrationsForms = lazy(() => import("../pages/HumanResources/RegistrationsForms.tsx"));
// const Xmls = lazy(() => import("../pages/Tools/Xmls.tsx"));
const EPIsRequests = lazy(() => import("../pages/Stocks/EPIsRequests.tsx"));
const EPIsControls = lazy(() => import("../pages/Stocks/EPIsControls.tsx"));
const QueriesNFs = lazy(() => import("../pages/Queries/QueriesNF.tsx"));
const Error404 = lazy(() => import("../pages/Errors/Error404.tsx"));
const Error403 = lazy(() => import("../pages/Errors/Error403.tsx"));


export function MainRoutes() {
    const { verifyPermissionPage }: any = useContext(UserContext)
    // const navigate = useNavigate()
    // const toaster = useToaster()

    return (
        <Routes>
            <Route path="/" element={
                <Suspense>
                    <Home />
                </Suspense>
            } />
            <Route path="/login" element={
                <Suspense>
                    <Login />
                </Suspense>
            } />
            <Route path="/compras/solicitacoes-compras" element={
                verifyPermissionPage("purchase_request") && (
                    <Suspense>
                        <PurchaseRequests />
                    </Suspense>
                )
            } />
            <Route path="/paletes/filiais" element={
                verifyPermissionPage("pallet_branch") && (
                    <Suspense>
                        <PalletsBranches />
                    </Suspense>
                )
            } />
            <Route path="/paletes/clientes" element={
                verifyPermissionPage("pallet_client") && (
                    <Suspense>
                        <PalletsClients />
                    </Suspense>
                )
            } />
            <Route path="/frotas/disponibilidades" element={
                verifyPermissionPage("fleet_availability") && (
                    <Suspense>
                        <FleetsAvailabilities />
                    </Suspense>
                )
            } />
            <Route path="/rh/fichas-cadastrais" element={
                verifyPermissionPage("employee") && (
                    <Suspense>
                        <RegistrationsForms />
                    </Suspense>
                )
            } />
            <Route path="/rh/funcionarios-pj" element={
                verifyPermissionPage("employee") && (
                    <Suspense>
                        <Employees />
                    </Suspense>
                )
            } />
            <Route path="/rh/funcionarios-pj/pagamentos" element={
                verifyPermissionPage("employee") && (
                    <Suspense>
                        <EmployeesPayments />
                    </Suspense>
                )
            } />
            {/* <Route path="/ferramentas/xmls" element={
                verifyPermissionPage("xml") && (
                    <Suspense>
                        <Xmls />
                    </Suspense>
                )
            } /> */}
            <Route path="/estoques/epis/solicitacoes" element={
                verifyPermissionPage("stocks_epis") && (
                    <Suspense>
                        <EPIsRequests />
                    </Suspense>
                )
            } />
            <Route path="/estoques/epis/controles" element={
                verifyPermissionPage("stocks_epis") && (
                    <Suspense>
                        <EPIsControls />
                    </Suspense>
                )
            } />
            <Route path="/consultas/nf" element={
                <Suspense>
                    <QueriesNFs />
                </Suspense>
            } />
            <Route path="/sem-permissao" element={
                <Suspense>
                    <Error403 />
                </Suspense>
            } />
            <Route path="*" element={
                <Suspense>
                    <Error404 />
                </Suspense>
            } />
        </Routes>
    )
}
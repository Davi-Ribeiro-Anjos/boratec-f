import { Suspense, lazy, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { UserContext } from "../providers/UserProviders.tsx";

import Home from "../pages/Home/Home.tsx";
import Error404 from "../pages/Errors/Error404.tsx";
import Error403 from "../pages/Errors/Error403.tsx";
import Login from "../pages/Login/Login.tsx";
// import ForgetPassword from "../pages/Login/ForgetPassword.tsx";

// const Login = lazy(() => import("../pages/Login/Login.tsx"));
// const ForgetPassword = lazy(() => import("../pages/Login/ForgetPassword.tsx"));
const PalletsBranches = lazy(() => import("../pages/Pallets/PalletsBranches.tsx"));
const PalletsClients = lazy(() => import("../pages/Pallets/PalletsClients.tsx"));
const FleetsAvailabilities = lazy(() => import("../pages/Fleets/FleetsAvailabilities.tsx"));
const PurchaseRequests = lazy(() => import("../pages/Purchases/PurchasesRequests.tsx"));
const Employees = lazy(() => import("../pages/HumanResources/Employees.tsx"));
const EmployeesPayments = lazy(() => import("../pages/HumanResources/EmployeesServices/EmployeesPayments.tsx"));
const EmployeesThirteenths = lazy(() => import("../pages/HumanResources/EmployeesServices/EmployeesThirteenths.tsx"));
const RegistrationsForms = lazy(() => import("../pages/HumanResources/RegistrationsForms.tsx"));
// const VacanciesControls = lazy(() => import("../pages/HumanResources/VacanciesControls.tsx"));
const Xmls = lazy(() => import("../pages/Tools/Xmls.tsx"));
const EPIsRequests = lazy(() => import("../pages/Stocks/EPIsRequests.tsx"));
const EPIsControls = lazy(() => import("../pages/Stocks/EPIsControls.tsx"));
const Justifications = lazy(() => import("../pages/Commercials/Justifications/Justifications.tsx"));
const JustificationsConfirmed = lazy(() => import("../pages/Commercials/Justifications/JustificationsConfirmed.tsx"));
const Performances = lazy(() => import("../pages/Commercials/Performances.tsx"));
const QueriesNFs = lazy(() => import("../pages/Queries/QueriesNF.tsx"));
const Manuals = lazy(() => import("../pages/Queries/Manuals.tsx"));


export function MainRoutes() {
    const { verifyPermissionPage }: any = useContext(UserContext)

    return (
        <Routes>
            <Route path="/" element={
                <Suspense>
                    <Home />
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
            <Route path="/rh/funcionarios-pj" element={
                verifyPermissionPage("employee_admin") && (
                    <Suspense>
                        <Employees />
                    </Suspense>
                )
            } />
            <Route path="/rh/funcionarios-pj/pagamentos" element={
                verifyPermissionPage("employee_admin") && (
                    <Suspense>
                        <EmployeesPayments />
                    </Suspense>
                )
            } />
            <Route path="/rh/funcionarios-pj/decimos-terceiros" element={
                verifyPermissionPage("employee_admin") && (
                    <Suspense>
                        <EmployeesThirteenths />
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
            {/* <Route path="/rh/controles-vagas" element={
                verifyPermissionPage("employee_vacancy") && (
                    <Suspense>
                        <VacanciesControls />
                    </Suspense>
                )
            } /> */}
            {/* <Route path="/rh/funcionarios-pj/contratos" element={
                verifyPermissionPage("employee_admin") && (
                    <Suspense>
                        <EmployeesPayments />
                    </Suspense>
                )
            } /> */}
            <Route path="/ferramentas/xmls" element={
                verifyPermissionPage("xml") && (
                    <Suspense>
                        <Xmls />
                    </Suspense>
                )
            } />
            <Route path="/estoques/epis/solicitacoes" element={
                verifyPermissionPage("stock_epi") && (
                    <Suspense>
                        <EPIsRequests />
                    </Suspense>
                )
            } />
            <Route path="/estoques/epis/controles" element={
                verifyPermissionPage("stock_epi_admin") && (
                    <Suspense>
                        <EPIsControls />
                    </Suspense>
                )
            } />
            <Route path="/comercial/justificativas/" element={
                verifyPermissionPage("delivery_history") && (
                    <Suspense>
                        <Justifications />
                    </Suspense>
                )
            } />
            <Route path="/comercial/justificativas/confirmar" element={
                verifyPermissionPage("delivery_history_admin") && (
                    <Suspense>
                        <JustificationsConfirmed />
                    </Suspense>
                )
            } />
            <Route path="/comercial/performance" element={
                verifyPermissionPage("delivery_history") && (
                    <Suspense>
                        <Performances />
                    </Suspense>
                )
            } />
            <Route path="/consultas/nf" element={
                <Suspense>
                    <QueriesNFs />
                </Suspense>
            } />
            <Route path="/consultas/manuais" element={
                <Suspense>
                    <Manuals />
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

export function NoPermissionRoutes() {
    return (
        <Routes>
            <Route path="/" element={
                <Login />
            } />
            <Route path="/login" element={
                <Suspense>
                    <Login />
                </Suspense>
            } />
            {/* <Route path="/recuperar-senha" element={
                <ForgetPassword />
            } /> */}
            <Route path="*" element={
                <Error404 name="Login" />
            } />
        </Routes>
    )
}
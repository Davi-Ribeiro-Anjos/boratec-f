import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { UserContext } from "../providers/UserProviders.tsx";

import Home from "../pages/Home/Home.tsx";
import Login from "../pages/Login/Login.tsx";
import PalletsBranches from "../pages/Pallets/PalletsBranches.tsx";
import PalletsClients from "../pages/Pallets/PalletsClients.tsx";
import FleetsAvailabilities from "../pages/Fleets/FleetsAvailabilities.tsx";
import PurchaseRequests from "../pages/Purchases/PurchasesRequests.tsx";
import Employees from "../pages/HumanResources/Employees/Employees.tsx";
import EmployeesPayments from "../pages/HumanResources/Employees/EmployeesPayments.tsx";
import RegistrationsForms from "../pages/HumanResources/RegistrationsForms.tsx";
import Xmls from "../pages/Tools/Xmls.tsx";
import EPIsRequests from "../pages/Stocks/EPIsRequests.tsx";
import EPIsControls from "../pages/Stocks/EPIsControls.tsx";
import QueriesNFs from "../pages/Queries/QueriesNF.tsx";
import Error404 from "../pages/Errors/Error404.tsx";
import Error403 from "../pages/Errors/Error403.tsx";


export function MainRoutes() {
    const { verifyPermissionPage }: any = useContext(UserContext)

    return (
        <Routes>
            <Route path="/" element={
                <Home />
            } />
            <Route path="/login" element={
                <Login />
            } />
            <Route path="/compras/solicitacoes-compras" element={
                verifyPermissionPage("purchase_request") && (
                    <PurchaseRequests />
                )
            } />
            <Route path="/paletes/filiais" element={
                verifyPermissionPage("pallet_branch") && (
                    <PalletsBranches />
                )
            } />
            <Route path="/paletes/clientes" element={
                verifyPermissionPage("pallet_client") && (
                    <PalletsClients />
                )
            } />
            <Route path="/frotas/disponibilidades" element={
                verifyPermissionPage("fleet_availability") && (
                    <FleetsAvailabilities />
                )
            } />
            <Route path="/rh/fichas-cadastrais" element={
                verifyPermissionPage("employee") && (
                    <RegistrationsForms />
                )
            } />
            <Route path="/rh/funcionarios-pj" element={
                verifyPermissionPage("employee") && (
                    <Employees />
                )
            } />
            <Route path="/rh/funcionarios-pj/pagamentos" element={
                verifyPermissionPage("employee") && (
                    <EmployeesPayments />
                )
            } />
            <Route path="/ferramentas/xmls" element={
                verifyPermissionPage("xml") && (
                    <Xmls />
                )
            } />
            <Route path="/estoques/epis/solicitacoes" element={
                verifyPermissionPage("stocks_epis") && (
                    <EPIsRequests />
                )
            } />
            <Route path="/estoques/epis/controles" element={
                verifyPermissionPage("stocks_epis_admin") && (
                    <EPIsControls />
                )
            } />
            <Route path="/consultas/nf" element={
                <QueriesNFs />
            } />
            <Route path="/sem-permissao" element={
                <Error403 />
            } />
            <Route path="*" element={
                <Error404 />
            } />
        </Routes>
    )
}
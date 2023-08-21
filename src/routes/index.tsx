import { Suspense, lazy, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { getCookie } from "../services/Cookies.ts";
import { Message, useToaster } from "rsuite";
import { UserContext } from "../providers/UserProviders.tsx";

const Home = lazy(() => import("../pages/home.tsx"));
const Login = lazy(() => import("../pages/Login/Login.tsx"));
const BranchesPallets = lazy(() => import("../pages/Pallets/BranchesPallets.tsx"));
const ClientsPallets = lazy(() => import("../pages/Pallets/ClientsPallets.tsx"));
const FleetsAvailabilities = lazy(() => import("../pages/Fleets/FleetsAvailabilities.tsx"));
const RegistrationsForms = lazy(() => import("../pages/HumanResources/RegistrationsForms.tsx"));
const PurchaseRequests = lazy(() => import("../pages/Purchases/PurchasesRequests.tsx"));
const Employees = lazy(() => import("../pages/HumanResources/Employees.tsx"));
const QueriesNFs = lazy(() => import("../pages/Queries/QueriesNF.tsx"));
const Error404 = lazy(() => import("../pages/Errors/Error404.tsx"));
const Error403 = lazy(() => import("../pages/Errors/Error403.tsx"));


export function MainRoutes() {
    console.log("route")

    const { verifyPermission }: any = useContext(UserContext)
    const navigate = useNavigate()
    const toaster = useToaster()

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
                verifyPermission("purchase_request") ? (
                    <Suspense>
                        <PurchaseRequests />
                    </Suspense>
                ) : (
                    <Suspense>
                        <Error403 />
                    </Suspense>
                )
            } />
            <Route path="/paletes/filiais" element={
                verifyPermission("pallet_branch") ? (
                    <Suspense>
                        <BranchesPallets />
                    </Suspense>
                ) : (
                    <Suspense>
                        <Error403 />
                    </Suspense>
                )
            } />
            <Route path="/paletes/clientes" element={
                verifyPermission("pallet_client") ? (
                    <Suspense>
                        <ClientsPallets />
                    </Suspense>
                ) : (
                    <Suspense>
                        <Error403 />
                    </Suspense>
                )
            } />
            <Route path="/frotas/disponibilidades" element={
                verifyPermission("fleet_availability") ? (
                    <Suspense>
                        <FleetsAvailabilities />
                    </Suspense>
                ) : (
                    <Suspense>
                        <Error403 />
                    </Suspense>
                )
            } />
            <Route path="/rh/fichas-cadastrais" element={
                verifyPermission("employee") ? (
                    <Suspense>
                        <RegistrationsForms />
                    </Suspense>
                ) : (
                    <Suspense>
                        <Error403 />
                    </Suspense>
                )
            } />
            <Route path="/rh/funcionarios-pj" element={
                verifyPermission("employee") ? (
                    <Suspense>
                        <Employees />
                    </Suspense>
                ) : (
                    <Suspense>
                        <Error403 />
                    </Suspense>
                )
            } />
            <Route path="/consultas/nf" element={
                verifyPermission("nf") ? (
                    <Suspense>
                        <QueriesNFs />
                    </Suspense>
                ) : (
                    <Suspense>
                        <Error403 />
                    </Suspense>
                )
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
import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { getCookie } from "../services/Cookies.ts";
import { Message, useToaster } from "rsuite";

const Home = lazy(() => import("../pages/home.tsx"));
const Login = lazy(() => import("../pages/Login/Login.tsx"));
const BranchesPallets = lazy(() => import("../pages/Pallets/BranchesPallets.tsx"));
const ClientsPallets = lazy(() => import("../pages/Pallets/ClientsPallets.tsx"));
const FleetsAvailabilities = lazy(() => import("../pages/Fleets/FleetsAvailabilities.tsx"));
const RegistrationsForms = lazy(() => import("../pages/HumanResources/RegistrationsForms.tsx"));
const PurchaseRequests = lazy(() => import("../pages/Purchases/PurchasesRequests.tsx"));
const Employees = lazy(() => import("../pages/HumanResources/Employees.tsx"));
const QueriesNFs = lazy(() => import("../pages/Queries/QueriesNF.tsx"));


export function MainRoutes() {
    console.log("route")

    const navigate = useNavigate()
    const toaster = useToaster()

    useEffect(() => {
        async function checkTokenAndNavigate() {
            const cookie = await getCookie("token_access");
            if (cookie === undefined) {
                navigate("/login");
                let message = (
                    <Message showIcon type="info" closable >
                        Sua sessão foi encerrada.
                    </ Message>
                )
                toaster.push(message, { placement: "topEnd", duration: 4000 })
            }
        }

        checkTokenAndNavigate();
    }, [])

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
                <Suspense>
                    <PurchaseRequests />
                </Suspense>
            } />
            <Route path="/paletes/filiais" element={
                <Suspense>
                    <BranchesPallets />
                </Suspense>
            } />
            <Route path="/paletes/clientes" element={
                <Suspense>
                    <ClientsPallets />
                </Suspense>
            } />
            <Route path="/frotas/disponibilidades" element={
                <Suspense>
                    <FleetsAvailabilities />
                </Suspense>
            } />
            <Route path="/rh/fichas-cadastrais" element={
                <Suspense>
                    <RegistrationsForms />
                </Suspense>
            } />
            <Route path="/rh/funcionarios-pj" element={
                <Suspense>
                    <Employees />
                </Suspense>
            } />
            <Route path="/consultas/nf" element={
                <Suspense>
                    <QueriesNFs />
                </Suspense>
            } />
        </Routes>
    )
}
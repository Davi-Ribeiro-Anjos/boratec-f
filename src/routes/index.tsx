import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { getCookie } from "../services/Cookies.ts";

const Home = lazy(() => import("../pages/home.tsx"));
const Login = lazy(() => import("../pages/Login/Login.tsx"));
const PurchaseRequests = lazy(() => import("../pages/Purchase/PurchaseRequests.tsx"));
const BranchPallet = lazy(() => import("../pages/Pallet/BranchPallet.tsx"));
const ClientPallet = lazy(() => import("../pages/Pallet/ClientPallet.tsx"));
const Dismissal = lazy(() => import("../pages/Pallet/ClientPallet.tsx"));
const RegistrationForm = lazy(() => import("../pages/Pallet/ClientPallet.tsx"));
const Employee = lazy(() => import("../pages/Pallet/ClientPallet.tsx"));


export function MainRoutes() {
    console.log("route")

    const navigate = useNavigate()

    useEffect(() => {
        async function checkTokenAndNavigate() {
            const cookie = await getCookie("token_access");
            if (cookie === undefined) {
                navigate("/login");
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
                    <BranchPallet />
                </Suspense>
            } />
            <Route path="/paletes/clientes" element={
                <Suspense>
                    <ClientPallet />
                </Suspense>
            } />
            <Route path="/rh/demissoes" element={
                <Suspense>
                    <Dismissal />
                </Suspense>
            } />
            <Route path="/rh/fichas-cadastrais" element={
                <Suspense>
                    <RegistrationForm />
                </Suspense>
            } />
            <Route path="/rh/funcionarios-pj" element={
                <Suspense>
                    <Employee />
                </Suspense>
            } />
        </Routes>
    )
}
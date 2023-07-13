import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/home.tsx"));
const Login = lazy(() => import("../pages/login.tsx"));
const PurchaseRequests = lazy(() => import("../pages/purchase/purchaseRequests.tsx"));
const BranchPallet = lazy(() => import("../pages/pallet/branchPallet.tsx"));
const ClientPallet = lazy(() => import("../pages/pallet/clientPallet.tsx"));
const Dismissal = lazy(() => import("../pages/pallet/clientPallet.tsx"));
const RegistrationForm = lazy(() => import("../pages/pallet/clientPallet.tsx"));
const Employee = lazy(() => import("../pages/pallet/clientPallet.tsx"));


export function MainRoutes() {
    console.log("route")

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
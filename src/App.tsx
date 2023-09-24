import { CustomProvider } from 'rsuite';
import ptBr from 'rsuite/locales/pt_BR';

import { useContext } from "react"

import { UserContext } from './providers/UserProviders';
import { ThemeContext } from './providers/ThemeProviders';

import { MainRoutes } from "./routes"
import { MainHeader } from './components/Header';
import Login from './pages/Login/Login';
import { MainSideHeader } from './components/SideHeader';


export function App() {
    const { me }: any = useContext(UserContext)
    const { theme }: any = useContext(ThemeContext)

    return (
        <CustomProvider theme={theme} locale={ptBr}>
            {me ? (
                <>
                    {window.innerWidth > 400 ? <MainHeader /> : <MainSideHeader />}
                    <MainRoutes />
                </>
            ) : <Login />
            }
        </CustomProvider >
    )
}

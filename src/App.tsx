import { CustomProvider } from 'rsuite';
import ptBr from 'rsuite/locales/pt_BR';

import { useContext } from "react"

import { UserContext } from './providers/UserProviders';

import { MainRoutes } from "./routes"
import { MainHeader } from './components/Header';
import Login from './pages/Login/Login';


export function App() {
  console.log('app')

  const { me }: any = useContext(UserContext)

  return (
    <CustomProvider theme="dark" locale={ptBr}>
      {me ? (
        <>
          <MainHeader />
          <MainRoutes />
        </>
      ) : <Login />}
    </CustomProvider>
  )
}

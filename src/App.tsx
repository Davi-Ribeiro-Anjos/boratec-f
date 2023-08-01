import { CustomProvider } from 'rsuite';
import ptBr from 'rsuite/locales/pt_BR';

import { MainRoutes } from "./routes"
import { MainHeader } from './components/Header';


export function App() {
  console.log('app')

  return (
    <CustomProvider theme="dark" locale={ptBr}>
      <MainHeader />
      <MainRoutes />
    </CustomProvider>
  )
}

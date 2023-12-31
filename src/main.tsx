import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'

import './main.css'
import 'rsuite/dist/rsuite.min.css';

import { App } from './App.tsx'
import { queryClient } from './services/QueryClient'
import { IndexProvider } from './providers/IndexProviders';


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient} >
    <BrowserRouter>
      <IndexProvider>
        <App />
      </IndexProvider>
    </BrowserRouter>
  </QueryClientProvider>
  // </StrictMode>,
)

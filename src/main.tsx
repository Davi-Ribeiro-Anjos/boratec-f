/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'

import './main.css'
import 'rsuite/dist/rsuite.min.css';

import { App } from './App.tsx'
import { queryClient } from './services/QueryClient.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient} >
      <App />
    </QueryClientProvider>
  </BrowserRouter>
  // </StrictMode>,
)

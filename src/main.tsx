/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import { App } from './App.tsx'
import './main.css'
import 'rsuite/dist/rsuite.min.css';

import { QueryClientProvider } from 'react-query'
import { queryClient } from './services/queryClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient} >
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)

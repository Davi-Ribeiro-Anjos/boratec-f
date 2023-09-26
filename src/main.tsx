import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'

import './main.css'
import 'rsuite/dist/rsuite.min.css';

import { App } from './App.tsx'
import { queryClient } from './services/QueryClient'
import { IndexProvider } from './providers/IndexProviders';

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://c838859d0dbd513fff7cb20e756aa189@o4505946776010752.ingest.sentry.io/4505946884538368",
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
    }),
    new Sentry.Replay(),
  ],
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

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

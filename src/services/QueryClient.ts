import { QueryClient } from "react-query";


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 5 * 60 * 1000,
        },
    },
});
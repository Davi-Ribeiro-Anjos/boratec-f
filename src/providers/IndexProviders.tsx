import { createContext, ReactNode } from "react";

import { UserProvider } from "./UserProviders";
import { ThemeProvider } from "./ThemeProviders";

interface IndexProviderProps {
    children: ReactNode;
}

export const IndexContext = createContext({});

export const IndexProvider = ({ children }: IndexProviderProps) => {
    return (
        <IndexContext.Provider value={{}}>
            <UserProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </UserProvider>
        </IndexContext.Provider>
    );
};
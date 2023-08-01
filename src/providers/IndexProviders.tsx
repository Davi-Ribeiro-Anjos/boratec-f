import { createContext, ReactNode } from "react";

import { UserProvider } from "./UserProviders";

interface IndexProviderProps {
    children: ReactNode;
}

export const IndexContext = createContext({});

export const IndexProvider = ({ children }: IndexProviderProps) => {
    console.log("index provider")

    return (
        <IndexContext.Provider value={{}}>
            <UserProvider>
                {children}
            </UserProvider>
        </IndexContext.Provider>
    );
};
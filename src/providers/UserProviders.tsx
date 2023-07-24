import { ReactNode, createContext, useEffect, useState } from "react";

import { api } from "../hooks/Api";

interface UserProviderProps {
    children: ReactNode;
}

interface UserChoices {
    label: string;
    value: number;
}

interface User {
    id: number;
    nome: string;
}

export const UserContext = createContext({});

export const UserProvider = ({ children }: UserProviderProps) => {
    console.log("usuario provider")

    const [userChoices, setUserChoices] = useState<UserChoices[]>([])

    useEffect(() => {
        getUsers()
        // eslint-disable-next-line
    }, []);

    const getUsers = async () => {
        await api.get('funcionarios/choices/').then((response) => {
            let res: User[] = response.data


            setUserChoices(res.map((item) => ({
                label: item.nome,
                value: item.id
            })))
        }).catch((error) => console.log(error))
    }

    return (
        <UserContext.Provider value={{ userChoices }}>
            {children}
        </UserContext.Provider>
    );
};
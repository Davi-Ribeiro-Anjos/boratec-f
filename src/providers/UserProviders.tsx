import { ReactNode, createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../hooks/Api";
import { getCookie } from "../services/Cookies";
import { TokenInterface } from "../services/Interfaces";

interface UserProviderProps {
    children: ReactNode;
}

interface UserChoices {
    label: string;
    value: number;
}

interface User {
    id: number;
    name: string;
}


export const UserContext = createContext({});

export const UserProvider = ({ children }: UserProviderProps) => {
    console.log("usuario provider")

    const navigate = useNavigate()

    const [userChoices, setUserChoices] = useState<UserChoices[]>([])
    const [token, setToken] = useState<TokenInterface>({
        accessToken: getCookie("token_access"),
        refreshToken: getCookie("token_refresh")
    })

    const api = useApi(token)

    useEffect(() => {
        refetch()
    }, []);

    const getUsers = async () => {
        return await api.get('employees/choices/')
    }

    const { refetch } = useQuery({
        queryKey: "userChoices",
        queryFn: getUsers,
        onSuccess: (response: AxiosResponse) => {
            let res: User[] = response.data

            setUserChoices(res.map((item) => ({
                label: item.name,
                value: item.id
            })))
        },
        onError: (error: AxiosError) => {
            if (error.request.status === 401) {
                navigate("/login")
            }
        },
        enabled: false
    })

    return (
        <UserContext.Provider value={{ userChoices, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};
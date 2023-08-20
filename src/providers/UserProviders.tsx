import { ReactNode, createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../hooks/Api";
import { getCookie } from "../services/Cookies";
import { MeInterface, TokenInterface } from "../services/Interfaces";

import jwt_decode from "jwt-decode";

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


    const [me, setMe] = useState<any>()
    const [userChoices, setUserChoices] = useState<UserChoices[]>([])
    const [token, setToken] = useState<TokenInterface>({
        accessToken: getCookie("token_access"),
        refreshToken: getCookie("token_refresh")
    })

    console.log(me)

    const api = useApi()

    useEffect(() => {
        refetch()

        if (getCookie("token_access")) {
            const access: any = jwt_decode(getCookie("token_access") || "")

            setMe(access.employee)
        }
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
        <UserContext.Provider value={{ me, setMe, userChoices, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};
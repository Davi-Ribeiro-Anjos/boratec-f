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

    const [me, setMe] = useState<MeInterface>()
    const [userChoices, setUserChoices] = useState<UserChoices[]>([])
    // const [token, setToken] = useState<TokenInterface>({
    //     accessToken: getCookie("token_access"),
    //     refreshToken: getCookie("token_refresh")
    // })

    console.log(me)

    const api = useApi()

    useEffect(() => {
        if (me) refetch()

        let token: string | null

        try {
            token = getCookie("token_access")
        } catch (error) {
            token = null
        }

        if (token) {
            const access: any = jwt_decode(token || "")

            setMe(access.employee)
        }
    }, []);

    const getPermissions = () => {
        let listPermission: string[] = []

        if (me) {
            for (const key in me.groups) {
                if (Object.prototype.hasOwnProperty.call(me.groups, key)) {
                    const permission = me.groups[key];
                    listPermission.push(permission.name)
                }
            }
        }

        return listPermission
    }

    const myPermissions = getPermissions()

    const verifyPermission = (name: string): boolean => {
        if (me) return (myPermissions.includes(name) || me.is_staff || me.is_superuser)

        return false
    }

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
        // <UserContext.Provider value={{ me, setMe, userChoices, token, setToken }}>
        <UserContext.Provider value={{ me, setMe, userChoices, verifyPermission }}>
            {children}
        </UserContext.Provider>
    );
};
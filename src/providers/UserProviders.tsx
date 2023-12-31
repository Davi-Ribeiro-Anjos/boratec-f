import { ReactNode, createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../hooks/Api";
import { eraseCookie, getCookie } from "../services/Cookies";
import { MeInterface } from "../services/Interfaces";

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
    const navigate = useNavigate()

    const [me, setMe] = useState<MeInterface>()
    const [userChoices, setUserChoices] = useState<UserChoices[]>([])

    useEffect(() => {
        if (me) GetUsersChoices()
    }, [me])

    useEffect(() => {
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
    }, [])

    const getUsers = async () => {
        const api = useApi()

        return await api.get('employees/choices/')
    }

    const { refetch: GetUsersChoices } = useQuery({
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
            if (error.request.status === 401 || error.request.status === 403) {
                navigate("/login")
            }
        },
        enabled: false
    })

    const logout = () => {
        eraseCookie("me")
        eraseCookie("token_access")
        eraseCookie("token_refresh")
        eraseCookie("sessionid")
        eraseCookie("csrftoken")

        setMe(undefined)
    }


    // PERMISSIONS
    const getPermissions = () => {
        let listPermission: string[] = []

        if (me) {
            for (const key in me.user.groups) {
                if (Object.prototype.hasOwnProperty.call(me.user.groups, key)) {
                    const permission = me.user.groups[key];
                    listPermission.push(permission.name)
                }
            }
        }

        return listPermission
    }
    const myPermissions = getPermissions()
    const verifyPermission = (name?: string): boolean => {
        if (me) return (myPermissions.includes(name || "") || me?.user.is_staff || me?.user.is_superuser)

        return false
    }
    const verifyPermissionPage = (name?: string): void | boolean => {
        if (me) return (myPermissions.includes(name || "") || me?.user.is_staff || me?.user.is_superuser)
        else navigate("/sem-permissao")
    }


    return (
        <UserContext.Provider value={{ me, setMe, userChoices, verifyPermission, verifyPermissionPage, logout, GetUsersChoices }}>
            {children}
        </UserContext.Provider>
    );
};
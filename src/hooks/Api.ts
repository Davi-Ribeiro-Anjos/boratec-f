import axios from "axios";
import { getCookie } from "../services/Cookies";


export const baseUrl = "http://127.0.0.1:8001"

export const useApi = (media?: boolean) => {
    let token: string | null

    try {
        token = getCookie("token_access")
    } catch (error) {
        token = null
    }

    let header: any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
    }
    if (token) {
        if (media) {
            header = { ...header, "Content-Type": "multipart/form-data;charset=UTF-8" }
        }

        header["Authorization"] = `Bearer ${token}`
    }

    return axios.create({
        baseURL: `${baseUrl}/api/`,
        timeout: 8000,
        headers: header
    })
}

import axios from "axios";
import { getCookie } from "../services/Cookies";

const dev = true

export const baseUrl = dev ? "http://127.0.0.1:8000" : "https://back.bora.tec.br"

export const useApi = (media?: boolean) => {
    let token: string | null

    try {
        token = getCookie("token_access")
    } catch (error) {
        token = null
    }

    let header: any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': baseUrl,
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
    if (token) {
        if (media) {
            header = { ...header, "Content-Type": "multipart/form-data" }
        }

        header["Authorization"] = `Bearer ${token}`
    }

    return axios.create({
        baseURL: `${baseUrl}/api/`,
        timeout: 20000,
        headers: header
    })
}

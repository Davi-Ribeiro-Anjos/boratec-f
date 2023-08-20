import axios from "axios";
import { getCookie } from "../services/Cookies";


export const baseUrl = "http://127.0.0.1:8000"

export const useApi = (media?: boolean) => {
    const token = getCookie("token_access")

    if (media) {
        let header: any = { "Content-Type": "multipart/form-data" }
        if (token) header["Authorization"] = `Bearer ${token}`

        return axios.create({
            baseURL: `${baseUrl}/api/`,
            timeout: 8000,
            headers: header
        })
    } else {
        let header: any = { "Content-Type": "application/json" }
        if (token) header["Authorization"] = `Bearer ${token}`

        return axios.create({
            baseURL: `${baseUrl}/api/`,
            timeout: 8000,
            headers: header
        })
    }
}

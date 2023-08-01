import axios from "axios";
import { TokenInterface } from "../services/Interfaces";


export const baseUrl = "http://127.0.0.1:8000"

export const useApi = (token?: TokenInterface, media?: boolean) => {
    if (media) {
        let header: any = { "Content-Type": "multipart/form-data" }
        if (token?.accessToken) header["Authorization"] = `Bearer ${token.accessToken}`
        return axios.create({
            baseURL: `${baseUrl}/api/`,
            timeout: 8000,
            headers: header
        })
    } else {
        let header: any = { "Content-Type": "application/json" }
        if (token?.accessToken) header["Authorization"] = `Bearer ${token.accessToken}`
        return axios.create({
            baseURL: `${baseUrl}/api/`,
            timeout: 8000,
            headers: header
        })
    }
}

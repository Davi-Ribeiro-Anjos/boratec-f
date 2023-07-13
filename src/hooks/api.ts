import axios from "axios";


export const urlBase = 'http://127.0.0.1:8000/'

export const api = axios.create({
    baseURL: `${urlBase}api/`,
    timeout: 8000,
    // headers: { 'Content-Type': 'multipart/form-data' }
})

export const apiMedia = axios.create({
    baseURL: urlBase,
    timeout: 8000,
    headers: { 'Content-Type': 'multipart/form-data' }
})
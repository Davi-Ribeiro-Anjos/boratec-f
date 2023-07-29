import axios from "axios";


export const baseUrl = 'http://127.0.0.1:8000/'

export const api = axios.create({
    baseURL: `${baseUrl}api/`,
    timeout: 8000,
    headers: { "Content-type": "application/json" }
})

export const apiMedia = axios.create({
    baseURL: `${baseUrl}api/`,
    timeout: 8000,
    headers: { 'Content-Type': 'multipart/form-data' }
})
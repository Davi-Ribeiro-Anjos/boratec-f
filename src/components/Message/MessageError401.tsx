import { Message, Toaster } from "rsuite"

import { AxiosError } from "axios";

import { useNavigate } from "react-router-dom"


export function MessageError401(toaster: Toaster, error: AxiosError) {

    const navigate = useNavigate()
    const data: any = error.response?.data
    const status: any = error.response?.status

    if (status === 401) {
        if (data.detail === "No active account found with the given credentials") {
            const message = (
                <Message showIcon type="error" closable >
                    Usuário ou Senha incorretas.
                </Message>
            )
            toaster.push(message, { placement: 'topEnd', duration: 6000 })
        }
        if (data.detail === "Given token not valid for any token type") {
            const message = (
                <Message showIcon type="error" closable >
                    Autenticação vencida, faça o login.
                </Message>
            )
            toaster.push(message, { placement: 'topEnd', duration: 6000 })

            navigate("/login")
        }
        if (data.detail === "Usuário e/ou senha incorreto(s)") {
            const message = (
                <Message showIcon type="error" closable >
                    Usuário e/ou senha incorreto(s)
                </Message>
            )
            toaster.push(message, { placement: 'topEnd', duration: 6000 })
        }
    }
}
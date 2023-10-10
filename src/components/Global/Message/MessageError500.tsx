import { Message, Toaster } from "rsuite"
import { AxiosError } from "axios"


export function MessageError500(toaster: Toaster, error: AxiosError, message?: string) {
    let status: any = error.response?.status

    if (status === 500) {
        const e: any = error.response?.data
        let m = (
            < Message showIcon type="error" closable >
                {message || e.message || "Erro - Ocorreu um erro."}
            </ Message>
        )
        toaster.push(m, { placement: 'topEnd', duration: 6000 })
    }
}
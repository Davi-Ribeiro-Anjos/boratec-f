import { Message } from "rsuite"


export function MessageError(toaster: any, error: any, listMessage?: any, message?: string, duration: number = 6000) {
    let status: any = error.response.status
    let listError: any[] = error.response.data

    if (!listMessage && message) {
        toaster.push(message, { placement: 'topEnd', duration: duration })
    }
    else if (status === 400 && listMessage) {
        for (let value in listError) {
            let message = (
                < Message showIcon type="error" closable >
                    {listMessage[value]} - {listError[value]}
                </ Message>
            )
            toaster.push(message, { placement: 'topEnd', duration: duration })
        }
    } else {
        const e = error.response.data.mensagem
        let message = (
            < Message showIcon type="error" closable >
                {e || "Erro - Ocorreu um erro."}
            </ Message>
        )
        toaster.push(message, { placement: 'topEnd', duration: duration })
    }
}
import { Message, Toaster } from "rsuite"

import { AxiosError } from "axios";


export function MessageError400(toaster: Toaster, error: AxiosError, messages: any) {
    let status: any = error.response?.status
    let listError: any = error.response?.data

    if (status === 400) {
        for (let value in listError) {
            let message = (
                < Message showIcon type="error" closable >
                    {messages[value]} - {listError[value]}
                </ Message>
            )
            toaster.push(message, { placement: 'topEnd', duration: 6000 })
        }

    }
}
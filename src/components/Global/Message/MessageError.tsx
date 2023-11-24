import { Message, Toaster } from "rsuite"


export function MessageError(toaster: Toaster, message: string) {
    let men = (
        <Message showIcon type="error" closable >
            {message}
        </Message >
    )
    throw toaster.push(men, { placement: 'topEnd', duration: 6000 })
}
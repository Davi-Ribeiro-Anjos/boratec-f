import { Message } from "rsuite"

export function MessageInfo(toaster: any, message: string, duration: number = 4000) {
    let m = (
        <Message showIcon type="info" closable>
            {message}
        </Message>
    )

    toaster.push(m, { placement: 'topEnd', duration: duration })
}
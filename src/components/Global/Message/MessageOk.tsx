import { Message } from "rsuite"

export function MessageOk(toaster: any, message: string, duration: number = 4000) {
    let m = (
        <Message showIcon type="success" closable>
            {message}
        </Message>
    )

    toaster.push(m, { placement: 'topEnd', duration: duration })

}
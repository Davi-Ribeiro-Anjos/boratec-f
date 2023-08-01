import { MessageOk } from "./MessageOk";
import { MessageError400 } from "./MessageError400";
import { MessageError401 } from "./MessageError401";
import { MessageError500 } from "./MessageError500";
import { MessageInfo } from "./MessageInfo";


export const MainMessage = {
    Ok: MessageOk,
    Error400: MessageError400,
    Error401: MessageError401,
    Error500: MessageError500,
    Info: MessageInfo
}
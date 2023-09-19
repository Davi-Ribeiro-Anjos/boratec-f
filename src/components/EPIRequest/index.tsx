import { EPIRequestConfirm } from "./EPIRequestConfirm";
import { EPIRequestCreate } from "./EPIRequestCreate";
import { EPIRequestFilter } from "./EPIRequestFilter";
import { EPIRequestHeader } from "./EPIRequestHeader";
import { EPIRequestSend } from "./EPIRequestSend";
import { EPIRequestView } from "./EPIRequestView";


export const EPIRequest = {
    Header: EPIRequestHeader,
    Filter: EPIRequestFilter,
    Create: EPIRequestCreate,
    View: EPIRequestView,
    Send: EPIRequestSend,
    Confirm: EPIRequestConfirm
}
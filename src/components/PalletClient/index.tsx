import { ClientCreate } from "./ClientCreate";
import { ClientFilter } from "./ClientFilter";
import { ClientHeader } from "./ClientHeader";
import { ClientEntry } from "./ClientEntry";
import { ClientExit } from "./ClientExit";


export const PalletClient = {
    Header: ClientHeader,
    Filter: ClientFilter,
    Create: ClientCreate,
    Entry: ClientEntry,
    Exit: ClientExit
}
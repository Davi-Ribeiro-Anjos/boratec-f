import { PaymentSend } from "./PaymentEmail";
import { PaymentHeader } from "./PaymentHeader";
import { PaymentTable } from "./PaymentTable";
import { PaymentXlsx } from "./PaymentXlsx";


export const Payment = {
    Header: PaymentHeader,
    Send: PaymentSend,
    Xlsx: PaymentXlsx,
    Table: PaymentTable
}
import { Col, Input, InputNumber, Row, useToaster } from "rsuite";
import { styles } from "../../assets/styles";

import { memo, useContext } from "react"
import { useMutation } from "react-query";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { queryClient } from "../../services/QueryClient";

import { MainModal } from "../Modal";
import { MainMessage } from "../Message";
import { DateToString, StringToDate } from "../../services/Date";

interface BranchConfirmTransferProps {
    open: boolean;
    setOpen: (value: any) => void;
    row: any;
    setRow: (value: any) => void;
}


export const BranchConfirmTransfer = memo(
    function BranchConfirmTransfer({ open, setOpen, row, setRow }: BranchConfirmTransferProps) {
        console.log("filial create palette")

        const { token }: any = useContext(UserContext)
        const api = useApi(token)
        const toaster = useToaster()

        const send = async () => {
            const date: any = StringToDate(row.date_received)

            let data = {
                date_received: DateToString(date, true),
                quantity_pallets: row.quantityInitial,
                received: true,
                destiny: row.destiny.id
            }

            return await api.patch(`pallets-movements/confirm/${row.id}/`, data)
        }

        const { mutate } = useMutation({
            mutationKey: ["movement-pallet"],
            mutationFn: send,
            onSuccess: (response: AxiosResponse) => {
                const dataRes = response.data

                queryClient.setQueryData(["movement-pallet"], (currentData: any) => {
                    let myData: any[] = []
                    currentData.map((movement: any) => {
                        movement.id === dataRes.id ? myData.push(dataRes) : myData.push(movement)
                    })
                    return myData
                })

                queryClient.invalidateQueries(["pallet-by-branch"])

                MainMessage.Ok(toaster, "Sucesso - Transferência confirmada.")

                close()
            },
            onError: (error: AxiosError) => {
                const message = {
                    date_received: "Data Recebimento",
                    quantity_pallets: "Quantidade de Paletes",
                    received: 'Recebido',
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
            }
        })

        const close = () => {
            setOpen(false)
        }

        return (
            <MainModal.Form open={open} close={close} data={row} setData={setRow} send={mutate} size="lg" overflow={false}>
                <MainModal.Header title="Confirmar Recebimento" />
                <MainModal.Body>
                    <Row style={{ marginBottom: 30 }}>
                        <Col xs={6}><h6>Tipo de Dado:</h6></Col>
                        <Col xs={9}><h6>Transferido:</h6></Col>
                        <Col xs={9}><h6>Recebido:</h6></Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Nº da Solicitação
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.request} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.request} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Data solicitação
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.data_request} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.date_received} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Quantidade
                        </Col>
                        <Col xs={9}>
                            <InputNumber style={styles.input} disabled value={row.quantityInitial} />
                        </Col>
                        <Col xs={9}>
                            <InputNumber style={styles.input} value={row.quantity_pallets} onChange={(valor) => setRow({ ...row, quantity_pallets: valor })} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Origem
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.origin && row.origin.abbreviation} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.origin && row.origin.abbreviation} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Destino
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.destiny && row.destiny.abbreviation} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.destiny && row.destiny.abbreviation} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Placa do Veículo
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.vehicle_plate} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.vehicle_plate} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Autor
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.author && row.author.username} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.author && row.author.username} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Motorista
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.driver} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.driver} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Conferente
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.checker} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.checker} />
                        </Col>
                    </Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Confirmar" close={close} />
            </MainModal.Form>
        )
    }
)
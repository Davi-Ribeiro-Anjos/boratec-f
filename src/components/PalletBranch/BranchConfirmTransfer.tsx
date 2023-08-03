import { Col, Input, InputNumber, Row, useToaster } from "rsuite";

import { useState, memo, useContext } from "react"
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

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 200,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
}



export const BranchConfirmTransfer = memo(
    function BranchConfirmTransfer({ open, setOpen, row, setRow }: BranchConfirmTransferProps) {
        console.log("filial create palette")

        const { token }: any = useContext(UserContext)
        const api = useApi(token)
        const toaster = useToaster()

        const send = async () => {
            const date: any = StringToDate(row.data_recebimento)

            let data = {
                data_recebimento: DateToString(date, true),
                quantidade_paletes: row.quantidadeInicial,
                recebido: true,
                destino: row.destino.id
            }

            return await api.patch(`paletes-movimentos/confirmar/${row.id}/`, data)
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
                    data_recebimento: "Data Recebimento",
                    quantidade_paletes: "Quantidade de Paletes",
                    recebido: 'Recebido',
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
                            <Input style={styles.input} disabled value={row.solicitacao} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.solicitacao} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Data solicitação
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.data_solicitacao} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.data_recebimento} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Quantidade
                        </Col>
                        <Col xs={9}>
                            <InputNumber style={styles.input} disabled value={row.quantidadeInicial} />
                        </Col>
                        <Col xs={9}>
                            <InputNumber style={styles.input} value={row.quantidade_paletes} onChange={(valor) => setRow({ ...row, quantidade_paletes: valor })} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Origem
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.origem && row.origem.sigla} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.origem && row.origem.sigla} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Destino
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.destino && row.destino.sigla} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.destino && row.destino.sigla} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Placa do Veículo
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.placa_veiculo} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.placa_veiculo} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Autor
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.autor && row.autor.username} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.autor && row.autor.username} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Motorista
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.motorista} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.motorista} />
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={6}>
                            Conferente
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.conferente} />
                        </Col>
                        <Col xs={9}>
                            <Input style={styles.input} disabled value={row.conferente} />
                        </Col>
                    </Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Confirmar" close={close} />
            </MainModal.Form>
        )
    }
)
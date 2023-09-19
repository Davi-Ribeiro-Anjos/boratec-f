import { Col, Form, InputNumber, Row, SelectPicker, useToaster } from "rsuite";

import { memo, useState } from "react"

import { BranchesChoices, TypePalletChoices } from "../../services/Choices";
import { queryClient } from "../../services/QueryClient";

import { MainModal } from "../Global/Modal";
import { useApi } from "../../hooks/Api";
import { useMutation } from "react-query";
import { MainMessage } from "../Global/Message";
import { styles } from "../../assets/styles";
// import { AxiosResponse } from "axios";

interface ClientExitProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

interface Exit {
    branch__id: number | null,
    type_pallet: string | null,
    quantity_pallets: number | null,
    client__id: number | null,
}


export const ClientExit = memo(
    function ClientExit({ open, setOpen }: ClientExitProps) {
        const api = useApi()
        const toaster = useToaster()

        const [data, setData] = useState<Exit>({
            branch__id: null,
            type_pallet: null,
            quantity_pallets: null,
            client__id: null,
        })

        const ClientsChoices = queryClient.getQueryData<any>(["get-client"])

        const send = async () => {
            let form = { ...data }

            if (form.quantity_pallets) form.quantity_pallets = form.quantity_pallets * -1

            return await api.patch('clients/', form)
        }

        const { mutate } = useMutation({
            mutationKey: ["pallet-client"],
            mutationFn: send,
            onSuccess: () => {
                queryClient.invalidateQueries(["pallet-client"])

                MainMessage.Ok(toaster, "Sucesso - Saída de paletes cadastrado.")

                close()
            }
        })

        const close = () => {
            setOpen(false)

            setData({
                branch__id: null,
                type_pallet: null,
                quantity_pallets: null,
                client__id: null,
            })
        }

        return (
            <MainModal.Form open={open} close={close} data={data} setData={setData} send={mutate} size="md" overflow={false} >
                <MainModal.Header title="Cadastro de Saída Cliente" />
                <MainModal.Body>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Filial:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="branch__id" data={BranchesChoices} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Tipo Palete:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="type_pallet" data={TypePalletChoices} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Razão Social/ Motorista:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="client__id" data={ClientsChoices} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Quantidade Paletes:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="quantity_pallets" accepter={InputNumber} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Cadastrar Saída" close={close} />
            </MainModal.Form>
        )
    }
)
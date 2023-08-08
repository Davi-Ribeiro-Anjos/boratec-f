import { Col, Form, InputNumber, Row, SelectPicker, useToaster } from "rsuite";

import { memo, useState, useContext } from "react"

import { BranchesChoices, TypePalletChoices } from "../../services/Choices";
import { queryClient } from "../../services/QueryClient";

import { MainModal } from "../Modal";
import { UserContext } from "../../providers/UserProviders";
import { useApi } from "../../hooks/Api";
import { useMutation } from "react-query";
import { MainMessage } from "../Message";
import { AxiosResponse } from "axios";

interface ClientExitProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

interface Exit {
    filial__id: number | null,
    tipo_palete: string | null,
    quantidade_paletes: number | null,
    cliente__id: number | null,
}

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 250,
        textTransform: "uppercase"
    },
    row: {
        marginBottom: 10,
    },
}


export const ClientExit = memo(
    function ClientExit({ open, setOpen }: ClientExitProps) {


        const { token }: any = useContext(UserContext)
        const api = useApi(token)
        const toaster = useToaster()

        const [data, setData] = useState<Exit>({
            filial__id: null,
            tipo_palete: null,
            quantidade_paletes: null,
            cliente__id: null,
        })

        const ClientsChoices = queryClient.getQueryData<any>(["get-client"])

        const send = async () => {
            let form = { ...data }

            if (form.quantidade_paletes) form.quantidade_paletes = form.quantidade_paletes * -1

            return await api.patch('clientes/', form)
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
                filial__id: null,
                tipo_palete: null,
                quantidade_paletes: null,
                cliente__id: null,
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
                                <Form.Control style={styles.input} name="filial__id" data={BranchesChoices} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Tipo Palete:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="tipo_palete" data={TypePalletChoices} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Razão Social/ Motorista:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="cliente__id" data={ClientsChoices} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Quantidade Paletes:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="quantidade_paletes" accepter={InputNumber} />
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
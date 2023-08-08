import { Col, Form, InputNumber, Row, SelectPicker, useToaster } from "rsuite";

import { memo, useState, useContext } from "react"
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { queryClient } from "../../services/QueryClient";
import { UserContext } from "../../providers/UserProviders";

import { MainModal } from "../Modal"
import { MainMessage } from "../Message";
import { BranchesChoices, TypePalletChoices } from "../../services/Choices";

interface ClientEntryProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

interface Entry {
    filial__id: number | null,
    tipo_palete: string | null,
    quantidade_paletes: number | string | null,
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


export const ClientEntry = memo(
    function ClientEntry({ open, setOpen }: ClientEntryProps) {

        const { token }: any = useContext(UserContext)
        const api = useApi(token)
        const toaster = useToaster()

        const ClientsChoices = queryClient.getQueryData<any>(["get-client"])

        const [data, setData] = useState<Entry>({
            filial__id: null,
            tipo_palete: null,
            quantidade_paletes: null,
            cliente__id: null,
        })

        const send = async () => {
            return await api.patch('clientes/', data)
        }

        const { mutate } = useMutation({
            mutationKey: ["pallet-client"],
            mutationFn: send,
            onSuccess: () => {
                queryClient.invalidateQueries(["pallet-client"])

                MainMessage.Ok(toaster, "Sucesso - Entrada de paletes cadastrado.")

                close()
            },
            onError: (error: AxiosError<any>) => {
                if (error.response?.data.tipo_cadastro) delete error.response?.data.tipo_cadastro

                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
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
            <MainModal.Form open={open} close={close} data={data} setData={setData} send={mutate} size="md" overflow={false}>
                <MainModal.Header title="Cadastro de Entrada Cliente" />
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
                <MainModal.FooterForm name="Cadastrar Entrada" close={close} />
            </MainModal.Form>
        )
    })
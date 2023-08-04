import { Button, ButtonGroup, ButtonToolbar, Col, Form, Input, Row, useToaster } from "rsuite";

import { memo, useState, useContext, forwardRef } from "react"
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { queryClient } from "../../services/QueryClient";
import { UserContext } from "../../providers/UserProviders";

import { MainModal } from "../Modal"
import { MainMessage } from "../Message";

interface ClientCreateProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

interface Client {
    tipo_cadastro: string | null,
    razao_social_motorista: string | null,
    cnpj_cpf: any,
    observacao: string,
    autor: number
}

interface GroupButtonProps {
    showClient: () => void;
    showDriver: () => void;
}

const GroupButton = ({ showClient, showDriver }: GroupButtonProps) => {
    return (
        <ButtonToolbar>
            <ButtonGroup>
                <Button appearance="primary" color="cyan" onClick={showClient}>Razão Social</Button>
                <Button appearance="primary" color="cyan" onClick={showDriver}>Motorista</Button>
            </ButtonGroup>
        </ButtonToolbar>
    )
}

const Textarea = forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

const cnpjMask = (value: string) => {
    return value
        .replace(/\D+/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
}

const cpfMask = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
}


const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 250,
        textTransform: "uppercase"
    },
    row: {
        marginBottom: 10,
    },
    observation: {
        textTransform: "uppercase"
    }
}


export const ClientCreate = memo(
    function ClientCreate({ open, setOpen }: ClientCreateProps) {

        const { token }: any = useContext(UserContext)
        const api = useApi(token)
        const toaster = useToaster()

        // CLIENT
        const [selected, setSelected] = useState(false)
        const [isClient, setIsClient] = useState(false)
        const showClient = () => {
            setSelected(true)
            setIsClient(true)
        }


        const [data, setData] = useState<Client>({
            tipo_cadastro: null,
            razao_social_motorista: "",
            cnpj_cpf: "",
            observacao: "",
            autor: 1
        })

        const send = async () => {
            const form = { ...data }

            if (form.razao_social_motorista) form.razao_social_motorista = form.razao_social_motorista.toUpperCase()
            if (form.observacao) form.observacao = form.observacao.toUpperCase()
            if (form.cnpj_cpf) form.cnpj_cpf = form.cnpj_cpf.replaceAll(".", "").replace("-", "").replace("/", "").slice(0, -1)
            if (selected) {
                if (isClient) {
                    form.tipo_cadastro = "CLIENTE"
                } else {
                    form.tipo_cadastro = "MOTORISTA"
                }
            }

            return await api.post("clientes/", form)
        }

        const { mutate } = useMutation({
            mutationKey: ["get-client"],
            mutationFn: send,
            onSuccess: () => {
                queryClient.invalidateQueries("get-client")

                MainMessage.Ok(toaster, "Sucesso - Cliente cadastrado.")

                close()
            },
            onError: (error: AxiosError<any>) => {
                if (error.response?.data.tipo_cadastro) delete error.response?.data.tipo_cadastro
                let message = {
                    razao_social_motorista: selected ? (isClient ? "Razão Social" : "Motorista") : "Tipo Cliente"
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
            }
        })

        const close = () => {
            setOpen(false)
            setSelected(false)
            setIsClient(false)

            setData({
                tipo_cadastro: null,
                razao_social_motorista: null,
                cnpj_cpf: "",
                observacao: "",
                autor: 1
            })
        }

        return (
            <MainModal.Form open={open} close={close} data={data} setData={setData} send={mutate} size="md" overflow={false}>
                <MainModal.Header title="Cadastro de Cliente" />
                <MainModal.Body>
                    {!selected ? (
                        <Row style={styles.row}>
                            <Col xs={24}>
                                <Form.Group>
                                    <Form.ControlLabel>Tipo Cliente:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="" showClient={showClient} showDriver={() => setSelected(true)} accepter={GroupButton} />
                                </Form.Group>
                            </Col>
                        </Row>
                    ) : (
                        <Row style={styles.row}>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>{isClient ? "Razão Social" : "Motorista"}:</Form.ControlLabel>
                                    <Form.Control style={styles.input} value={data.razao_social_motorista} name="razao_social_motorista" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>{isClient ? "CNPJ" : "CPF"}:</Form.ControlLabel>
                                    <Form.Control style={styles.input} value={isClient ? cnpjMask(data.cnpj_cpf) : cpfMask(data.cnpj_cpf)} onChange={(value) => setData({ ...data, cnpj_cpf: value })} name="cnpj_cpf" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                        </Row>
                    )}
                    <Row style={styles.row}>
                        <Col xs={24}>
                            <Form.Group >
                                <Form.ControlLabel>Observação:</Form.ControlLabel>
                                <Form.Control style={styles.observation} rows={5} name="observacao" value={data.observacao} accepter={Textarea} />
                            </Form.Group>
                        </Col>
                    </Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Criar" close={close} />
            </MainModal.Form>
        )
    })
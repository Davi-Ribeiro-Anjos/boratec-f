import { Button, ButtonGroup, ButtonToolbar, Col, Form, Input, Row, useToaster } from "rsuite";
import { styles } from "../../assets/styles";

import { memo, useState, useContext, forwardRef } from "react"
import { useMutation } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { queryClient } from "../../services/QueryClient";
import { UserContext } from "../../providers/UserProviders";

import { MainModal } from "../Global/Modal"
import { MainMessage } from "../Global/Message";

interface ClientCreateProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

interface Client {
    type_registration: string | null,
    name: string | null,
    document: any,
    observation: string,
    author: number
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


export const ClientCreate = memo(
    function ClientCreate({ open, setOpen }: ClientCreateProps) {

        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        // CLIENT
        const [selected, setSelected] = useState(false)
        const [isClient, setIsClient] = useState(false)
        const showClient = () => {
            setSelected(true)
            setIsClient(true)
        }


        const [data, setData] = useState<Client>({
            type_registration: null,
            name: "",
            document: "",
            observation: "",
            author: me.id
        })

        const send = async () => {
            const form = { ...data }

            if (form.name) form.name = form.name.toUpperCase()
            if (form.observation) form.observation = form.observation.toUpperCase()
            if (form.document) form.document = form.document.replaceAll(".", "").replace("-", "").replace("/", "").slice(0, -1)
            if (selected) {
                if (isClient) {
                    form.type_registration = "CLIENTE"
                } else {
                    form.type_registration = "MOTORISTA"
                }
            }

            return await api.post("clients/", form)
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
                if (error.response?.data.type_registration) delete error.response?.data.type_registration
                let message = {
                    name: selected ? (isClient ? "Razão Social" : "Motorista") : "Tipo Cliente"
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
                type_registration: null,
                name: null,
                document: "",
                observation: "",
                author: me.id
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
                                    <Form.Control style={styles.input} name="name" accepter={Input} />
                                    <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group>
                                    <Form.ControlLabel>{isClient ? "CNPJ" : "CPF"}:</Form.ControlLabel>
                                    <Form.Control style={styles.input} name="document" value={isClient ? cnpjMask(data.document) : cpfMask(data.document)} onChange={(value) => setData({ ...data, document: value })} accepter={Input} />
                                </Form.Group>
                            </Col>
                        </Row>
                    )}
                    <Row style={styles.row}>
                        <Col xs={24}>
                            <Form.Group >
                                <Form.ControlLabel>Observação:</Form.ControlLabel>
                                <Form.Control style={styles.observation} rows={5} name="observation" accepter={Textarea} />
                            </Form.Group>
                        </Col>
                    </Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Criar" close={close} />
            </MainModal.Form>
        )
    })
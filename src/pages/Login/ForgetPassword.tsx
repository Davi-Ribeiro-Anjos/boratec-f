import { Button, ButtonToolbar, Container, Content, FlexboxGrid, Form, Message, Panel, useToaster } from "rsuite";
import Image from "../../static/Images/background_login.png"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import jwt_decode from "jwt-decode";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../hooks/Api";
import { setCookie } from "../../services/Cookies";
import { UserContext } from "../../providers/UserProviders";
import { MainMessage } from "../../components/Global/Message";

interface Token {
    access: any;
    refresh: string;
}

const styles: { [key: string]: React.CSSProperties } = {
    img: {
        objectFit: "cover",
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1
    },
    label: {
        color: "white",
    }

}


export default function ForgetPassword() {
    const { setMe, GetUsersChoices }: any = useContext(UserContext)
    const toaster = useToaster()
    const navigate = useNavigate()
    const api = useApi()

    const [form, setForm] = useState<any>({
        email: "",
    })

    const send = async () => {
        return await api.post("forget-password/", form)
    }
    const { mutate } = useMutation({
        mutationKey: ["forget-password"],
        mutationFn: send,
        onSuccess: (response: AxiosResponse) => {
            MainMessage.Ok(toaster, response.data.message)

            navigate("/")
        },
        onError: (error: AxiosError<any>) => {
            let message = {
                email: "Email",

            }

            if (error.response?.status === 404) {
                let message = (
                    <Message showIcon type="error" closable >
                        Email - {error.response?.data?.detail}
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }
            MainMessage.Error400(toaster, error, message)
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error)
        },
    })

    return (
        <>
            {window.innerWidth < 400 ? (
                <div className="show-fake-browser login-page"  >
                    <Content style={{ marginTop: "15vh" }}>
                        <FlexboxGrid justify="center"  >
                            <Panel header={<h3 style={styles.label}>Esqueceu a Senha?</h3>} shaded style={{ width: "90vw" }} >
                                <Form onSubmit={() => mutate()} onChange={setForm} formValue={form} fluid>
                                    <Form.Group>
                                        <Form.ControlLabel>Usuário</Form.ControlLabel>
                                        <Form.Control name="username" />
                                    </Form.Group>
                                    <Form.Group>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <ButtonToolbar>
                                                <Button appearance="primary" type="submit" color="blue">Recupe</Button>
                                            </ButtonToolbar>
                                            <ButtonToolbar>
                                                <Button appearance="link" style={styles.label} onClick={() => navigate("/")}>Voltar para Login</Button>
                                            </ButtonToolbar>
                                        </div>
                                    </Form.Group>
                                </Form>
                            </Panel>
                        </FlexboxGrid>
                    </Content>
                </div >
            ) : (
                <>
                    <img style={styles.img} src={Image} alt="Imagem Caminhão" />
                    <div className="show-fake-browser login-page"  >
                        <Content style={{ marginTop: "15vh" }}>
                            <div style={{ marginLeft: "55vw" }} >
                                <Panel header={<h3 style={styles.label}>Esqueceu a Senha?</h3>} shaded style={{ width: "25vw" }}  >
                                    <Form onSubmit={() => mutate()} onChange={setForm} formValue={form} fluid>
                                        <Form.Group>
                                            <Form.ControlLabel style={styles.label}>Email para recuperação</Form.ControlLabel>
                                            <Form.Control name="email" />
                                        </Form.Group>
                                        <Form.Group>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <ButtonToolbar>
                                                    <Button appearance="primary" type="submit" color="blue">Enviar</Button>
                                                </ButtonToolbar>
                                                <ButtonToolbar>
                                                    <Button appearance="link" style={styles.label} onClick={() => navigate("/")}>Voltar para Login</Button>
                                                </ButtonToolbar>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                </Panel>
                            </div>
                        </Content>
                    </div >
                </>
            )}
        </>
    )
}
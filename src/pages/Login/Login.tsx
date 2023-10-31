import { Button, ButtonToolbar, Content, FlexboxGrid, Form, Message, Panel, useToaster } from "rsuite";
import Image from "../../static/Images/background_login.png"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import jwt_decode from "jwt-decode";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../hooks/Api";
import { setCookie } from "../../services/Cookies";
import { UserContext } from "../../providers/UserProviders";

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


export default function Login() {
    const { setMe, GetUsersChoices }: any = useContext(UserContext)
    const toaster = useToaster()
    const navigate = useNavigate()

    const [form, setForm] = useState<any>({
        username: "",
        password: "",
    })

    const login = () => {
        const api = useApi()

        return api.post("login/", form)
    }
    const { refetch } = useQuery({
        queryKey: "login",
        queryFn: login,
        onSuccess: (res: AxiosResponse<Token>) => {
            const data = res.data

            const access: any = jwt_decode(data.access)
            setMe(access?.employee)

            setCookie("token_access", data.access, 1)
            setCookie("token_refresh", data.refresh, 1)

            navigate("/")

            GetUsersChoices()
        },
        onError: (error: AxiosError<any>) => {
            if (error.response?.status === 401) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - {error.response?.data?.detail}.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }
        },
        enabled: false
    })

    return (
        <>
            {window.innerWidth < 400 ? (
                <>
                    <div className="show-fake-browser login-page"  >
                        <Content style={{ marginTop: "15vh" }}>
                            <FlexboxGrid justify="center"  >
                                <Panel header={<h3>Login</h3>} bordered style={{ width: "90vw" }} >
                                    <Form onSubmit={() => refetch()} onChange={setForm} formValue={form} fluid>
                                        <Form.Group>
                                            <Form.ControlLabel>Usuário</Form.ControlLabel>
                                            <Form.Control name="username" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.ControlLabel>Senha</Form.ControlLabel>
                                            <Form.Control name="password" type="password" autoComplete="off" />
                                        </Form.Group>
                                        <Form.Group>
                                            <ButtonToolbar>
                                                <Button appearance="primary" type="submit">Entrar</Button>
                                                {/* <Button appearance="link">Esqueceu a senha?</Button> */}
                                            </ButtonToolbar>
                                        </Form.Group>
                                    </Form>
                                </Panel>
                            </FlexboxGrid>
                        </Content>
                    </div >
                </>
            ) : (
                <>
                    <img style={styles.img} src={Image} alt="Imagem Caminhão" />
                    <div className="show-fake-browser login-page"  >
                        <Content style={{ marginTop: "15vh" }}>
                            <div style={{ marginLeft: "55vw" }} >
                                <Panel header={<h3 style={styles.label}>Login</h3>} shaded style={{ width: "25vw" }}  >
                                    <Form onSubmit={() => refetch()} onChange={setForm} formValue={form} fluid>
                                        <Form.Group>
                                            <Form.ControlLabel style={styles.label}>Usuário</Form.ControlLabel>
                                            <Form.Control name="username" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.ControlLabel style={styles.label}>Senha</Form.ControlLabel>
                                            <Form.Control name="password" type="password" autoComplete="off" />
                                        </Form.Group>
                                        <Form.Group>
                                            <ButtonToolbar>
                                                <Button appearance="primary" type="submit">Entrar</Button>
                                                {/* <Button appearance="link">Esqueceu a senha?</Button> */}
                                            </ButtonToolbar>
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
import { Button, ButtonToolbar, Content, FlexboxGrid, Form, Loader, Message, Panel, useToaster } from "rsuite";

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


export default function Login() {
    console.log("login");

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
        <div className="show-fake-browser login-page" >
            <Content style={{ marginTop: "15vh" }}>
                <FlexboxGrid justify="center" >
                    <FlexboxGrid.Item colspan={8}>
                        <Panel header={<h3>Login</h3>} bordered>
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
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </div>
    )
}
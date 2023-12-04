import { Button, FlexboxGrid, Input, Panel, useToaster } from "rsuite"
import Image from "../../static/Images/background_blue.png"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { useMutation } from "react-query"

import { AxiosError } from "axios"
import { useApi } from "../../hooks/Api"

import { MainMessage } from "../../components/Global/Message"

import jwt_decode from "jwt-decode";


const styles: { [key: string]: React.CSSProperties } = {
    panel: {
        marginTop: "20vh",
        width: "50vw"
    },
    button: {
        width: 200,
    },
    div: {
        margin: "30px 0"
    },
    input: {
        textTransform: 'uppercase'
    },
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

export default function ApprovesVacancies() {
    const api = useApi()
    const toaster = useToaster()

    const { token } = useParams()
    // const { logout }: any = useContext(UserContext)

    // useEffect(() => {
    //     logout()
    // }, [])

    const dictToken: any = jwt_decode(token || "")

    const [data, setData] = useState({
        comment: "",
        token: token,
        approval: false,
        title: dictToken.title,
    })

    const send = (approval: boolean) => {
        let body = { ...data }

        body.approval = approval

        if (approval) MainMessage.Info(toaster, "Fazendo aprovação, aguarde...")
        else MainMessage.Info(toaster, "Fazendo reprovação, aguarde...")

        return api.patch("vacancies/emails/confirm/", body)
    }

    const { mutate } = useMutation({
        mutationKey: ["vacancy-control"],
        mutationFn: send,
        onSuccess: () => {
            MainMessage.Ok(toaster, "Sucesso - Alteração realizada. Pode fechar a guia.")

            clear()
        },
        onError: (error: AxiosError) => {
            const message = {
                message: "Erro"
            }

            MainMessage.Error400(toaster, error, message)
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error)
        }
    })

    const clear = () => {
        setData({
            comment: "",
            token: "",
            approval: false,
            title: "",
        })
    }

    return (
        <>
            <img style={styles.img} src={Image} alt="Fundo Azul" />
            <FlexboxGrid justify="center">
                <Panel style={styles.panel} shaded>
                    <FlexboxGrid justify="center" style={{ marginBottom: 30 }}>
                        <h2 style={styles.label}>ABERTURA DE VAGA</h2>
                    </FlexboxGrid>
                    <h5 style={styles.label}>Título da Vaga: {data.title}</h5>
                    <div style={styles.div}>
                        <label style={styles.label}>Observação:</label>
                        <Input style={styles.input} as="textarea" rows={5} value={data.comment} onChange={(value) => setData({ ...data, comment: value.toUpperCase() })} />
                    </div>
                    <FlexboxGrid justify="space-around" align="middle">
                        <Button style={styles.button} appearance="primary" color="red" onClick={() => mutate(false)}> Reprovar</Button>
                        <Button style={styles.button} appearance="primary" color="green" onClick={() => mutate(true)}>Aprovar</Button>
                    </FlexboxGrid>
                </Panel >
            </FlexboxGrid >
        </>
    )
}
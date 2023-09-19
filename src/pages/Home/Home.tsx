import { Button, FlexboxGrid } from "rsuite";
import { eraseCookie } from "../../services/Cookies";
import { useContext } from "react";
import { UserContext } from "../../providers/UserProviders";
import { useNavigate } from "react-router-dom";

const styles: { [key: string]: React.CSSProperties } = {
    div: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    }
}


export default function Home() {

    const { setMe }: any = useContext(UserContext)
    const navigate = useNavigate();

    const logout = () => {
        eraseCookie("me")
        eraseCookie("token_access")
        eraseCookie("token_refresh")
        eraseCookie("sessionid")
        eraseCookie("csrftoken")

        setMe(undefined)

        navigate("/login")
    }

    return (
        <div style={styles.div}  >
            <h3>Seja bem vindo ao Novo Boratec!</h3>

            <Button appearance="primary" color="red" onClick={logout}>Sair</Button>

        </div>
    )
}
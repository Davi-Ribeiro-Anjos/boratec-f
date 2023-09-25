import Image from "../../static/Images/background.png"

import { useContext } from "react";
import { UserContext } from "../../providers/UserProviders";

const styles: { [key: string]: React.CSSProperties } = {
    div: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
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
    title: {
        color: "white",
        marginTop: 20
    }

}


export default function Home() {
    const { me }: any = useContext(UserContext)

    return (
        <div style={styles.div}  >
            <img style={styles.img} src={Image} alt="Imagem Caminhão" />

            <h3 style={styles.title} >
                Olá {me.user.first_name.toUpperCase()},
            </h3>
            <h3 style={styles.title}>
                Bem Vindo ao Boratec 2.0!
            </h3>

        </div>
    )
}
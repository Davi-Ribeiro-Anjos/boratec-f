import { useContext } from "react";
import { UserContext } from "../../providers/UserProviders";

const styles: { [key: string]: React.CSSProperties } = {
    div: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        color: "black",
        marginTop: 20
    }

}


export default function Home() {
    const { me }: any = useContext(UserContext)

    return (
        <div style={styles.div}  >
            <h3 style={styles.title} >
                Olá {me.user.first_name.toUpperCase()},
            </h3>
            <h3 style={styles.title}>
                Bem Vindo ao Boratec 2.0!
            </h3>
        </div>
    )
}
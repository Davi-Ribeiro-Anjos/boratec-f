import { IconButton } from 'rsuite';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';

import { useNavigate } from 'react-router-dom';

import Image404 from '../../static/Images/404.svg';

interface Error404Interface {
    name?: string;
}

const styles: any = {
    position: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "5vh",
    },
    img: {
        width: "40vw",
        margin: "0 auto"
    },
    p1: {
        margin: "0 auto",
        fontSize: "1.5rem",
        fontWeight: "bold"
    },
    p2: {
        margin: "0 auto",
        color: "#7a7a7a"
    },
    input: {
        margin: "0 auto",
        marginTop: "30px",
        width: "200px",
    }
}

export default function Error404({ name = "Home" }: Error404Interface) {
    const navigate = useNavigate();

    return (
        <div style={styles.position} >
            <img style={styles.img} src={Image404} alt="Erro 404" />
            <p style={styles.p1}>Oops...</p>
            <p style={styles.p2}>Lamentamos mas a página que procura não foi encontrada.</p>
            <IconButton onClick={() => navigate('/')} style={styles.input} icon={<PagePreviousIcon />} appearance='primary' >Ir para {name}</IconButton>
        </div>
    )
}
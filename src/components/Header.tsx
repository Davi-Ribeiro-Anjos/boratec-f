import { Navbar, Nav, Dropdown, Toggle, Stack } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";

import { useNavigate } from "react-router-dom";


export function MainHeader() {
    console.log("main header")

    const navigate = useNavigate();

    return (
        <Navbar appearance="inverse" >
            <Nav style={{ width: "100%" }} >
                <Navbar.Brand onClick={() => navigate("/")} style={{ padding: 5 }}>
                    {/* <img src={image} alt="Logo Bora" style={{ width: 140, height: 45 }} /> */}
                </Navbar.Brand>
                <Nav.Item onClick={() => navigate("/")} eventKey="10">
                    Home
                </Nav.Item>
                <Nav.Menu title="Paletes">
                    <Nav.Item onClick={() => navigate("/paletes/filiais")} eventKey="30">Paletes Filiais</Nav.Item>
                    <Nav.Item onClick={() => navigate("/paletes/clientes")} eventKey="31">Paletes Clientes</Nav.Item>
                </Nav.Menu>
                {/* <Nav.Menu title="Ferramentas">
                    <Nav.Item onClick={() => navigate("/compras")} eventKey="40">Compras</Nav.Item>
                </Nav.Menu> */}
                <Nav.Menu title="Compras">
                    <Nav.Item onClick={() => navigate("/compras/solicitacoes-compras")} eventKey="50">Solicitações Compras</Nav.Item>
                </Nav.Menu>
                <Nav.Menu title="Ferramentas RH">
                    <Nav.Item onClick={() => navigate("/demissoes")} eventKey="60">Demissões</Nav.Item>
                    <Nav.Item onClick={() => navigate("/funcionarios-pj")} eventKey="61">Funcionários PJ</Nav.Item>
                    <Nav.Item onClick={() => navigate("/fichas-cadastrais")} eventKey="62">Fixa Cadastral</Nav.Item>
                </Nav.Menu>
                <Nav.Menu title="Comercial">
                    <Nav.Item onClick={() => navigate("/justificativa")} eventKey="70">Justificativa</Nav.Item>
                </Nav.Menu>
                <Nav pullRight>
                    <Nav.Menu noCaret icon={<CogIcon />} placement="bottomEnd">
                        {/* <Nav.Item panel style={theme === "dark" ? { padding: 10, width: 160, color: "white" } : { padding: 10, width: 160, color: "black" }}> */}
                        <Nav.Item panel style={{ padding: 10, width: 160, color: "white" }}>
                            <p>Logado como</p>
                            <strong>davi.bezerra</strong>
                        </Nav.Item>
                        <Dropdown.Separator />
                        <Nav.Item >
                            <Stack spacing={50}>
                                Tema
                                <Toggle checkedChildren="Escuro" unCheckedChildren="Claro" />
                            </Stack>
                        </Nav.Item>
                        <Nav.Item>Ajuda</Nav.Item>
                        <Nav.Item onClick={() => navigate("/configuracoes")}>Configurações</Nav.Item>
                        <Nav.Item>Sair</Nav.Item>
                    </Nav.Menu>
                </Nav>
            </Nav>
        </Navbar >
    );
}
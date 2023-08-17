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
                {/* <Nav.Menu title="Portaria">
                    <Nav.Item onClick={() => navigate("/paletes/filiais")} eventKey="30">Controle</Nav.Item>
                </Nav.Menu> */}
                <Nav.Menu title="Paletes">
                    <Nav.Item onClick={() => navigate("/paletes/filiais")} eventKey="30">Paletes Filiais</Nav.Item>
                    <Nav.Item onClick={() => navigate("/paletes/clientes")} eventKey="31">Paletes Clientes</Nav.Item>
                </Nav.Menu>
                <Nav.Menu title="Frotas">
                    <Nav.Item onClick={() => navigate("/paletes/filiais")} eventKey="40">Disponibilidade Frota</Nav.Item>
                </Nav.Menu>
                <Nav.Menu title="Compras">
                    <Nav.Item onClick={() => navigate("/compras/solicitacoes-compras")} eventKey="50">Solicitações Compras</Nav.Item>
                </Nav.Menu>
                <Nav.Menu title="Ferramentas RH">
                    <Nav.Item onClick={() => navigate("/rh/funcionarios-pj")} eventKey="60">Funcionários PJ</Nav.Item>
                    <Nav.Item onClick={() => navigate("/rh/fichas-cadastrais")} eventKey="61">Ficha Cadastral</Nav.Item>
                </Nav.Menu>
                <Nav.Menu title="Ferramentas">
                    <Nav.Item onClick={() => navigate("/rh/funcionarios-pj")} eventKey="70">XMLS</Nav.Item>
                </Nav.Menu>
                <Nav.Menu title="Estoque">
                    <Nav.Item onClick={() => navigate("/rh/funcionarios-pj")} eventKey="80">Solicitações de EPI's</Nav.Item>
                    <Nav.Item onClick={() => navigate("/rh/fichas-cadastrais")} eventKey="81">Controle de EPI's</Nav.Item>
                </Nav.Menu>
                <Nav.Menu title="Comercial">
                    <Nav.Item onClick={() => navigate("/comercial/justificativas")} eventKey="90">Justificativa</Nav.Item>
                </Nav.Menu>
                <Nav.Menu title="Consultas">
                    <Nav.Item onClick={() => navigate("/consultas/nf")} eventKey="100">Consulta NF</Nav.Item>
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
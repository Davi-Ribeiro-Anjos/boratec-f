import { Navbar, Nav, Dropdown, Toggle, Stack } from "rsuite";
import CogIcon from "@rsuite/icons/legacy/Cog";
// import image from "../static/images/logo.png"
import { GoSun, GoMoon } from 'react-icons/go'

import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../providers/UserProviders";
import { eraseCookie } from "../services/Cookies";
import { ThemeContext } from "../providers/ThemeProviders";


export function MainHeader() {
    const { me, setMe, verifyPermission }: any = useContext(UserContext)
    const { theme, changeTheme }: any = useContext(ThemeContext)

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
        <Navbar appearance="inverse">
            <Nav style={{ width: "100%" }} >
                {/* <Navbar.Brand onClick={() => navigate("/")} style={{ padding: 5, marginRight: 10 }}>
                    <img src={image} alt="Logo Bora" style={{ width: 190, height: 45 }} />
                </Navbar.Brand> */}
                <Nav.Item onClick={() => navigate("/")} eventKey="10">
                    Home
                </Nav.Item>
                {verifyPermission("pallets") && (
                    <Nav.Menu title="Paletes">
                        {verifyPermission("pallet_branch") && (
                            <Nav.Item onClick={() => navigate("/paletes/filiais")} eventKey="30">Paletes Filiais</Nav.Item>
                        )}
                        {verifyPermission("pallet_client") && (
                            <Nav.Item onClick={() => navigate("/paletes/clientes")} eventKey="31">Paletes Clientes</Nav.Item>
                        )}
                    </Nav.Menu>
                )}
                {verifyPermission("fleets") && (
                    <Nav.Menu title="Frotas">
                        {verifyPermission("fleet_availability") && (
                            <Nav.Item onClick={() => navigate("/frotas/disponibilidades")} eventKey="40">Disponibilidade Frota</Nav.Item>
                        )}
                    </Nav.Menu>
                )}
                {verifyPermission("purchases") && (
                    <Nav.Menu title="Compras">
                        {verifyPermission("purchase_request") && (
                            <Nav.Item onClick={() => navigate("/compras/solicitacoes-compras")} eventKey="50">Solicitações Compras</Nav.Item>
                        )}
                    </Nav.Menu>
                )}
                {verifyPermission("tools_rh") && (
                    <Nav.Menu title="Ferramentas RH">
                        {verifyPermission("employee") && (
                            <Nav.Item onClick={() => navigate("/rh/funcionarios-pj")} eventKey="60">Funcionários PJ</Nav.Item>
                        )}
                        {verifyPermission("employee") && (
                            <Nav.Item onClick={() => navigate("/rh/fichas-cadastrais")} eventKey="61">Ficha Cadastral</Nav.Item>
                        )}
                    </Nav.Menu>
                )}
                {verifyPermission("tools") && (
                    <Nav.Menu title="Ferramentas">
                        {verifyPermission("xmls") && (
                            // <Nav.Item onClick={() => navigate("/ferramentas/xmls")} eventKey="70">XMLS</Nav.Item>
                            <a href="http://bora.tec.br/romaneioop/">
                                <Nav.Item eventKey="70">XMLS</Nav.Item>
                            </a>
                        )}
                    </Nav.Menu>
                )}
                {verifyPermission("stocks") && (
                    <Nav.Menu title="Estoques">
                        {verifyPermission("stocks_epis") && (
                            <Nav.Item onClick={() => navigate("/estoques/epis/solicitacoes")} eventKey="80">Solicitações EPI's</Nav.Item>
                        )}
                        {verifyPermission("stocks_epis_admin") && (
                            <Nav.Item onClick={() => navigate("/estoques/epis/controles")} eventKey="81">Controle EPI's</Nav.Item>
                        )}
                    </Nav.Menu>
                )}
                {/* {verifyPermission("commercials") && (
                    <Nav.Menu title="Comercial">
                        {verifyPermission("justification") && (
                            <Nav.Item onClick={() => navigate("/comercial/justificativas")} eventKey="90">Justificativa</Nav.Item>
                        )}
                    </Nav.Menu>
                )} */}
                <Nav.Menu title="Consultas">
                    <Nav.Item onClick={() => navigate("/consultas/nf")} eventKey="100">Consulta NF</Nav.Item>
                </Nav.Menu>
                <Nav pullRight>
                    <Nav.Menu noCaret icon={<CogIcon />} placement="bottomEnd">
                        <Nav.Item panel style={theme === "dark" ? { padding: 10, width: 160, color: "white" } : { padding: 10, width: 160, color: "black" }}>
                            <p>Logado como</p>
                            <strong>{me.user.username}</strong>
                        </Nav.Item>
                        <Dropdown.Separator />
                        <Nav.Item >
                            <Stack spacing={50}>
                                Tema
                                <Toggle onClick={changeTheme} checked={theme === "light" ? false : true} checkedChildren={<GoMoon />} unCheckedChildren={<GoSun />} />
                            </Stack>
                        </Nav.Item>
                        <Nav.Item target="_blank" onClick={() => window.location.href = 'https://api.whatsapp.com/send?phone=5511945419952'} >Ajuda</Nav.Item>
                        {/* <Nav.Item onClick={() => navigate("/configuracoes")}>Configurações</Nav.Item> */}
                        <Nav.Item onClick={logout} >Sair</Nav.Item>
                    </Nav.Menu>
                </Nav>
            </Nav>
        </Navbar >
    );
}
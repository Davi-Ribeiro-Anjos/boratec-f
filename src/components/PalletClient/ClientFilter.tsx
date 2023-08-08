import { Col, Form, Row, SelectPicker, useToaster } from "rsuite"

import { useContext } from "react"

import { UserContext } from "../../providers/UserProviders";
import { BranchesChoices } from "../../services/Choices";
import { useQuery } from "react-query";
import { useApi } from "../../hooks/Api";
import { AxiosError } from "axios";
import { MainMessage } from "../Message";

interface ClientFilterProps { }

interface ClientChoices {
    id: number;
    razao_social_motorista: string;
}

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 300,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
}



export function ClientFilter({ }: ClientFilterProps) {
    console.log("cliente filter")

    const { token }: any = useContext(UserContext)
    const api = useApi(token)
    const toaster = useToaster()

    const getChoicesClients = async () => {
        const response = await api.get<ClientChoices[]>('clientes/choices/')

        if (response.data) return response.data.map(item => ({ label: item.razao_social_motorista, value: item.id }))

        return [{ label: "VAZIO", value: 0 }]
    }

    const { data: ClientChoices } = useQuery({
        queryKey: ["get-client"],
        queryFn: getChoicesClients,
        onError: (error: AxiosError) => {
            MainMessage.Error401(toaster, error)
            MainMessage.Error500(toaster, error, "Erro ao buscar Razão Social/ Motorista")
        }
    })

    return (
        <>
            <Row style={styles.row}>
                <Col xs={12}>
                    <Form.Group style={styles.form}>
                        <Form.ControlLabel>Filial:</Form.ControlLabel>
                        <Form.Control style={styles.input} name="filial" data={BranchesChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group style={styles.form}>
                        <Form.ControlLabel>Razão Social/ Motorista:</Form.ControlLabel>
                        <Form.Control style={styles.input} name="cliente_id" data={ClientChoices ? ClientChoices : []} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}
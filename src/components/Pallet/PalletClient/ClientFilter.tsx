import { Col, Form, Row, SelectPicker, useToaster } from "rsuite"

import { BranchesChoices } from "../../../services/Choices";
import { useQuery } from "react-query";
import { useApi } from "../../../hooks/Api";
import { AxiosError } from "axios";
import { MainMessage } from "../../Global/Message";
import { styles } from "../../../assets/styles";

interface ClientFilterProps { }

interface ClientChoices {
    id: number;
    name: string;
}



export function ClientFilter({ }: ClientFilterProps) {
    const api = useApi()
    const toaster = useToaster()

    const getChoicesClients = async () => {
        const response = await api.get<ClientChoices[]>('clients/choices/')

        if (response.data) return response.data.map(item => ({ label: item.name, value: item.id }))

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
                        <Form.Control style={styles.input} name="branch" data={BranchesChoices} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group style={styles.form}>
                        <Form.ControlLabel>Razão Social/ Motorista:</Form.ControlLabel>
                        <Form.Control style={styles.input} name="client_id" data={ClientChoices ? ClientChoices : []} accepter={SelectPicker} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}
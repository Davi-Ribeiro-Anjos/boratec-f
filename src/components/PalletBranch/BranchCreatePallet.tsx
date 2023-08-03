import { Col, Form, InputNumber, InputPicker, Row, SelectPicker, useToaster } from "rsuite";

import { useState, memo, useContext } from "react"
import { useMutation } from "react-query";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { queryClient } from "../../services/QueryClient";
import { PalletControlInterface } from "../../services/Interfaces";
import { BranchesChoices, TypePalletChoices } from "../../services/Choices";

import { MainModal } from "../Modal";
import { MainMessage } from "../Message";

interface BranchCreatePalletProps {
    open: boolean;
    setOpen: (value: any) => void;
    setOpenInfo: (value: any) => void;
}

interface Data {
    localizacao_atual: string | null,
    quantidade_paletes: number | null,
    tipo_palete: string | null,
    autor: number;
}

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 200,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
}


export const BranchCreatePallet = memo(
    function BranchCreatePallet({ open, setOpen, setOpenInfo }: BranchCreatePalletProps) {
        console.log("filial create palette")

        const { token }: any = useContext(UserContext)
        const api = useApi(token)
        const toaster = useToaster()

        const [data, setData] = useState<Data>({
            localizacao_atual: '',
            quantidade_paletes: null,
            tipo_palete: '',
            autor: 1
        })

        const send = async () => {
            let form = { ...data }

            return await api.post<PalletControlInterface>('paletes-controles/', form)
        }

        const { mutate } = useMutation({
            mutationKey: ["pallet-by-branch"],
            mutationFn: send,
            onSuccess: (response: AxiosResponse) => {
                const dataRes = response.data

                queryClient.setQueryData("pallet-by-branch", (currentData: any) => {
                    let myData: any[] = []
                    currentData.map((branch: any) => {
                        branch.localizacao_atual === dataRes.localizacao_atual ? myData.push(dataRes) : myData.push(branch)
                    })
                    return myData
                })

                MainMessage.Ok(toaster, "Paletes criados.")
                close()
            },
            onError: (error: AxiosError) => {
                let message = {
                    localizacao_atual: "Filial",
                    quantidade_paletes: "Quantidade de Paletes",
                    tipo_palete: 'Tipo Palete',
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
            }
        })

        const close = () => {
            setOpen(false)
            setOpenInfo(true)

            setData({
                quantidade_paletes: null,
                localizacao_atual: null,
                tipo_palete: null,
                autor: 1
            })
        }

        return (
            <MainModal.Form open={open} close={close} data={data} setData={setData} send={mutate} overflow={false} >
                <MainModal.Header title="Adicionar Paletes" />
                <MainModal.Body>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Filial:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="localizacao_atual" data={BranchesChoices} accepter={SelectPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Tipo Palete:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="tipo_palete" data={TypePalletChoices} accepter={InputPicker} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col xs={12}>
                            <Form.Group >
                                <Form.ControlLabel>Quantidade Paletes:</Form.ControlLabel>
                                <Form.Control style={styles.input} name="quantidade_paletes" accepter={InputNumber} />
                                <Form.HelpText tooltip>Obrigatório</Form.HelpText>
                            </Form.Group>
                        </Col>
                    </Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Adicionar" close={close} />
            </MainModal.Form>
        )
    }
)
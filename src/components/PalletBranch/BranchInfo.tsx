import { Col, Loader, Row, useToaster } from "rsuite";

import { useState, memo, useContext } from "react"
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { PalletControl } from "../../services/Interfaces";


import { MainPanel } from "../Panel";
import { MainDrawer } from "../Drawer";
import { PalletBranch } from ".";
import { MainMessage } from "../Message";

interface BranchInfoProps {
    open: boolean;
    setOpen: (value: any) => void;
}

interface CardProps {
    title: string;
    quantity: PalletControl;
}

const styles: { [key: string]: React.CSSProperties } = {
    input: {
        width: 250,
        textTransform: 'uppercase'
    },
    row: {
        marginBottom: 10,
    },
    col: {
        margin: "10px 0",
    },
}

const Card = ({ title, quantity }: CardProps) => (
    <Col md={4} sm={8} style={styles.col}>
        <MainPanel.Root bordered header={title}>
            <p>PBR: <strong>{quantity.PBR}</strong></p>
            <p>CHEP: <strong>{quantity.CHEP}</strong></p>
            <p>TOTAL: <strong>{quantity.TOTAL}</strong></p>
        </MainPanel.Root>
    </Col>
);


export const BranchInfo = memo(
    function BranchInfo({ open, setOpen }: BranchInfoProps) {
        console.log("filial info")

        const { token }: any = useContext(UserContext)
        const api = useApi(token)
        const toaster = useToaster()

        const getData = async () => {
            const response = await api.get<PalletControl[]>("paletes-controles/")
            return response.data
        }

        const { data, isLoading } = useQuery({
            queryKey: ["pallet-by-branch"],
            queryFn: getData,
            onError: (error: AxiosError) => {
                let message = {
                    localizacao_atual: "Filial",
                    quantidade_paletes: "Quantidade de Paletes",
                    tipo_palete: 'Tipo Palete',
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error, "Ocorreu um erro ao buscar os dados")
            }
        })

        const [modal, setModal] = useState(false)
        const openModal = () => {
            setModal(true)
            setOpen(false)
        }

        const close = () => {
            setOpen(false)
        }

        if (isLoading) {
            <div>
                <Loader size="md" content="Medium" vertical center />
            </div>
        }

        return (
            <>
                <MainDrawer.Root open={open} close={close} placement="bottom">
                    <MainDrawer.Header openModal={openModal} close={close} title="Quantidade de Paletes por Filial" name="Adicionar paletes" />
                    <MainDrawer.Body>
                        <Row>
                            {data && data.length > 0 ? (
                                data.map((value, index) => {
                                    return (
                                        <Card key={index} title={value.localizacao_atual} quantity={value} />
                                    )
                                })
                            ) : (
                                <p>
                                    Não tem paletes cadastrados.
                                </p>
                            )}
                        </Row>
                    </MainDrawer.Body>
                </MainDrawer.Root>
                <PalletBranch.CreatePallet open={modal} setOpen={setModal} setOpenInfo={setOpen} />
            </>
        )
    }
)
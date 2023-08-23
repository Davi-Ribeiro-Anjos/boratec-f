import { Col, Loader, Row, useToaster } from "rsuite";

import { useState, memo } from "react"
import { useQuery } from "react-query";

import { AxiosError } from "axios";
import { useApi } from "../../hooks/Api";
import { PalletControlInterface } from "../../services/Interfaces";


import { MainPanel } from "../Panel";
import { MainDrawer } from "../Drawer";
import { MainMessage } from "../Message";
import { PalletBranch } from ".";

interface BranchInfoProps {
    open: boolean;
    setOpen: (value: any) => void;
}

interface CardProps {
    title: string;
    quantity: PalletControlInterface;
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

        const api = useApi()
        const toaster = useToaster()

        const getData = async () => {
            const response = await api.get<PalletControlInterface[]>("pallets-controls/")
            return response.data
        }

        const { data, isLoading } = useQuery({
            queryKey: ["pallet-by-branch"],
            queryFn: getData,
            onError: (error: AxiosError) => {
                let message = {
                    current_location: "Filial",
                    quantity_pallets: "Quantidade de Paletes",
                    type_pallet: 'Tipo Palete',
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
                    <MainDrawer.Header openModal={openModal} close={close} title="Quantidade de Paletes por Filial"
                        name="Adicionar paletes" auth="pallet_branch_admin" />
                    <MainDrawer.Body>
                        <Row>
                            {data && data.length > 0 ? (
                                data.map((value, index) => {
                                    return (
                                        <Card key={index} title={value.current_location} quantity={value} />
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
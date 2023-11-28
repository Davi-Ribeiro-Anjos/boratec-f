import { useToaster } from "rsuite";

import { useState, memo, useContext } from "react"
import { useMutation } from "react-query";

import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../../hooks/Api";
import { UserContext } from "../../../providers/UserProviders";
import { queryClient } from "../../../services/QueryClient";
import { PalletControlInterface } from "../../../services/Interfaces";
import { BranchesChoices, TypePalletChoices } from "../../../services/Choices";

import { MainModal } from "../../Global/Modal";
import { MainMessage } from "../../Global/Message";
import { MainFormComponent } from "../../Global/Component/Form";

interface BranchCreatePalletProps {
    open: boolean;
    setOpen: (value: any) => void;
    setOpenInfo: (value: any) => void;
}

interface Data {
    current_location: string | null,
    quantity_pallets: number | null,
    type_pallet: string | null,
    author: number;
}


export const BranchCreatePallet = memo(
    function BranchCreatePallet({ open, setOpen, setOpenInfo }: BranchCreatePalletProps) {
        const { me }: any = useContext(UserContext)
        const api = useApi()
        const toaster = useToaster()

        const [data, setData] = useState<Data>({
            current_location: '',
            quantity_pallets: null,
            type_pallet: '',
            author: me.id
        })

        const send = async () => {
            let form = { ...data }

            return await api.post<PalletControlInterface>('pallets-controls/', form)
        }

        const { mutate } = useMutation({
            mutationKey: ["pallet-by-branch"],
            mutationFn: send,
            onSuccess: (response: AxiosResponse) => {
                const dataRes = response.data

                queryClient.setQueryData(["pallet-by-branch"], (currentData: any) => {
                    let exists = false
                    let myData: any[] = []

                    currentData.map((branch: any) => {
                        branch.current_location === dataRes.current_location ? () => {
                            exists = true
                            myData.push(dataRes)
                        } : myData.push(branch)
                    })

                    if (!exists) myData.push(dataRes)

                    return myData
                })

                MainMessage.Ok(toaster, "Sucesso - Paletes criados.")

                close()
            },
            onError: (error: AxiosError) => {
                let message = {
                    current_location: "Filial",
                    quantity_pallets: "Quantidade de Paletes",
                    type_pallet: 'Tipo Palete',
                }

                MainMessage.Error400(toaster, error, message)
                MainMessage.Error401(toaster, error)
                MainMessage.Error500(toaster, error)
            }
        })

        const close = () => {
            setOpen(false)
            setOpenInfo(true)

            setData({
                quantity_pallets: null,
                current_location: null,
                type_pallet: null,
                author: me.id
            })
        }

        return (
            <MainModal.Form open={open} close={close} data={data} setData={setData} send={mutate} overflow={false} size="md" >
                <MainModal.Header title="Adicionar Paletes" />
                <MainModal.Body>
                    <MainFormComponent.Row>
                        <MainFormComponent.SelectPicker text="Filial:" name="current_location" data={BranchesChoices} />
                        <MainFormComponent.SelectPicker text="Tipo Palete:" name="type_pallet" data={TypePalletChoices} />
                    </MainFormComponent.Row>
                    <MainFormComponent.Row>
                        <MainFormComponent.InputNumber text="Quantidade Paletes:" name="quantity_pallets" />
                    </MainFormComponent.Row>
                </MainModal.Body>
                <MainModal.FooterForm name="Adicionar" close={close} />
            </MainModal.Form>
        )
    }
)
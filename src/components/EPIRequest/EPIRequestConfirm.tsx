import { Form, useToaster, Message, Panel } from "rsuite";

import { memo, useState, useContext } from "react";
import { useMutation } from "react-query";

// import { AxiosError, AxiosResponse } from "axios";
import { useApi } from "../../hooks/Api";
import { UserContext } from "../../providers/UserProviders";
import { DateToString } from "../../services/Date";
import { queryClient } from "../../services/QueryClient";
import { ColumnsInterface, EpiRequestInterface } from "../../services/Interfaces";

import { MainModal } from "../Global/Modal";
import { MainTable } from "../Global/Table";
import { MainMessage } from "../Global/Message";
import { MainFormComponent } from "../Global/Component/Form";

interface Form {
    employee: number | null;
    employee_name: string | null;
    attachment_confirm: any;
    status: string;
    date_confirmed: string | null;
    author_confirm: number;
}

interface EPIRequestConfirmProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    row: EpiRequestInterface | undefined;
}


export const EPIRequestConfirm = memo(
    function EPIRequestConfirm({ open, setOpen, row }: EPIRequestConfirmProps) {
        const { me, userChoices }: any = useContext(UserContext)
        const api = useApi(true)
        const toaster = useToaster()

        const initialData = {
            employee: null,
            employee_name: null,
            status: "CONCLUIDO",
            date_confirmed: DateToString(new Date()),
            attachment_confirm: [],
            author_confirm: me.id
        }
        const [data, setData] = useState<Form>(initialData)

        const confirm = async () => {
            let body = { ...data }

            if (!body.employee) body.employee = row?.employee?.id || null

            body.employee_name = null

            if (!body.employee) {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Adicione um Funcionário.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }

            if (body.attachment_confirm.length > 0) {
                body.attachment_confirm = body.attachment_confirm[0].blobFile
            } else {
                let message = (
                    <Message showIcon type="error" closable >
                        Erro - Adicione um Anexo.
                    </ Message>
                )
                throw toaster.push(message, { placement: "topEnd", duration: 4000 })
            }

            return await api.patch(`epis/requests/${row?.id}/`, { ...body })
        }

        const { mutate } = useMutation({
            mutationKey: ["epis-requests"],
            mutationFn: confirm,
            onSuccess: (response: any) => {
                let dataRes = response.data

                queryClient.setQueryData(["epis-requests"], (currentData: any) => {
                    return currentData.filter((request: EpiRequestInterface) => request.id !== dataRes.id)
                })

                MainMessage.Ok(toaster, "Sucesso - Registro confirmado.")

                close()
            },
            onError: (error: any) => {
                const listMessage = {
                    observation: "Número Solicitação",
                    service_order: "Filial",
                    date_forecast: "Solicitante",
                    date_release: "Anexo"
                }

                MainMessage.Error400(toaster, error, listMessage)
                MainMessage.Error401(toaster, error)
            }
        })

        const columns: ColumnsInterface = {
            "Item": { dataKey: "size.item.description", propsColumn: { flexGrow: 1 } },
            "CA": { dataKey: "size.item.ca", propsColumn: { flexGrow: 1 } },
            "Tamanho": { dataKey: "size.size", propsColumn: { flexGrow: 1 } },
            "Quantidade": { dataKey: "quantity", propsColumn: { flexGrow: 1 } },
        }


        const close = () => {
            setOpen(false)
            setData(initialData)
        }

        return (
            <MainModal.Form open={open} close={close} send={mutate} data={data} setData={setData} size="md" overflow={false}>
                <MainModal.Header title="Confirmar Solicitação" />
                <MainModal.Body>
                    <Panel header="Informações da Solicitação:">
                        <MainTable.Root data={row ? row.epis_carts : []} columns={columns} isLoading={false} pagination={false}
                            cellBordered bordered autoHeight />
                    </Panel>
                    <Panel>
                        <MainFormComponent.Row>
                            {!row?.employee && (
                                <MainFormComponent.SelectPicker text="Funcionário:" name="employee" data={userChoices} />
                            )}
                            <MainFormComponent.Uploader text="Anexo:" name="attachment_confirm" />
                        </MainFormComponent.Row>
                    </Panel>
                </MainModal.Body >
                <MainModal.FooterForm name="Confirmar Entrega" close={close} />
            </MainModal.Form >
        );
    });

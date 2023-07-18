import { IconButton, Table } from "rsuite";
import { RowDataType } from "rsuite/esm/Table";
import { Icon } from '@rsuite/icons';

import { useState } from "react";

import { ColumnsInterface } from "../../services/Interfaces";
import { MainTable } from ".";

const { Column, HeaderCell, Cell } = Table;

interface TableRootProps<T extends readonly RowDataType<never>[]> {
    data: T;
    columns: ColumnsInterface;
}

const accessesUser: string[] = ["solic_compras_edit"]


export function TableRoot<T extends readonly RowDataType<never>[]>({ data, columns }: TableRootProps<T>) {
    console.log("tabela")

    const [page, setPage] = useState<number>(1);
    const handlePageChange = (page_: number) => {
        setPage(page_)
    };

    return (
        <>
            <Table
                height={400}
                data={data}
            >
                {
                    Object.entries(columns).map((key, index) => {
                        const title = key[0]
                        const dataKey = key[1]["dataKey"]
                        const click = key[1]["click"]
                        const icon = key[1]["icon"]
                        const url = key[1]["url"]
                        const needAuth = key[1]["needAuth"] || false
                        const auth = key[1]["auth"]

                        const column = {
                            width: key[1]["width"] || 150,
                            align: key[1]["align"] || "center",
                            fixed: key[1]["fixed"],
                            key: index,
                        }

                        let access = true
                        if (needAuth) {
                            if (auth) {
                                if (accessesUser.includes(auth)) {
                                    access = true
                                } else {
                                    access = false
                                }
                            } else {
                                access = false
                            }
                        }

                        return (
                            dataKey === "button" && click && access && (
                                <Column {...column} >
                                    <HeaderCell>{title}</HeaderCell>
                                    <Cell style={{ padding: '6px' }}>
                                        {rowData => {
                                            return <IconButton icon={<Icon as={icon} />} onClick={() => click(rowData)} />
                                        }}
                                    </Cell>
                                </Column>
                            ) ||
                            dataKey === "link" && access && (
                                <Column {...column} >
                                    <HeaderCell>{title}</HeaderCell>
                                    <Cell style={{ padding: '6px' }}>
                                        {rowData => {
                                            return <a href={`${url}${rowData.id}/`} rel="noreferrer" target="_blank" >
                                                <IconButton icon={<Icon as={icon} />} />
                                            </a>
                                        }}
                                    </Cell>
                                </Column>
                            ) ||
                            <Column {...column} >
                                <HeaderCell>{title}</HeaderCell>
                                <Cell dataKey={dataKey} />
                            </Column>
                        )
                    })
                }
            </Table >
            <MainTable.Pagination total={data.length} page={page}
                handlePageChange={handlePageChange} />
        </>
    )
}
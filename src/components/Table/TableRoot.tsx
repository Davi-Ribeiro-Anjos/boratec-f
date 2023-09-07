import { IconButton, Table, TableProps } from "rsuite";
import { Icon } from '@rsuite/icons';

import { memo, useContext, useState } from "react";

import { ColumnsInterface } from "../../services/Interfaces";
import { MainTable } from ".";
import { UserContext } from "../../providers/UserProviders";

const { Column, HeaderCell, Cell } = Table;

interface TableRootProps extends TableProps<any, any> {
    data: any;
    columns: ColumnsInterface;
    isLoading: boolean;
    limit?: number;
}


export const TableRoot = memo(
    function TableRoot({ data, columns, isLoading, limit = 30, ...props }: TableRootProps) {
        console.log("tabela")

        const { verifyPermission }: any = useContext(UserContext)

        const [page, setPage] = useState<number>(1)

        const dataFiltered = data.filter((v: any, i: number) => {
            v
            const start = limit * (page - 1);
            const end = start + limit;
            return i >= start && i < end;
        })

        return (
            <>
                <Table
                    height={400}
                    data={dataFiltered}
                    loading={isLoading}
                    hover={false}
                    {...props}
                >
                    {
                        Object.entries(columns).map((key, index) => {
                            const title = key[0]
                            const dataKey = key[1].dataKey
                            const propsColumn = key[1].propsColumn
                            const propsIcon = key[1].propsIcon
                            const click = key[1].click
                            const icon = key[1].icon
                            const url = key[1].url
                            const auth = key[1].auth

                            const column = {
                                ...propsColumn,
                                align: propsColumn?.align || "center",
                                key: index,
                            }

                            let access = true
                            if (auth) {
                                if (!verifyPermission(auth)) {
                                    access = false
                                }
                            }

                            return (
                                dataKey === "button" && click && access && (
                                    <Column {...column} >
                                        <HeaderCell>{title}</HeaderCell>
                                        <Cell style={{ padding: '6px' }}>
                                            {rowData => {
                                                return <IconButton {...propsIcon} icon={<Icon as={icon} />} onClick={() => click(rowData)} />
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
                                                    <IconButton {...propsIcon} icon={<Icon as={icon} />} />
                                                </a>
                                            }}
                                        </Cell>
                                    </Column>
                                ) || access && (
                                    <Column {...column} >
                                        <HeaderCell>{title}</HeaderCell>
                                        <Cell dataKey={dataKey} />
                                    </Column>
                                )
                            )
                        })
                    }
                </Table >
                <MainTable.Pagination total={data ? data.length : 0} page={page} setPage={setPage} limit={limit} />
            </>
        )
    })
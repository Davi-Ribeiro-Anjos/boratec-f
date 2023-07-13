import { Table, Pagination } from "rsuite";

import { useState } from "react";

interface MainTableProps {
    data: any;
    columns: any;
    children: React.ReactNode;

}

const { Column, HeaderCell, Cell } = Table;


export function MainTable({ data, columns, children }: MainTableProps) {
    console.log("table")

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);

    const getData = () => {
        if (data.length > 0) {
            const dataFilter = data.filter((v, i) => {
                const start = limit * (page - 1);
                const end = start + limit;
                return i >= start && i < end;
            });

            return dataFilter;
        }
    };

    const handleChangeLimit = (dataKey: number) => {
        setPage(1);
        setLimit(dataKey);
    };

    return (
        <>
            <Table
                height={420}
                data={getData()}
            >
                {
                    Object.entries(columns).map((key: any, index) => {
                        const myColumn = {
                            title: key[0],
                            dataKey: key[1]["dataKey"],
                            width: key[1]["width"],
                            align: key[1]["align"],
                            fixed: key[1]["fixed"],
                            click: key[1]["click"],
                            icon: key[1]["icon"],
                            url: key[1]["url"],
                            needAuth: key[1]["needAuth"] || false
                        }

                        return (
                            <Column width={myColumn.width || 150} align={myColumn.align || "center"} fixed={myColumn.fixed || false} key={index} >
                                <HeaderCell>{myColumn.title}</HeaderCell>
                                <Cell dataKey={myColumn.dataKey} />
                            </Column>
                        )

                    })
                }
            </Table >
            {children}
            < div style={{ padding: 20 }
            } >
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size="md"
                    layout={['total', '-', 'limit', '|', 'pager', '-', 'skip']}
                    total={data.length}
                    limitOptions={[30, 50, 100]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div >
        </>
    );
};
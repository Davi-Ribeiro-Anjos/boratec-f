import { Table, Pagination } from "rsuite";

import { memo, useState, useEffect } from "react";

interface MainTableProps {
    data: any;
    columns: any;
    searchData: () => any;
}

const { Column, HeaderCell, Cell } = Table;


function MainTable({ data, columns, searchData }: MainTableProps) {
    console.log("main table")

    let page: number = 1;
    let limit: number = 30;

    const getData = () => {
        if (data.length > 0) {
            const dataFilter = data.filter((v: any, i: number) => {
                const start = limit * (page - 1);
                const end = start + limit;
                return i >= start && i < end;
            });

            return dataFilter;
        }
    };

    useEffect(() => {
        searchData()
    }, [])

    const changePage = (newPage: number) => {
        page = newPage;
    }

    const handleChangeLimit = (dataKey: number) => {
        page = 1;
        limit = dataKey;
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
                        }

                        return (
                            <Column align="center" width={myColumn.width || 150} key={index} >
                                <HeaderCell>{myColumn.title}</HeaderCell>
                                <Cell dataKey={myColumn.dataKey} />
                            </Column>
                        )

                    })
                }
            </Table >
            <div style={{ padding: 20 }}>
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
                    onChangePage={changePage}
                    onChangeLimit={handleChangeLimit}
                />
            </div >
        </>
    );
};

export default MainTable;
import { Pagination, PaginationProps } from "rsuite";

interface TablePaginationProps extends PaginationProps {
    data: any[];
    page: number;
    setPage: (page: number) => void;
    limit: number;
    handleChangeLimit: (limit: number) => void;
}


export function TablePagination({ data, page, setPage, limit, handleChangeLimit, ...props }: TablePaginationProps) {
    return (
        <div style={{ padding: 20 }}>
            <Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                maxButtons={5}
                {...props}
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
    )
}
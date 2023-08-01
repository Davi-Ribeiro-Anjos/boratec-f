import { Pagination, PaginationProps } from "rsuite";

interface TablePaginationProps extends PaginationProps {
    total: number;
    page: number;
    setPage: any;
}


export function TablePagination({ total, page, setPage, ...props }: TablePaginationProps) {
    console.log("paginacao")

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
                size="md"
                layout={['total', '-', '|', 'pager', '-', 'skip']}
                limitOptions={[10, 30, 50]}
                total={total}
                activePage={page}
                onChangePage={setPage}
                {...props}
            />
        </div >
    )
}
import { Pagination, PaginationProps } from "rsuite";

interface TablePaginationProps extends PaginationProps {
    total: number;
    page: number;
    setPage: any;
}


export function TablePagination({ total, page, setPage, ...props }: TablePaginationProps) {
    return (
        <div style={{ padding: 20 }}>
            <Pagination
                prev
                next
                first={window.innerWidth > 400 ? true : false}
                last={window.innerWidth > 400 ? true : false}
                ellipsis
                boundaryLinks
                maxButtons={5}
                size="md"
                layout={window.innerWidth > 400 ? ['total', '-', 'pager', '-', 'skip'] : ['total', '-', 'pager']}
                total={total}
                activePage={page}
                onChangePage={setPage}
                {...props}
            />
        </div >
    )
}
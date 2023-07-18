import { Pagination, PaginationProps } from "rsuite";

interface TablePaginationProps extends PaginationProps {
    total: number;
    page: number;
    handlePageChange: (page: number) => void;
}


export function TablePagination({ total, page, handlePageChange, limit = 50, ...props }: TablePaginationProps) {
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
                total={total}
                limit={limit}
                activePage={page}
                onChangePage={handlePageChange}
                {...props}
            />
        </div >
    )
}
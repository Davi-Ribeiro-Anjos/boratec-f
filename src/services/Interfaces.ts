import { ColumnProps } from "rsuite";

interface Column extends ColumnProps {
    dataKey: string;
    url?: string;
    needAuth?: boolean;
    icon?: any;
    auth?: string;
    click?: (rowData: any) => void;
}

export interface ColumnsInterface {
    [key: string]: Column;
}
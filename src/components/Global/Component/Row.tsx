import { Row } from "rsuite";
import { styles } from "../../../assets/styles";

import { ReactNode } from "react";

interface RowInterface {
    children: ReactNode;
}

export default function MainRow({ children }: RowInterface) {
    return (
        <Row style={styles.row}>
            {children}
        </Row>
    )
}
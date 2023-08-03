import { ReactNode } from "react"

interface DrawerBodyProps {
    children: ReactNode
}

const styles = {
    body: {
        padding: 15
    }
}


export function DrawerBody({ children }: DrawerBodyProps) {
    return (
        <div style={styles.body}>
            {children}
        </div>
    )
}
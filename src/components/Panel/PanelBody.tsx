import { ReactNode } from "react"

interface PanelBodyProps {
    children: ReactNode
}

export function PanelBody({ children }: PanelBodyProps) {
    return (
        <div>
            {children}
        </div>
    )
}
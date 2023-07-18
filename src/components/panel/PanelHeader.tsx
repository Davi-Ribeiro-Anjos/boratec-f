import { ReactNode, memo } from "react";

interface PanelHeaderProps {
    title?: string;
    children?: ReactNode
}


export const PanelHeader = memo(function PanelHeader({ title, children }: PanelHeaderProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>{title}</h2>
            {children}
        </div>
    )
})
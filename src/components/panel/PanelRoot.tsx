import { Panel, PanelProps } from "rsuite";

import { ReactNode } from "react";

interface PanelRootProps extends PanelProps {
    width?: number;
    children: ReactNode
}


export function PanelRoot({ width = 95, children, ...rest }: PanelRootProps) {
    return (
        <Panel {...rest} style={{ margin: "20px auto", width: `${width}%` }}>
            {children}
        </Panel>
    )
}
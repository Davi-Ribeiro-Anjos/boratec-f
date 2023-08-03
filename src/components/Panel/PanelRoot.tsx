import { Panel, PanelProps } from "rsuite";

import { ReactNode } from "react";

interface PanelRootProps extends PanelProps {
    width?: number;
    children: ReactNode
}


export function PanelRoot({ width = 95, children, ...props }: PanelRootProps) {
    return (
        <Panel style={{ margin: "20px auto", width: `${width}%` }} {...props} >
            {children}
        </Panel>
    )
}
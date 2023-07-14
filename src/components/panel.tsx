import { Panel } from "rsuite";

import React from "react";

interface MainPanelProps {
    title?: string;
    width?: number;
    collapsible?: boolean;
    bordered?: boolean;
    children: React.ReactNode;
}


export const MainPanel = ({ title, width = 95, collapsible = false, bordered = false, children }: MainPanelProps) => {
    console.log("main painel")

    const shaded = bordered ? false : true;

    return (
        <Panel header={title} style={{ margin: "20px auto", width: `${width}%`, }} collapsible={collapsible} bordered={bordered} shaded={shaded}  >
            {children}
        </Panel>
    )
}
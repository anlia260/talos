import React from "react";
import { createDevTools } from "redux-devtools";
import LogMonitor from "redux-devtools-log-monitor";
import DockMonitor from "redux-devtools-dock-monitor";

const tooltipOptions = {
    disabled: false,
    offset: { left: 30, top: 10 },
    indentationSize: 2,
    style: {
        "background-color": "lightgrey",
        opacity: "0.7",
        "border-radius": "5px",
        padding: "5px"
    }
};

export default createDevTools(
    <DockMonitor
        defaultIsVisible={false}
        toggleVisibilityKey="ctrl-h"
        changePositionKey="ctrl-q"
    >
        <LogMonitor />
    </DockMonitor>
);

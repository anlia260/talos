import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import Root from "Container/Root";
import configureStore from "./redux/store";

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const init = () => {
    renderDom(Root);
    if (module.hot) {
        module.hot.accept("Container/Root", () => {
            const App = require("Container/Root").default;
            renderDom(App);
        });
    }
};

const renderDom = Root => {
    render(
        <Root store={store} history={history} />,
        document.getElementById("root")
    );
};

init();

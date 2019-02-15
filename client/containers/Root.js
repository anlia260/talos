import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Router } from "react-router";
import routes from "Constant/Routes";

export default class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    renderDevTool (){
        if(process.env.NODE_ENV === "development"){
            const DevTools = require("./DevTools").default
            return <DevTools />;
        }
        return null;
    }

    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <div>
                    <Router history={history} routes={routes} />
                    {this.renderDevTool()}
                </div>
            </Provider>
        );
    }
}
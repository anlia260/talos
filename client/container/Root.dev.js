import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import DevTools from "./DevTools";
import routes from "../routes";
import { Router } from "react-router";

export default class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        const { store, history } = this.props;
        let state = this.props.store.getState();
        return (
            <Provider store={store}>
                <div>
                    <Router history={history} routes={routes} />
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

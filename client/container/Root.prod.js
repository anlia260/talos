import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import routes from "../routes";
import { Router } from "react-router";

export default class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        const { store, history } = this.props;
        const state = store.getState();
        return (
            <Provider store={store}>
                <Router history={history} routes={routes} />
            </Provider>
        );
    }
}

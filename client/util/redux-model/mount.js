import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import React from "react";

import { ACTION_KEY, isObject } from "./utils";

const filterActions = (actions, filters) => {
    let ret = {};
    filters = typeof filters === "string" ? [filters] : filters;
    if (Array.isArray(filters)) {
        filters.forEach(mod => {
            Object.assign(ret, actions[mod]);
        });
    } else if (isObject(filters)) {
        ret = filters;
    }
    return ret;
};

const appendGlobalActions = (toAdd, source) => {
    return {
        ...toAdd,
        ...source
    };
};

export default function(mapStateToProps, mapDispatchToProps) {
    return factory => {
        const newMapStateToProps = state => {
            let oldProps = mapStateToProps(state);
            let loading = null;
            // 是否启用 loading
            if (
                typeof state.loading === "object" &&
                typeof state.loading.actions === "object"
            ) {
                loading = state.loading.actions;
            }
            return loading
                ? {
                      loading,
                      ...oldProps
                  }
                : oldProps;
        };

        class Wrapper extends React.Component {
            componentWillMount() {
                const state = this.context.store.getState();
                const actions = state[ACTION_KEY] || {};
                this.mapDis = dispatch => {
                    let injectActions = actions;
                    if (mapDispatchToProps) {
                        injectActions = mapDispatchToProps(actions);
                        injectActions = filterActions(actions, injectActions);
                        injectActions = appendGlobalActions(
                            actions["global"] || {},
                            injectActions
                        );
                    }
                    return {
                        actions: bindActionCreators(injectActions, dispatch)
                    };
                };
                // new Component
                this.Com = connect(
                    newMapStateToProps,
                    this.mapDis
                )(factory);
            }
            componentWillUnmount() {
                this.mapDis = this.Com = null;
            }
            render() {
                return React.createElement(this.Com, this.props);
            }
        }

        Wrapper.contextTypes = {
            store: PropTypes.shape({
                subscribe: PropTypes.func.isRequired,
                dispatch: PropTypes.func.isRequired,
                getState: PropTypes.func.isRequired
            })
        };

        return Wrapper;
    };
}

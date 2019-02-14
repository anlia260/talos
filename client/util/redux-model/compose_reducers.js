import {
    ACTION_KEY,
    INIT_ACTION,
    NAMESPACE,
    merge,
    INIT_ACTION_DEVTOOLS,
    isSourceType,
    generateType,
    LOADING_NAMESPACE
} from "./utils";

const mergeReducers = (reducers, mod) => {
    let maps = {};
    Object.keys(reducers).forEach(key => {
        let newKey = key;
        if (!isSourceType(key)) {
            newKey = generateType(key, mod);
        }
        maps[newKey] = reducers[key];
        reducers[key].module = mod;
    });

    return maps;
};

// TODO: 正常的action_type不能有.
const resetActionType = action => {
    let type = action.type;
    if (~type.indexOf(".")) {
        // moduleName.reducerName
        let names = type.split(".");
        action.type = generateType(names[1], names[0]);
    }
    return action;
};

const addActionType = (actionCreator, type) => {
    return function() {
        let action = actionCreator.apply(null, arguments);
        if (action.type) {
            // actionCreator跨模块调用reducer
            // moduleName.reducer
            return resetActionType(action);
        } else {
            if (action.payload) {
                return {
                    type,
                    ...action
                };
            } else {
                return {
                    type,
                    payload: action
                };
            }
        }
    };
};

// loading.actions 下面不添加的模块
const ignoreNamespaceActions = ["routing"];
ignoreNamespaceActions.push(LOADING_NAMESPACE);

const extendLoadingActions = (state, models) => {
    let loading = state[LOADING_NAMESPACE];
    if (!loading) return state;
    Object.keys(models).forEach(mod => {
        const realModuleName = models[mod][NAMESPACE] || mod;
        if (ignoreNamespaceActions.indexOf(realModuleName) === -1) {
            loading.actions[realModuleName] = {};
        }
    });
    return {
        ...state,
        [`${LOADING_NAMESPACE}`]: loading
    };
};

const getInitState = models => {
    let state = {
        [ACTION_KEY]: {}
    };
    Object.keys(models).forEach(mod => {
        let model = models[mod];
        const realModuleName = model[NAMESPACE] || mod;
        if (realModuleName !== "global") {
            if (model.state) {
                state[realModuleName] = Array.isArray(model.state)
                    ? [...model.state, state[realModuleName]].filter(i => i)
                    : Object.assign(state[realModuleName] || {}, model.state);
            } else if (typeof model === "function") {
                state[realModuleName] = model(undefined, {
                    type: INIT_ACTION
                });
            } else {
                state[realModuleName] = {};
            }
        }

        // store all actions
        if (model.actions) {
            state[ACTION_KEY][realModuleName] = Object.assign(
                state[ACTION_KEY][realModuleName] || {},
                Object.keys(model.actions).reduce((a, key) => {
                    a[key] = addActionType(
                        model.actions[key],
                        generateType(key, realModuleName)
                    );
                    return a;
                }, {})
            );
        }
    });
    return extendLoadingActions(state, models);
};

export default function(models) {
    const mods = Object.keys(models);
    let reducerMaps = {};
    let extra = {};
    mods.forEach(mod => {
        let model = models[mod];
        let modReducer = model.reducers;
        if (!modReducer) {
            if (typeof model === "function") {
                extra[mod] = model;
            }
        } else {
            merge(
                reducerMaps,
                mergeReducers(modReducer, model[NAMESPACE] || mod)
            );
        }
    });

    let initState = getInitState(models);
    return (state, action) => {
        const { type } = action;
        if (!type) {
            console.log("composeReducers: action must hava a type property !");
            return state;
        }
        if (type === INIT_ACTION || type == INIT_ACTION_DEVTOOLS)
            return initState;
        const reducer = reducerMaps[type];
        let change = {};
        if (reducer) {
            if (Array.isArray(reducer)) {
                reducer.forEach(fn => {
                    if (fn.module === "global") {
                        change = {
                            ...change,
                            ...fn(state, action)
                        };
                    } else {
                        change[fn.module] = fn(state[fn.module], action);
                    }
                });
            } else if (typeof reducer === "function") {
                if (reducer.module === "global") {
                    change = reducer(state, action);
                } else {
                    change[reducer.module] = reducer(
                        state[reducer.module],
                        action
                    );
                }
            }
        }

        Object.keys(extra).forEach(key => {
            change[key] = extra[key](state[key], action);
        });
        return {
            ...state,
            ...change
        };
    };
}

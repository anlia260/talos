import {
    INNER_LOADING,
    reverseType,
    LOADING_NAMESPACE,
    isObject
} from "./utils";

export default {
    namespace: LOADING_NAMESPACE,
    state: {
        global: false,
        models: {},
        actions: {}
    },
    reducers: {
        [`${INNER_LOADING}`]: function(state, { payload }) {
            let { actions, global } = state;

            let { type, loading } = payload;
            loading = !!loading;
            if (type) {
                let { namespace, actionType } = reverseType(type);
                let changedLoading = {};
                if (namespace && actionType) {
                    // changedLoading[namespace] = changedLoading[namespace] || {};
                    changedLoading[namespace] = Object.assign(
                        {},
                        state.actions[namespace] || {}
                    );
                    changedLoading[namespace][actionType] = loading;
                } else {
                    changedLoading[`${type}`] = loading;
                }
                actions = {
                    ...state.actions,
                    ...changedLoading
                };
            }

            global = loading
                ? true
                : Object.keys(actions).some(action => {
                      let value = actions[action];
                      return isObject(value)
                          ? Object.keys(value).some(
                                actionName => value[actionName]
                            )
                          : value;
                  });
            return {
                ...state,
                global,
                actions
            };
        }
    }
};

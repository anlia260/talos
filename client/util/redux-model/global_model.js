const toString = Object.prototype.toString;

const isObject = obj => toString.call(obj) === "[object Object]";

let deepMerge = (keys, source, value) => {
    if (!keys.length) return { ...source };
    let key;
    if (keys.length == 1) {
        key = keys[0];
        return {
            ...source,
            [key]: isObject(value)
                ? {
                      ...(source[key] || {}),
                      ...value
                  }
                : value
        };
    } else {
        key = keys.splice(0, 1);
        return {
            ...source,
            [key]: deepMerge(keys, source[key] || {}, value)
        };
    }
};

export default {
    namespace: "global",
    actions: {
        setStore: (namespace, key, value) => {
            return {
                payload: {
                    namespace,
                    key,
                    value
                }
            };
        }
    },
    reducers: {
        setStore: (state, { payload }) => {
            let { key, namespace, value } = payload;
            let keys = key.split(".");
            return {
                ...state,
                [namespace]: deepMerge(keys, state[namespace], value)
            };
        }
    }
};

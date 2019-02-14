// key property for storing all actions
export const ACTION_KEY = "__actions__";

// initial action type from redux
export const INIT_ACTION = "@@redux/INIT";

// devtools 把 init_type 篡改了
export const INIT_ACTION_DEVTOOLS = "@@INIT";

// keywords from namespace
export const NAMESPACE = "namespace";

export const INNER_LOADING = "INNER_LOADING";

export const LOADING_NAMESPACE = "loading";

// 对外导出action
export const loadingAction = params => {
    return {
        type: INNER_LOADING,
        payload: params
    };
};

const SPECIAL_SPEPERATOR = "$";

// 判断reducer的name是actionCreator的name，还是真实的type
// 其他的都需要用加上前缀
// 真实的type全部用大写？
export const isSourceType = type => {
    return /^[A-Z\_]*$/.test(type);
};
export const copyConditionalProps = (props, isEvery = true) => {
    return Object.keys(props).reduce((ret, key) => {
        let isCopy = typeof isEvery === "function" ? isEvery(key) : isEvery;
        isCopy && (ret[key] = props[key]);
        return ret;
    }, {});
};

// action type  生成规则，自动加上module前缀
export const generateType = (name, mod) => {
    if (!mod) return name;
    return [mod, name].join(SPECIAL_SPEPERATOR);
};

// 根据type，反向获取mod 和 function name
export const reverseType = type => {
    if (~type.indexOf(SPECIAL_SPEPERATOR)) {
        let [namespace, actionType] = type.split(SPECIAL_SPEPERATOR);
        return {
            namespace,
            actionType
        };
    } else {
        return {
            actionType: type
        };
    }
};

export const merge = (dist = {}, source) => {
    if (!source) return dist;
    Object.keys(source).forEach(key => {
        if (dist[key]) {
            // 同一个action_type，对应多个处理reducer
            if (typeof dist[key] === "function") {
                dist[key] = [dist[key], source[key]];
            } else {
                dist[key].push(source[key]);
            }
        } else {
            dist[key] = source[key];
        }
    });
    return dist;
};

const toString = Object.prototype.toString;

export const isObject = obj => toString.call(obj) === "[object Object]";

// undefind或空对象
export const isStateEmpty = state => {
    if (typeof state === "undefined") return true;
    if (isObject(state) && Object.keys(state).length === 0) return true;
    return false;
};

export const getAllActions = state => {
    return state && state[ACTION_KEY] ? state[ACTION_KEY] : {};
};

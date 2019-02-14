import { routerReducer as routing } from "react-router-redux";
import { composeReducers, loading } from "redux-model";
import todos from "./todos";
import todoModel from "Container/todos/model";

const rootReducer = composeReducers({
    loading,
    routing,
    todoModel,
    todos
});

export default rootReducer;

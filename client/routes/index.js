import Todo from "Container/todo/index";
import Todos from "Container/todos/index";

export default {
    path: "/",
    indexRoute: { component: Todo },
    childRoutes: [
        { path: "/todo", component: Todo, childRoutes: [] },
        { path: "/todos", component: Todos, childRoutes: [] }
    ]
};

import Todo from "../container/todo/index";

export default {
    path: "/",
    indexRoute: { component: Todo },
    childRoutes: [{ path: "/todo", component: Todo, childRoutes: [] }]
};

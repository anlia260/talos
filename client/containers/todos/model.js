export default {
    namespace: "todoModel",
    state: [
        {
            text: "Use ReduxModel",
            completed: false,
            id: 0
        }
    ],
    actions: {
        addTodo: text => ({ text }),
        deleteTodo: id => ({ id }),
        editTodo: (id, text) => ({ id, text }),
        completeTodo: id => ({ id }),
        completeAll: () => ({}),
        clearCompleted: () => ({})
    },
    reducers: {
        addTodo: (state, { payload }) => {
            let id =
                state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
            return [
                ...state,
                {
                    id,
                    completed: false,
                    text: payload.text
                }
            ];
        },
        deleteTodo: (state, { payload }) =>
            state.filter(todo => todo.id !== payload.id),
        editTodo: (state, { payload }) =>
            state.map(todo =>
                todo.id === payload.id
                    ? Object.assign({}, todo, { text: payload.text })
                    : todo
            ),
        completeTodo: (state, { payload }) =>
            state.map(todo =>
                todo.id === payload.id
                    ? Object.assign({}, todo, { completed: !todo.completed })
                    : todo
            ),
        completeAll: state => {
            const areAllMarked = state.every(todo => todo.completed);
            return state.map(todo =>
                Object.assign({}, todo, { completed: !areAllMarked })
            );
        },
        clearCompleted: state => state.filter(todo => todo.completed === false)
    }
};

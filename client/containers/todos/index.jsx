import React, { Component } from "react";
import { mount } from "redux-model";
import Header from "Components/todo/Header";
import MainSection from "Components/todo/MainSection";
import "../todo/style.less";

@mount(state => ({ todos: state.todoModel }), actions => ["todoModel"])
export default class Todo extends Component {
    render() {
        const { actions, todos } = this.props;
        return (
            <div className="todoapp">
                <Header addTodo={actions.addTodo} />
                <MainSection todos={todos} actions={actions} />
            </div>
        );
    }
}

import React, { Component } from "react";
import { mount } from "redux-model";
import "../todo/style.less";
import Header from "Components/todo/Header";
import MainSection from "Components/todo/MainSection";

@mount(state => ({ todos: state.todoModel }), actions => ["todoModel"])
export default class App extends Component {
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

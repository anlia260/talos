import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as TodoActions from "Actions";
import Header from "components/todo/Header";
import MainSection from "components/todo/MainSection";
import "./style.less";

const mapStateToProps = (state) => ({ todos: state.todos });

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(TodoActions, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
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

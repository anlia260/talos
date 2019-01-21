import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as TodoActions from "Actions";
import "./style.less";
import Header from "Components/todo/Header";
import MainSection from "Components/todo/MainSection";

class App extends Component {
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

const mapStateToProps = state => ({ todos: state.todos });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

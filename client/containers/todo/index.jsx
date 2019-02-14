import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { mount } from "redux-model";
import * as TodoActions from "Actions";
import "./style.less";
import Header from "Components/todo/Header";
import MainSection from "Components/todo/MainSection";
class App extends Component {
    componentDidMount() {
        const banners = [Header, MainSection];
        banners.forEach(banner => {
            banner.defaultProps = { a: 1 };
            console.log(<banner />);
        });
    }

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

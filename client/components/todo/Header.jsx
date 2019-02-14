import React, { Component } from "react";
import TodoTextInput from "./TodoTextInput";
import PropTypes from "prop-types";

class Header extends Component {
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    };

    componentDidMount() {
        console.log(this.props);
    }

    handleSave(text) {
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <TodoTextInput
                    newTodo
                    onSave={this.handleSave.bind(this)}
                    placeholder="What needs to be done?"
                />
            </header>
        );
    }
}
Header.defaultProps = { b: 2 };
export default Header;

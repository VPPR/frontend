import React from "react";
import { connect } from "react-redux";

import {login} from 'redux/auth/action.js'
const validEmailRegex = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {
        username: "",
        password: "",
      },
    };
  }

  handleInputChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    this.setState({
      [field]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.state.errors;

    if (errors.username.length !== 0 || errors.password.length !== 0) return;

    if (this.state.username.length === 0 || this.state.password.length === 0) {
      return;
    }
    this.props.login({
      username: this.state.username,
      password: this.state.password,
    });
  };

  validateField = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    const errors = this.state.errors;

    switch (name) {
      case "username":
        errors.username = validEmailRegex.test(value)
          ? ""
          : "Your Email ID does not look right 🤔";
        break;

      case "password":
        errors.password = value.length > 0
          ? ""
          : "Please enter a valid password 🥺";
        break;

      default:
        break;
    }

    this.setState({ errors });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="username"
          onChange={this.handleInputChange}
          onBlur={this.validateField}
        />
        <input
          name="password"
          type="password"
          onChange={this.handleInputChange}
          onBlur={this.validateField}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
  accessToken: state.auth.accessToken,
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, { login })(Login);

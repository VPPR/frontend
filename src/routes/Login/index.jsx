import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "redux/auth/action.js";
import { Button, Grid, Paper, TextField } from "@material-ui/core";

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
    }, this.props.userType);
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
      <Paper component={Grid} item container direction="column" xs={8} md={4}>
        <form
          onSubmit={this.handleSubmit}
          style={{ display: "flex", flexDirection: "column", padding: "2em" }}
        >
          <TextField
            name="username"
            type="email"
            label="Email ID"
            value={this.state.username}
            onChange={this.handleInputChange}
            onBlur={this.validateField}
            helperText={this.state.errors.username}
            error={!!this.state.errors.username}
          />

          <TextField
            name="password"
            type="password"
            label="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            onBlur={this.validateField}
            helperText={this.state.errors.password}
            error={!!this.state.errors.password}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ margin: "2em 0em" }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
  accessToken: state.auth.accessToken,
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading,
});

export default withRouter(connect(mapStateToProps, { login })(Login));
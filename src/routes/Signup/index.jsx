import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signup } from "redux/auth/action";
import { Button, Grid, Paper, TextField } from "@material-ui/core";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      email: "",
      password: "",
      errors: {
        fullname: "",
        email: "",
        password: "",
      },
    };
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    this.setState({
      [field]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { fullname, email, password } = this.state;

    this.props.signup({
      fullname,
      email,
      password,
    });
  };

  render() {
    return (
      <Paper component={Grid} item container direction="column" xs={8} md={4}>
        <form
          onSubmit={this.handleSubmit}
          style={{ display: "flex", flexDirection: "column", padding: "2em" }}
        >
          <TextField
            name="fullname"
            label="Full Name"
            onChange={this.handleInputChange}
            value={this.state.fullname}
          >
          </TextField>
          <TextField
            name="email"
            label="Email ID"
            onChange={this.handleInputChange}
            value={this.state.email}
          >
          </TextField>
          <TextField
            name="password"
            type="password"
            label="Password"
            onChange={this.handleInputChange}
            value={this.state.password}
          >
          </TextField>
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
});
export default withRouter(connect(mapStateToProps, { signup })(Signup));

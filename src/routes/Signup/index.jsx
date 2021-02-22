import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signup } from "redux/auth/action";
import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
  CircularProgress
} from "@material-ui/core";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      email: "",
      password: "",
      phone: "",
      is_admin: false,
      errors: {
        fullname: "",
        email: "",
        password: "",
        phone: "",
      },
    };
  }

  handleInputChange = (e) => {
    const value = e.target.type === "checkbox"
      ? e.target.checked
      : e.target.value;
    const field = e.target.name;
    this.setState({
      [field]: value,
    }, () => console.log(this.state));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { fullname, email, password, phone, is_admin } = this.state;

    this.props.signup({
      fullname,
      email,
      password,
      phone,
      is_admin,
    });
  };

  render() {
    if (this.props.isLoading){
      return (
          <CircularProgress />
      )
    }
    return (
      <Paper component={Grid} item container direction="column" xs={8} md={4}>
        <form
          onSubmit={this.handleSubmit}
          style={{ display: "flex", flexDirection: "column", padding: "2rem" }}
        >
          <TextField
            name="fullname"
            label="Full Name"
            onChange={this.handleInputChange}
            value={this.state.fullname}
            style={{marginTop:"0.5rem"}}
          >
          </TextField>
          <TextField
            name="email"
            label="Email ID"
            onChange={this.handleInputChange}
            value={this.state.email}
            style={{marginTop:"0.5rem"}}
          >
          </TextField>
          <TextField
            name="password"
            type="password"
            label="Password"
            onChange={this.handleInputChange}
            value={this.state.password}
            style={{marginTop:"0.5rem"}}
          >
          </TextField>
          <TextField
            name="phone"
            type="phone"
            label="Phone Number"
            onChange={this.handleInputChange}
            value={this.state.phone}
            style={{marginTop:"0.5rem"}}
          />
          <FormControlLabel
          style={{marginTop:"0.5rem"}}
            control={<Switch
              checked={this.state.is_admin}
              onChange={this.handleInputChange}
              name="is_admin"
              color="primary"
            />}
            label="Admin?"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ margin: "2rem 0rem" }}
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
  isLoading: state.auth.isLoading
});
export default withRouter(connect(mapStateToProps, { signup })(Signup));

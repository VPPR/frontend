import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signup } from "redux/auth/action";

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
      <form onSubmit={this.handleSubmit}>
        <input
          name="fullname"
          onChange={this.handleInputChange}
          value={this.state.fullname}
        >
        </input>
        <input
          name="email"
          onChange={this.handleInputChange}
          value={this.state.email}
        >
        </input>
        <input
          name="password"
          type="password"
          onChange={this.handleInputChange}
          value={this.state.password}
        >
        </input>
        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
});
export default withRouter(connect(mapStateToProps, { signup })(Signup));

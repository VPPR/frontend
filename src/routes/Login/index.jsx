import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { login } from "redux/auth/action.js";
import { Button, CircularProgress, Grid, Paper, TextField, withTheme } from "@material-ui/core";
import { fetchUserSelf } from "redux/users/action";
import { toast } from "react-toastify";
import IndexTopBar from "components/IndexTopBar";

const validEmailRegex = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i);

const passwordRegex = RegExp(/^((.{0,7})|([^0-9]*)|([^A-Z]*)|([^a-z]*))$/);
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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn && this.props.isLoggedIn) {
            this.props.fetchUserSelf();
        }
        if (prevProps.currentUser !== this.props.currentUser && this.props.currentUser) {
            toast.success(`Hello, ${this.props.currentUser.fullname}`, {
                position: toast.POSITION.TOP_CENTER,
            });
            this.props.history.push("/dashboard");
        }
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
        if (Object.values(errors).every((x) => x === ""))
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
                errors[name] =
                    value === "" || validEmailRegex.test(value) ? "" : "Your Email ID does not look right 🤔";
                break;

            case "password":
                errors[name] = value !== "" && passwordRegex.test(value) ? "Please enter a valid password 🥺" : "";
                break;

            default:
                break;
        }

        this.setState({ errors });
    };

    render() {
        const { theme } = this.props;
        if (this.props.isLoading) {
            return <CircularProgress />;
        }
        return (
            <Grid container justify="center" alignContent="center">
                <IndexTopBar />
                <Paper component={Grid} item container direction="column" xs={8} md={4} alignContent="center">
                    <Link to="/" style={{ display: "flex", justifyContent: "center", paddingTop: 50 }}>
                        <img
                            src={`${theme.palette.type === "light" ? "/vppr-darktext.svg" : "/vppr-whitetext.svg"}`}
                            alt=""
                            width="30%"
                        />
                    </Link>
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
                            style={{ marginTop: "0.5rem" }}
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
                            style={{ marginTop: "0.5rem" }}
                        />

                        <Button variant="contained" color="primary" type="submit" style={{ margin: "2em 0em" }}>
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    errorMessage: state.auth.errorMessage || state.user.errorMessage,
    accessToken: state.auth.accessToken,
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.auth.isLoading || state.user.isLoading,
    currentUser: state.user.currentUser,
});

export default withRouter(withTheme(connect(mapStateToProps, { login, fetchUserSelf })(Login)));

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signup } from "redux/auth/action";
import { Button, CircularProgress, FormControlLabel, Grid, Paper, Switch, TextField } from "@material-ui/core";
import { toast } from "react-toastify";

const emailRegex = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i);
const passwordRegex = RegExp(/^(.{0,7})|([^0-9]*)|([^A-Z]*)|([^a-z]*)$/);
class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fullname: "",
            email: "",
            password: "",
            phone: "",
            is_admin: false,
            errors: {},
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.errorMessage !== this.props.errorMessage && this.props.errorMessage) {
            toast.error(this.props.errorMessage, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
        if (prevProps.success !== this.props.success && this.props.success) {
            toast.success("Yay. Signup Successful", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    handleInputChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        const field = e.target.name;
        this.setState({
            [field]: value,
        });
    };

    handleValidation = (e) => {
        const { name, value } = e.target;
        let errors = { ...this.state.errors };
        switch (name) {
            case "email":
                errors[name] = value === "" || emailRegex.test(value) ? "" : "Invalid Email";
                break;
            case "password":
                errors[name] =
                    value !== "" && passwordRegex.test(value)
                        ? "Invalid Password. Password must contain a capital letter, a small letter, numbers and be of minimum length 8"
                        : "";
                break;
            case "phone":
                errors[name] = value !== "" && /^[6,7,8,9].[0-9]{6,9}$/.test(value) ? "" : "Invalid phone number";
                break;
            default:
                break;
        }
        this.setState({ errors }, () => {
            console.log(this.state);
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { fullname, email, password, phone, is_admin, errors } = this.state;
        if (!errors)
            this.props.signup({
                fullname,
                email,
                password,
                phone,
                is_admin,
            });
        else {
            toast.error("Yo! WTF. Fix your mistakes", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    render() {
        if (this.props.isLoading) {
            return <CircularProgress />;
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
                        style={{ marginTop: "0.5rem" }}
                        required
                    ></TextField>
                    <TextField
                        name="email"
                        label="Email ID"
                        onChange={this.handleInputChange}
                        onBlur={this.handleValidation}
                        error={!!this.state.errors.email}
                        helperText={this.state.errors.email}
                        value={this.state.email}
                        style={{ marginTop: "0.5rem" }}
                        required
                    ></TextField>
                    <TextField
                        name="password"
                        type="password"
                        label="Password"
                        onChange={this.handleInputChange}
                        onBlur={this.handleValidation}
                        error={!!this.state.errors.password}
                        helperText={this.state.errors.password}
                        value={this.state.password}
                        style={{ marginTop: "0.5rem" }}
                        required
                    ></TextField>
                    <TextField
                        name="phone"
                        type="phone"
                        label="Phone Number"
                        onChange={this.handleInputChange}
                        onBlur={this.handleValidation}
                        error={!!this.state.errors.phone}
                        helperText={this.state.errors.phone}
                        value={this.state.phone}
                        style={{ marginTop: "0.5rem" }}
                        required
                    />
                    <FormControlLabel
                        style={{ marginTop: "0.5rem" }}
                        control={
                            <Switch
                                checked={this.state.is_admin}
                                onChange={this.handleInputChange}
                                name="is_admin"
                                color="primary"
                            />
                        }
                        label="Admin?"
                    />
                    <Button variant="contained" color="primary" type="submit" style={{ margin: "2rem 0rem" }}>
                        Submit
                    </Button>
                </form>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    success: state.auth.signUpSuccess,
    errorMessage: state.auth.errorMessage,
    isLoading: state.auth.isLoading,
});
export default withRouter(connect(mapStateToProps, { signup })(Signup));

import {
    Typography,
    Grid,
    Divider,
    TextField,
    Switch,
    Button,
    FormControlLabel,
    Dialog,
    Paper,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { fetchUser, updateUser } from "redux/users/action";
class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            submit: false,
        };
    }

    componentDidMount() {
        this.props.fetchUser(this.props.id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.selectedUser !== prevProps.selectedUser) {
            this.setState({
                user: { ...this.props.selectedUser } ?? {},
            });
            if (this.state.submit) {
                toast.success(`${this.props.selectedUser.fullname}'s information updated`, {
                    position: toast.POSITION.TOP_CENTER,
                });
                this.props.onClose();
            }
        }
    }

    handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        let { user } = this.state;
        if (type === "checkbox") {
            user[name] = checked;
        } else {
            user[name] = value;
        }
        this.setState({ user });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateUser(this.state.user);
        this.setState({ submit: true });
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <Paper component={Grid} container item justify="center">
                    <form
                        style={{ display: "flex", flexDirection: "column", padding: "2rem" }}
                        onSubmit={this.handleSubmit}
                    >
                        <Typography variant="h4" align="center">
                            Edit User
                        </Typography>
                        <Divider />
                        <TextField
                            name="fullname"
                            label="Full Name"
                            style={{ marginTop: "0.5rem" }}
                            value={this.state.user.fullname ?? ""}
                            onChange={this.handleInputChange}
                        ></TextField>
                        <TextField
                            name="email"
                            label="Email ID"
                            style={{ marginTop: "0.5rem" }}
                            value={this.state.user.email ?? ""}
                            onChange={this.handleInputChange}
                        ></TextField>
                        <TextField
                            name="phone"
                            type="phone"
                            label="Phone Number"
                            value={this.state.user.phone ?? ""}
                            onChange={this.handleInputChange}
                            style={{ marginTop: "0.5rem" }}
                        />
                        <TextField
                            name="password"
                            type="password"
                            label="Password"
                            value={this.state.user.password ?? ""}
                            onChange={this.handleInputChange}
                            style={{ marginTop: "0.5rem" }}
                        ></TextField>
                        <Grid>
                            <FormControlLabel
                                style={{ marginTop: "0.5rem" }}
                                control={
                                    <Switch
                                        name="is_admin"
                                        color="primary"
                                        checked={this.state.user.is_admin ?? false}
                                        onChange={this.handleInputChange}
                                    />
                                }
                                label="Admin?"
                            />
                            <FormControlLabel
                                style={{ marginTop: "0.5rem" }}
                                control={
                                    <Switch
                                        name="is_active"
                                        color="primary"
                                        checked={this.state.user.is_active ?? false}
                                        onChange={this.handleInputChange}
                                    />
                                }
                                label="Active?"
                            />
                        </Grid>
                        <Button variant="contained" color="primary" type="submit" style={{ marginTop: "2rem" }}>
                            Submit
                        </Button>
                    </form>
                </Paper>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.user.isLoading,
    selectedUser: state.user.selectedUser,
});

export default connect(mapStateToProps, { fetchUser, updateUser })(UserModal);

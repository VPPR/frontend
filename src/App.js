import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import Login from "routes/Login";
import Signup from "routes/Signup";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "components/AuthenticatedRoute";
import Dashboard from "routes/Dashboard";
import Landing from "routes/Landing";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.min.css";

const styles = (theme) => ({
    fullScreen: {
        minHeight: "100vh",
        minWidth: "90vw",
        maxWidth: "100vw",
    },
});
class App extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        const { errorMessage } = this.props;
        let result = new Set(errorMessage);
        for (let error of prevProps.errorMessage) {
            result.delete(error);
        }
        result.forEach((error) => {
            toast.error(error.toString(), {
                position: toast.POSITION.TOP_CENTER,
            });
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <ToastContainer autoClose={5000} />
                <Grid container alignContent="center" justify="center" className={classes.fullScreen}>
                    <Switch>
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                        <AuthenticatedRoute path="/dashboard" component={Dashboard} />
                        <Route path="/" component={Landing} />
                    </Switch>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    let errorMessage = [];
    for (let module in state) {
        if (state[module].errorMessage) {
            errorMessage.push(state[module].errorMessage);
        }
    }
    return { errorMessage };
};

export default withStyles(styles)(connect(mapStateToProps)(App));

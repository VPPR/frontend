import Header from "components/Header";
import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { allowedRoutes } from "components/AuthenticatedRoute";
import Sidebar from "components/Sidebar";
import Band from "./routes/band";
import AuthenticatedRoute from "components/AuthenticatedRoute";
import Users from "./routes/users";
import PHQ from "./routes/phq";
<<<<<<< HEAD
import HRV from "./routes/hrv";

=======
import MentalHealth from "./routes/mentalhealth";
>>>>>>> 9f2cf0b (PHQ Score fetched from backend and printed in Dashboard)
const style = (theme) => ({
    fullScreen: {
        display: "flex",
        height: "100vh",
        width: "100vw",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        padding: theme.spacing(3),
        height: "90%",
        width: "100%",
    },
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleDrawer = () => {
        this.setState({ open: !this.state.open });
    };

    render() {
        const { classes, is_admin } = this.props;
        return (
            <Grid className={classes.fullScreen}>
                <Header handleDrawer={this.handleDrawer} />
                <Sidebar open={this.state.open} routes={allowedRoutes(is_admin)} />
                <div
                    style={{
                        flexShrink: 1,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div className={classes.toolbar} />
                    <div className={classes.content}>
                        <Switch>
                            <AuthenticatedRoute path="/dashboard/upload" component={Band} />
                            <AuthenticatedRoute path="/dashboard/users" component={Users} />
                            <AuthenticatedRoute path="/dashboard/phq" component={PHQ} />
<<<<<<< HEAD
                            <AuthenticatedRoute path="/dashboard/hrv" component={HRV} />
=======
                            <AuthenticatedRoute path="/dashboard" component={MentalHealth}/>
>>>>>>> 9f2cf0b (PHQ Score fetched from backend and printed in Dashboard)
                        </Switch>
                    </div>
                </div>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => ({
    is_admin: state.user.currentUser ? state.user.currentUser.is_admin : false,
});
export default withRouter(withStyles(style)(connect(mapStateToProps)(Dashboard)));

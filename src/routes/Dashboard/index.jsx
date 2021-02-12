import Header from "components/Header";
import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { allowedRoutes } from "components/AuthenticatedRoute";
import Sidebar from "components/Sidebar";
import Band from "./routes/band";
import AuthenticatedRoute from "components/AuthenticatedRoute";
const style = (theme) => ({
  fullScreen: {
    minHeight: "100vh",
    minWidth: "100vw",
  },
  toolbar: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    padding: theme.spacing(3),
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
    const permissions = is_admin ? "admin" : "user";
    return (
      <Grid item container className={classes.fullScreen}>
        <Header handleDrawer={this.handleDrawer} />
        <Grid item container>
          <Sidebar open={this.state.open} routes={allowedRoutes[permissions]} />
          <Grid style={{ flex: 1, flexShrink: 1 }}>
            <div className={classes.toolbar}></div>
            <Grid
              container
              className={classes.content}
              justify="center"
              alignContent="center"
            >
              <Switch>
                <AuthenticatedRoute path="/dashboard/upload" component={Band} />
              </Switch>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  is_admin: state.user.currentUser ? state.user.currentUser.is_admin : false,
});
export default withRouter(
  withStyles(style)(connect(mapStateToProps)(Dashboard)),
);

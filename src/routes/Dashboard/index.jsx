import Header from "components/Header";
import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "components/Sidebar";
import Band from "./routes/band";
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
    const { classes } = this.props;
    return (
      <Grid item container className={classes.fullScreen}>
        <Header handleDrawer={this.handleDrawer} />
        <Grid item container>
          <Sidebar open={this.state.open} />
          <Grid style={{ flex: 1, flexShrink: 1 }}>
            <div className={classes.toolbar}></div>
            <Grid
              container
              className={classes.content}
              justify="center"
              alignContent="center"
            >
              <Switch>
                <Route path="/" component={Band} />
              </Switch>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(style)(connect()(Dashboard)));

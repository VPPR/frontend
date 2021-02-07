import Header from "components/Header";
import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "components/Sidebar";

const drawerWidth = 240;
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
    minHeight:"inherit"
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
            <Grid container className={classes.content} justify="center" alignContent="center">
              yahoo
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(withStyles(style)(connect()(Dashboard)));

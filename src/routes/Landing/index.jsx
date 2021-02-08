import { Grid } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
class Landing extends React.Component {


  render() {
    return (
      <Grid item container justify="center" alignContent="center">
        Index
      </Grid>
    );
  }
}

export default withRouter(Landing);

import { Grid } from "@material-ui/core";
import IndexTopBar from "components/IndexTopBar";
import React from "react";
import { withRouter } from "react-router-dom";
class Landing extends React.Component {
    render() {
        return (
            <Grid item container justify="center" alignContent="center">
                <IndexTopBar></IndexTopBar>
            </Grid>
        );
    }
}

export default withRouter(Landing);

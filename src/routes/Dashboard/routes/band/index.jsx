import React from "react";
import { withRouter } from "react-router-dom";
import * as zip from "@zip.js/zip.js/dist/zip-full.min";
import { Button, Grid, Paper, Typography, withStyles } from "@material-ui/core";

const style = (theme) => ({
  content: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  heading: {
    padding: theme.spacing(3),
  },
});

class Band extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
    };
  }

  handleInputChange = (e) => {
    console.log(e.target);
    let field = e.target.name;
    let value = e.target.files[0];
    console.log(value);
    if (value.type === "application/zip") {
      this.setState({ [field]: value });
    } else {
      this.setState({ error: "incorrect file type" });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Paper component={Grid} item container>
          <Typography variant="h6" className={classes.heading}>
            Upload MI Band Data
          </Typography>
        </Paper>
        <Paper
          component={Grid}
          item
          container
          className={classes.content}
          alignContent="center"
          justify="flex-start"
        >
          <Grid item xs={12}>
            <form>
              <Button
                variant="contained"
                color="primary"
                component="label"
              >
                Upload Zip File
                <input
                  type="file"
                  name="file"
                  hidden
                  accept=".zip"
                  onChange={this.handleInputChange}
                />
              </Button>
            </form>
          </Grid>
          {this.state.file &&
            <Grid item xs={12} className={classes.content}>
              <Typography>
                {this.state.file.name}
              </Typography>
            </Grid>}
        </Paper>
      </>
    );
  }
}

export default withRouter(withStyles(style)(Band));

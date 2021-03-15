import React from "react";
import { withRouter } from "react-router-dom";
import { Archive } from "libarchive.js/main.js";

import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";

Archive.init({
  workerUrl: "/libarchive.js/dist/worker-bundle.js",
});

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
      password: "",
    };
  }

  handleInputChange = async (e) => {
    let field = e.target.name;
    if (e.target.type === "file") {
      let value = e.target.files[0];
      if (value.type.includes("zip")) {
        this.setState({ [field]: value, files: undefined });
      } else {
        this.setState({ error: "incorrect file type" });
      }
    } else {
      let value = e.target.value;
      this.setState({ [field]: value });
    }
  };

  verifyZip = async () => {
    const { password } = this.state;
    const archive = await Archive.open(this.state.file);
    if (password) {
      await archive.usePassword(password);
    }
    let obj = await archive.extractFiles();
    let files = [];
    console.log(obj);
    for (let x in obj) {
      files.push(obj[x][Object.keys(obj[x])[0]]);
    }
    this.setState({ files }, () => console.log(this.state));
  };
  handleSubmit = () => {
    alert("#TODO: SUBMIT");
  };
  render() {
    const { classes } = this.props;

    const mapFiles = this.state.files
      ? this.state.files.map((file) => {
        let filename = file.name.match(/([A-Z]*_)*\d*.csv/);
        let simplifiedName = filename[0].replace(/(_\d).\d*/, "");
        return <Typography key={filename}>{simplifiedName}</Typography>;
      })
      : "";

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
          <Grid item container alignContent="center">
            <Button variant="contained" color="primary" component="label">
              Upload Zip File
              <input
                type="file"
                name="file"
                hidden
                accept=".zip"
                onChange={this.handleInputChange}
              />
            </Button>
            <Typography variant="body1" style={{ padding: "0.5rem" }}>
              {this.state.file.name}
            </Typography>
          </Grid>

          <Grid
            item
            container
            alignContent="center"
            xs={12}
            style={{ paddingTop: "1rem" }}
          >
            <TextField
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </Grid>

          <Grid
            item
            container
            alignContent="center"
            xs={12}
            style={{ paddingTop: "1rem" }}
          >
            {!this.state.files
              ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.verifyZip}
                >
                  Verify
                </Button>
              )
              : (
                <Grid>{mapFiles}</Grid>
              )}
          </Grid>
          <Grid
            item
            container
            alignContent="center"
            xs={12}
            style={{ paddingTop: "1rem" }}
          >
            {this.state.files && (
              <Button
                onClick={this.handleSubmit}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            )}
          </Grid>
        </Paper>
      </>
    );
  }
}

export default withRouter(withStyles(style)(Band));

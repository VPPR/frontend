import React from "react";
import { withRouter } from "react-router-dom";
import * as zip from "@zip.js/zip.js/dist/zip-full.min";
import {Archive} from 'libarchive.js/main.js';


import {
  Button,
  Grid,
  List,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";


Archive.init({
  workerUrl: 'libarchive.js/dist/worker-bundle.js'
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
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
    if (prevState.file !== this.state.file && this.state.file) {
      // let blobReader = new zip.BlobReader(this.state.file);
      // let reader = new zip.ZipReader(blobReader);
      // let entries = await reader.getEntries();
      // let files = entries.filter((entry) => entry.directory === false);
      // console.log(entries)
      const archive = await Archive.open(this.state.file);
      let obj = await archive.extractFiles();
      
      console.log(obj);
      // const text = await entries[0].getData()
    //   const text = await files[0].getData(
    //     // writer
    //     new zip.TextWriter(),
    //     // options
    //     { 
    //       onprogress: (index, max) => {
    //          // onprogress callback
    //       },
    //       password:"bATIPGnD"
    //     }
    //   );
    //   // text contains the entry data as a String
    //   console.log(text);
    
      // this.setState({ files });
    }
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

    const mapFiles = this.state.files
      ? this.state.files.map((file) => {
        let filename = file.filename.match(/[A-Z]*_\d*.csv/);
        console.log(filename);
        let simplifiedName = filename[0].replace(/_\d*/, "");
        return (
          <Typography key={filename}>
            {simplifiedName}
          </Typography>
        );
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
          {!this.state.file &&
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
            </Grid>}
          {this.state.file &&
            <Grid item xs={12}>
              <Typography variant="h5">
                {this.state.file.name}
              </Typography>
              <List component={Grid} item xs={12}>
                {mapFiles}
              </List>
            </Grid>}
        </Paper>
      </>
    );
  }
}

export default withRouter(withStyles(style)(Band));

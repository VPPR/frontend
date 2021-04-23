import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Archive } from "libarchive.js/main.js";
import { Upload } from "redux/band/action";
import { Switch, FormControlLabel, Button, Grid, Paper, TextField, Typography, withStyles } from "@material-ui/core";

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
            files: [],
            isActive: true,
        };
    }

    handleInputChange = async (e) => {
        let field = e.target.name;
        console.log(e);
        if (e.target.type === "file") {
            for (let file of e.target.files) {
                if (file.type.includes("zip")) {
                    this.setState({ [field]: file, files: [] }, () => console.log(this.state));
                } else if (file.type.includes("csv")) {
                    let files = this.state.files;
                    files.push(file);
                    this.setState({ files }, () => console.log(this.state));
                } else {
                    this.setState({ error: "incorrect file type" }, () => console.log(this.state));
                }
            }
            // let value = e.target.files[0];
            // if (value.type.includes("zip")) {
            //     this.setState({ [field]: value, files: undefined });
            // } else {
            //     this.setState({ error: "incorrect file type" });
            // }
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
        console.log(this.state.files);
        this.props.Upload(this.state.files);
    };

    changeActiveInput = () => {
        this.setState({ isActive: !this.state.isActive });
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
                    <Grid container>
                        <FormControlLabel
                            label="Upload Files"
                            labelPlacement="start"
                            style={{ marginLeft: 0 }}
                            control={
                                <FormControlLabel
                                    control={
                                        <Switch
                                            color="primary"
                                            checked={this.state.isActive}
                                            onChange={this.changeActiveInput}
                                        />
                                    }
                                    label="Upload Zip"
                                />
                            }
                        />
                    </Grid>
                    {this.state.isActive ? (
                        <>
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

                            <Grid item container alignContent="center" xs={12} style={{ paddingTop: "1rem" }}>
                                <TextField
                                    name="password"
                                    type="password"
                                    label="Password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>

                            <Grid item container alignContent="center" xs={12} style={{ paddingTop: "1rem" }}>
                                {this.state.files.length === 0 ? (
                                    <Button variant="contained" color="primary" onClick={this.verifyZip}>
                                        Verify
                                    </Button>
                                ) : (
                                    <Grid>{mapFiles}</Grid>
                                )}
                            </Grid>
                            <Grid item container alignContent="center" xs={12} style={{ paddingTop: "1rem" }}>
                                {this.state.files.length !== 0 && (
                                    <Button onClick={this.handleSubmit} variant="contained" color="primary">
                                        Submit
                                    </Button>
                                )}
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid>
                                <Button color="primary" variant="contained" component="label">
                                    Upload File
                                    <input
                                        type="file"
                                        name="file"
                                        hidden
                                        accept=".csv"
                                        onChange={this.handleInputChange}
                                        multiple
                                    ></input>
                                </Button>
                            </Grid>
                            <Grid item container alignContent="center" xs={12} style={{ paddingTop: "1rem" }}>
                                <Button onClick={this.handleSubmit} variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </>
                    )}
                </Paper>
            </>
        );
    }
}

export default withRouter(withStyles(style)(connect(null, { Upload })(Band)));

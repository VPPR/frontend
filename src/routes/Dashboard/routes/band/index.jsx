import { Grid, Paper, Typography, Button, TextField, withStyles, IconButton } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Archive } from "libarchive.js/main";
import { Upload } from "redux/band/action";
import { Clear } from "@material-ui/icons";
import { toast } from "react-toastify";
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
    list: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    listText: {
        padding: theme.spacing(1),
    },
});

class Band extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            zip: undefined,
            password: "",
        };
    }

    handleInputChange = (e) => {
        let { name, type, files, value } = e.target;
        if (type === "file") {
            let filesList = [...this.state.files];
            let zip = this.state.zip;
            for (let file of files) {
                if (file.type.includes("zip")) {
                    zip = file;
                } else if (file.type.includes("csv") && !filesList.some((x) => x.name === file.name)) {
                    filesList.push(file);
                }
            }
            this.setState({ zip, files: filesList });
        } else {
            this.setState({ [name]: value });
        }
    };

    extractZip = async () => {
        const { zip, password } = this.state;
        const archive = await Archive.open(zip);
        if (password) {
            await archive.usePassword(password);
        }
        try {
            const zipContent = await archive.extractFiles();
            let filesList = [...this.state.files];
            for (let x in zipContent) {
                const file = zipContent[x][Object.keys(zipContent[x])[0]];
                if (!filesList.some((x) => x.name === file.name)) filesList.push(file);
            }

            this.setState({ files: filesList });
        } catch (e) {
            toast.error(e.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    handleSubmit = () => {
        this.props.Upload(this.state.files);
    };

    removeFile = (file) => {
        const files = [...this.state.files];
        files.splice(files.indexOf(file), 1);
        this.setState({ files });
    };

    fileList = (files) =>
        files
            .filter((file) => file.name.match(/([A-Z]*_)*\d*.csv/))
            .map((file) => {
                let simplifiedName = file.name; //.replace(/(_\d)\d*/, "");
                return (
                    <Grid container item xs={12} md={6} key={simplifiedName} alignContent="center">
                        <Typography component={Grid} className={this.props.classes.listText} item md={7}>
                            {simplifiedName}
                        </Typography>
                        <Grid item md={1}>
                            <IconButton onClick={() => this.removeFile(file)} className={this.props.classes.listText}>
                                <Clear fontSize="small" />
                            </IconButton>
                        </Grid>
                    </Grid>
                );
            });

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Paper component={Grid} container>
                    <Typography variant="h6" className={classes.heading}>
                        Upload MI Band Data
                    </Typography>
                </Paper>
                <Paper
                    component={Grid}
                    item
                    container
                    alignContent="center"
                    justify="flex-start"
                    className={classes.content}
                >
                    <Grid container>
                        <Grid item container alignContent="center" xs={12} md={2}>
                            <Button variant="contained" color="primary" component="label">
                                Upload File
                                <input
                                    type="file"
                                    name="file"
                                    hidden
                                    multiple
                                    accept=".csv,.zip"
                                    onChange={this.handleInputChange}
                                />
                            </Button>
                        </Grid>
                        <Grid item container alignContent="center" xs={12} md={3}>
                            <Typography>{this.state.zip && this.state.zip.name}</Typography>
                        </Grid>
                        <Grid item container alignContent="center" xs={12} md={3}>
                            {this.state.zip && (
                                <TextField
                                    type="password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                    value={this.state.password}
                                    label="Password"
                                    placeholder="Password"
                                />
                            )}
                        </Grid>
                        <Grid item container alignContent="center" xs={12} md={2}>
                            {this.state.zip && (
                                <Button variant="contained" color="primary" onClick={this.extractZip}>
                                    Verify
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                    {this.state.files.length > 0 && (
                        <>
                            <Grid container className={classes.list}>
                                {this.fileList(this.state.files)}
                            </Grid>
                            <Grid container>
                                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                    Submit
                                </Button>
                            </Grid>
                        </>
                    )}{" "}
                </Paper>
            </div>
        );
    }
}

export default withStyles(style)(connect(null, { Upload })(Band));

import {
    Grid,
    Paper,
    Typography,
    Button,
    TextField,
    withStyles,
    IconButton,
    CircularProgress,
} from "@material-ui/core";
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
        paddingTop: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    button: {
        [theme.breakpoints.down("md")]: {
            marginTop: theme.spacing(3),
        },
    },
    submit: {
        marginBottom: theme.spacing(3),
    },
});

class Band extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            zip: undefined,
            password: "",
            submit: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            !this.props.isLoading &&
            this.props.isLoading !== prevProps.isLoading &&
            this.state.submit &&
            this.props.errorMessage === ""
        ) {
            toast.success("Data uploaded", {
                position: toast.POSITION.TOP_CENTER,
            });
            this.clearFiles();
        }
    }

    handleInputChange = (e) => {
        let { name, type, files, value } = e.target;
        if (type === "file") {
            let filesList = [...this.state.files];
            let zip = this.state.zip;
            for (let file of files) {
                if (file.type.includes("zip")) {
                    zip = file;
                } else {
                    filesList.push(file);
                }
            }
            this.setState({ zip, files: filesList });
        } else {
            this.setState({ [name]: value });
        }
    };

    clearFiles = () => {
        this.setState({
            files: [],
            zip: undefined,
            password: "",
        });
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
        if (this.state.files) {
            this.props.Upload(this.state.files);
            this.setState({ submit: true });
        }
    };

    removeFile = (file) => {
        const files = [...this.state.files];
        files.splice(files.indexOf(file), 1);
        this.setState({ files });
    };

    fileList = (files) =>
        files
            // .filter((file) => file.name.match(/([A-Z]*_)*\d*.csv/))
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
        const { classes, isLoading } = this.props;
        return (
            <div style={{ height: "100%" }}>
                <Paper component={Grid} container>
                    <Typography variant="h6" className={classes.heading}>
                        Upload MI Band Data
                    </Typography>
                </Paper>
                {isLoading ? (
                    <Paper
                        component={Grid}
                        item
                        container
                        alignContent="center"
                        justify="center"
                        className={classes.content}
                        style={{ height: "65%", overflowY: "auto", overflowX: "wrap" }}
                    >
                        <CircularProgress />
                    </Paper>
                ) : (
                    <Paper
                        component={Grid}
                        item
                        container
                        className={classes.content}
                        style={{ maxHeight: "85%", overflowY: "auto", overflowX: "wrap" }}
                    >
                        <Grid item container xs={12} md={2} alignItems="center">
                            <Button variant="contained" color="primary" component="label" className={classes.listText}>
                                Upload File
                                <input
                                    type="file"
                                    name="file"
                                    hidden
                                    multiple
                                    accept=".csv,.zip,.sqlite3,.db,.db-wal"
                                    onChange={this.handleInputChange}
                                />
                            </Button>
                        </Grid>
                        <Grid item container alignItems="center" xs={12} md={3}>
                            {this.state.zip && (
                                <Typography className={classes.listText}>{this.state.zip.name}</Typography>
                            )}
                        </Grid>
                        <Grid item container alignItems="center" xs={12} md={3}>
                            {this.state.zip && (
                                <TextField
                                    type="password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                    value={this.state.password}
                                    label="Password"
                                    placeholder="Password"
                                    className={classes.listText}
                                />
                            )}
                        </Grid>
                        <Grid item container alignItems="center" xs={12} md={2}>
                            {this.state.zip && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.extractZip}
                                    className={classes.button}
                                >
                                    Verify
                                </Button>
                            )}
                        </Grid>
                        {this.state.files.length > 0 && (
                            <>
                                <Grid container className={classes.list}>
                                    {this.fileList(this.state.files)}
                                </Grid>
                                <Grid container>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleSubmit}
                                        className={classes.submit}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </>
                        )}
                    </Paper>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.upload.isLoading,
    errorMessage: state.upload.errorMessage,
});
export default withStyles(style)(connect(mapStateToProps, { Upload })(Band));

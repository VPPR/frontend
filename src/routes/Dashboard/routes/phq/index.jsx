import { withStyles, Grid, Paper, Typography, Button, CircularProgress, Slider } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { fetchQuestions, postAnswer } from "redux/phq/action";

const style = (theme) => ({
    content: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(3),
    },
    heading: {
        padding: theme.spacing(2),
    },
    sliderTrack: {
        height: 8,
        borderRadius: 4,
    },
    sliderRail: {
        height: 8,
        borderRadius: 4,
    },
    sliderThumb: {
        height: 24,
        width: 24,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -8,
        marginLeft: -12,
        "&:focus, &:hover, &active": {
            boxShadow: "inherit",
        },
    },
    sliderRoot: {
        color: theme.palette.primary, //"#513cde",
        height: 8,
    },
});

class PHQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: null,
            submit: false,
        };
    }

    componentDidMount() {
        this.props.fetchQuestions();
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.questions.length === 0 &&
            !this.props.isLoading &&
            this.props.isLoading !== prevProps.isLoading &&
            this.state.submit
        ) {
            toast.success("Form Submitted", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
        if (this.props.questions.length !== 0 && this.state.answers === null) {
            let answers = [];
            for (let question of this.props.questions) {
                let answer = {
                    qno: question.qno,
                    version: question.version,
                    score: question.average_score,
                };
                answers.push(answer);
            }
            this.setState({ answers });
        }
    }

    handleSliderChange = (name, value) => {
        let answers = [...this.state.answers];
        let i = answers.findIndex((x) => x.qno === name);

        answers[i].score = value;
        this.setState({ answers });
    };

    // handleChange = (e) => {
    //     const { name, value } = e.target;
    //     let answers = new Map(this.state.answers);
    //     const answer = {
    //         score: value,
    //         version: this.props.questions[name].version,
    //     };
    //     answers.set(name, answer);
    //     this.setState({ answers });
    // };

    handleSubmit = (e) => {
        const answers = this.state.answers;
        if (answers.length === this.props.questions.length) {
            this.props.postAnswer(answers);
            this.setState({ submit: true });
        }
    };

    renderQuestions = () => {
        const { classes } = this.props;
        return this.props.questions.map((question) => (
            <Paper
                component={Grid}
                key={`q${question.qno}`}
                container
                item
                xs={12}
                spacing={2}
                direction="row"
                className={classes.content}
            >
                <Grid component={Grid} container item xs={12} md={6} alignItems="center">
                    <Typography variant="h6">{question.question}</Typography>
                </Grid>
                <Grid component={Grid} container item xs={12} md={3} alignContent="center">
                    <Slider
                        defaultValue={question.average_score}
                        min={0}
                        max={3}
                        step={1}
                        style={{ marginLeft: 20 }}
                        classes={{
                            root: classes.sliderRoot,
                            track: classes.sliderTrack,
                            rail: classes.sliderRail,
                            thumb: classes.sliderThumb,
                        }}
                        valueLabelDisplay="on"
                        onChange={(_, newValue) => this.handleSliderChange(question.qno, newValue)}
                    ></Slider>

                    {/*<FormControl component="fieldset">
                         <RadioGroup
                            name={`${qno}`}
                            value={this.state.answers.get(qno) ?? "0"}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel
                                value={0}
                                control={<Radio />}
                                checked={this.state.answers.get(qno)?.score === "0"}
                                label="Not at all"
                            />
                            <FormControlLabel
                                value={1}
                                control={<Radio />}
                                checked={this.state.answers.get(qno)?.score === "1"}
                                label="Several Days"
                            />
                            <FormControlLabel
                                value={2}
                                control={<Radio />}
                                checked={this.state.answers.get(qno)?.score === "2"}
                                label="More than half the days"
                            />
                            <FormControlLabel
                                value={3}
                                checked={this.state.answers.get(qno)?.score === "3"}
                                control={<Radio />}
                                label="Nearly every day"
                            />
                        </RadioGroup>
                    </FormControl> */}
                </Grid>
            </Paper>
        ));
    };

    renderForm = () => {
        const { classes, isLoading } = this.props;
        if (isLoading) {
            return (
                <Grid
                    container
                    item
                    style={{ marginTop: 10, height: "85%", overflowY: "auto", overflowX: "wrap" }}
                    justify="center"
                    alignContent="center"
                >
                    <CircularProgress />
                </Grid>
            );
        } else if (Object.keys(this.props.questions).length === 0) {
            return (
                <Paper component={Grid} container className={classes.content}>
                    <Typography>
                        The Questions you are looking for are unavailable right now, please try again later
                    </Typography>
                </Paper>
            );
        }
        return (
            <Grid container style={{ marginTop: 10, height: "85%", overflowY: "auto", overflowX: "wrap" }}>
                <div style={{ width: "100%" }}>
                    {this.renderQuestions()}
                    <Grid container justify="center">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{ margin: "2em 0em" }}
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </Button>
                    </Grid>
                </div>
            </Grid>
        );
    };

    render() {
        const { classes } = this.props;
        return (
            <div style={{ height: "100%" }}>
                <Paper component={Grid} container alignContent="center" style={{ height: "15%" }}>
                    <Typography variant="h5" className={classes.heading}>
                        PHQ-9 Questionaire
                    </Typography>
                </Paper>
                {this.renderForm()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.phq.isLoading,
    questions: state.phq.questions,
});

export default connect(mapStateToProps, { fetchQuestions, postAnswer })(withStyles(style)(PHQ));

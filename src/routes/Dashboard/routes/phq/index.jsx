import {
    withStyles,
    Grid,
    Paper,
    Typography,
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
    Button,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { fetchQuestions, postAnswer } from "redux/phq/action";

const style = (theme) => ({
    content: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(3),
    },
    heading: {
        padding: theme.spacing(2),
    },
});

class PHQ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: new Map(),
        };
    }

    componentDidMount() {
        this.props.fetchQuestions();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        let answers = new Map(this.state.answers);
        const answer = {
            score: value,
            version: this.props.questions[name].version,
        };
        answers.set(name, answer);
        this.setState({ answers });
    };

    renderQuestions = () => {
        const { classes } = this.props;
        return Object.entries(this.props.questions).map(([qno, value]) => (
            <Paper
                component={Grid}
                key={qno}
                container
                item
                xs={12}
                spacing={2}
                direction="row"
                className={classes.content}
            >
                <Grid component={Grid} item xs={12} md={6}>
                    <Typography variant="h6">{value.question}</Typography>
                </Grid>
                <Grid component={Grid} container item xs={12} md={6} alignContent="center">
                    <FormControl component="fieldset">
                        <RadioGroup name={`${qno}`} value={this.state.answers.get(qno)} onChange={this.handleChange}>
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
                    </FormControl>
                </Grid>
            </Paper>
        ));
    };

    render() {
        const { classes } = this.props;
        return (
            <div style={{ height: "100%" }}>
                <Paper component={Grid} container alignContent="center" style={{ height: "15%" }}>
                    <Typography variant="h5" className={classes.heading}>
                        PHQ-9 Quesionaire
                    </Typography>
                </Paper>
                <Grid container style={{ marginTop: 10, height: "85%", overflowY: "scroll", overflowX: "wrap" }}>
                    <form style={{ width: "100%" }}>
                        {this.renderQuestions()}
                        <Grid container justify="center">
                            <Button variant="contained" color="primary" type="submit" style={{ margin: "2em 0em" }}>
                                Submit
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.phq.isLoading,
    questions: state.phq.questions,
});

export default connect(mapStateToProps, { fetchQuestions, postAnswer })(withStyles(style)(PHQ));

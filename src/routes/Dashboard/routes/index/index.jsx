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

const style = (theme) => ({
    content: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(3),
    },
    heading: {
        padding: theme.spacing(2),
    },
});

const PHQ = [
    ["Little interest or pleasure in doing things?", "q1"],
    ["Feeling down, depressed, or hopeless?", "q2"],
    ["Trouble falling or staying asleep, or sleeping too much?", "q3"],
    ["Feeling tired or having little energy?", "q4"],
    ["Poor appetite or overeating?", "q5"],
    ["Feeling bad about yourself - or that you are a failure or have let yourself or your family down?", "q6"],
    ["Trouble concentrating on things, such as reading the newspaper or watching television?", "q7"],
    [
        "Moving or speaking so slowly that other people could have noticed? \nOr the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
        "q8",
    ],
    ["Thoughts that you would be better off dead, or of hurting yourself in some way?", "q9"],
];

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "", q8: "", q9: "" };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    renderQuestions = () => {
        const { classes } = this.props;
        return PHQ.map((question) => (
            <Paper
                component={Grid}
                key={question[1]}
                container
                item
                xs={12}
                spacing={2}
                direction="row"
                className={classes.content}
            >
                <Grid component={Grid} item xs={12} md={6}>
                    <Typography variant="h6">{question[0]}</Typography>
                </Grid>
                <Grid component={Grid} container item xs={12} md={6} alignContent="center">
                    <FormControl component="fieldset">
                        <RadioGroup name={question[1]} value={this.state[question[1]]} onChange={this.handleChange}>
                            <FormControlLabel
                                value={0}
                                control={<Radio />}
                                checked={this.state[question[1]] === "0"}
                                label="Not at all"
                            />
                            <FormControlLabel
                                value={1}
                                control={<Radio />}
                                checked={this.state[question[1]] === "1"}
                                label="Several Days"
                            />
                            <FormControlLabel
                                value={2}
                                control={<Radio />}
                                checked={this.state[question[1]] === "2"}
                                label="More than half the days"
                            />
                            <FormControlLabel
                                value={3}
                                checked={this.state[question[1]] === "3"}
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
                    <form>
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

export default withStyles(style)(Index);

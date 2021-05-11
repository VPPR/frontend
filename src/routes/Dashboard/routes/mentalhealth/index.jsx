import React from "react";
import { Grid, Paper, Typography, Card, CardContent, CardHeader } from "@material-ui/core";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { fetchScore } from "redux/phq/action";
import { connect } from "react-redux";
import { buildStyles } from "react-circular-progressbar";

class MentalHealth extends React.Component {
    componentDidMount() {
        this.props.fetchScore();
    }

    path_colors = ["#7ED957", "#DBC63B", "#ED9A43", "#E8630E", "#E62626"];

    colorRender = (score) => {
        if (score < 5) {
            return this.path_colors[0];
        } else if (score >= 5 && score < 9) {
            return this.path_colors[1];
        } else if (score >= 9 && score < 15) {
            return this.path_colors[2];
        } else if (score >= 15 && score < 20) {
            return this.path_colors[3];
        } else if (score >= 20 && score <= 27) {
            return this.path_colors[4];
        }
    };

    render() {
        const percentage = 69;
        const PHQScore = this.props.PHQScore;
        return (
            <>
                <Paper component={Grid} container alignContent="center" style={{ height: "12%", padding: "10px" }}>
                    <Typography variant="h5">Health Report</Typography>
                    <Typography></Typography>
                </Paper>
                <Typography>PHQScore:{PHQScore?.score}</Typography>
                <Typography>Last record time:{PHQScore?.last_answered}</Typography>
                <Grid container>
                    <Grid item sm={4} style={{ paddingTop: "10px" }}>
                        <Card variant="elevation">
                            <CardHeader title="PHQ Score"></CardHeader>
                            <CardContent>
                                <div style={{ width: 150, height: 150 }}>
                                    <CircularProgressbar
                                        maxValue={27}
                                        value={PHQScore?.score}
                                        text={PHQScore?.score ? `${PHQScore?.score}/27` : "-"}
                                        styles={buildStyles({
                                            strokeLinecap: "butt",
                                            pathColor: `${this.colorRender(PHQScore?.score)}`,
                                            textColor: `${this.colorRender(PHQScore?.score)}`,
                                            trailColor: "#494f56",
                                        })}
                                    ></CircularProgressbar>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={4} style={{ padding: "10px" }}>
                        <Card variant="elevation">
                            <CardHeader title="Sleep Statistics"></CardHeader>
                            <CardContent>
                                <div style={{ width: 150, height: 150 }}>
                                    <CircularProgressbar
                                        value={percentage}
                                        text={`${percentage}%`}
                                    ></CircularProgressbar>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={4} style={{ paddingTop: "10px" }}>
                        <Card variant="elevation">
                            <CardHeader title="Calories"></CardHeader>
                            <CardContent>
                                <div style={{ width: 150, height: 150 }}>
                                    <CircularProgressbar value={percentage} text={`${percentage}%`}>
                                        Coming soon
                                    </CircularProgressbar>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    PHQScore: state.phq.score,
});

export default connect(mapStateToProps, { fetchScore })(MentalHealth);

import React from "react";
import { Grid, Paper, Typography, Card, CardContent, CardHeader, withStyles } from "@material-ui/core";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { fetchScore } from "redux/phq/action";
import { connect } from "react-redux";
import { buildStyles } from "react-circular-progressbar";
import PHQChart from "./components/PHQChart";
import HRV from "./components/HRV";
import  Hidden from "@material-ui/core/Hidden";

const styles = (theme) => ({
    content: {
        paddingTop: theme.spacing(1),
    },
});

class MentalHealth extends React.Component {
    componentDidMount() {
        this.props.fetchScore();
    }

    path_colors = ["#7ED957", "#DBC63B", "#ED9A43", "#E8630E", "#E62626"];

    colorRender = (score) => {
        if (score <=4) {
            return this.path_colors[0];
        } else if (score>4 && score <=9) {
            return this.path_colors[1];
        } else if (score>9 && score<=14) {
            return this.path_colors[2];
        } else if (score >14 && score <=19) {
            return this.path_colors[3];
        } else if (score>19) {
            return this.path_colors[4];
        }
    };

    render() {
        const classes = this.props.classes;
        const PHQScore = this.props.PHQScore;
        const lastAnswered = PHQScore?.last_answered ? new Date(PHQScore?.last_answered) : undefined;
        let datetime = lastAnswered
            ? ` ${lastAnswered.toLocaleDateString("default", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
              })} ${lastAnswered.toLocaleTimeString()}`
            : "";
        return (
            <>
                <Paper component={Grid} container justify="space-between" style={{ padding: "10px" }}>
                    <Typography variant="h5">Health Report</Typography>
                </Paper>   
                
                <Grid container className={classes.content} spacing={1} justify="center">
                    <Grid item xs={12} md={6}>
                        <Card variant="elevation">
                            <CardHeader title="PHQ Score"></CardHeader>
                            <CardContent>
                                <div style={{ width: 250, height: 250 }}>
                                    <CircularProgressbar
                                        maxValue={27}
                                        value={PHQScore?.score}
                                        text={PHQScore?.score ? `${PHQScore?.score.toFixed(2)}/27` : "--"}
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
                    <Hidden only={['xs','sm']}>
                    <Grid item xs={12} md={6}>
                        <Card variant="elevation">
                            <CardHeader title="What is PHQ-9 Score?"></CardHeader>
                            <CardContent>
                                <div style={{ width: "100%", height: 250 }}>
                                    The PHQ-9 is a DSM-5 stanadard accepted questionnaire. Score can range from 0-27
                                    with each question holding 3 marks. The score indicates the level of depression.
                                    These scores are divided into the follwing catergories as severity level of
                                    depression.
                                    <ul>
                                        <li>0-4 - No Depression </li>
                                        <li>5-9 - Mild Depression</li>
                                        <li>10-14 - Moderate Depression </li>
                                        <li>15-19 - Moderately Severe</li>
                                        <li>greater than 20 - Severe</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    </Hidden>

                    <Grid item xs={12} md={6}>
                        <Card variant="elevation">
                            <CardHeader title="HRV Based Depression Rating"></CardHeader>
                            <CardContent>
                                <div style={{ width: 250, height: 250 }}>
                                    <HRV></HRV>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Hidden only={['xs','sm']}>
                    <Grid item md={6}>
                        <Card variant="elevation">
                            <CardHeader title="HRV Based Depression Rating"></CardHeader>
                            <CardContent>
                                <div style={{ width: "100%", height: 250 }}>
                                    This rating is based on the data collected from the smart band. Based on your
                                    heartrate. We compute some parameters and our trained model to find out the
                                    severity. The output is based on your recent mood scores and may vary over time. So,
                                    don't jump into conclusions quickly!
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    </Hidden>
                    <Grid item xs={12} md={6}>
                        <Card variant="elevation">
                                <CardHeader title="Depression Score Variation Chart"></CardHeader>
                                <CardContent>
                                    <div style={{ width: "100%", height:250 }}>
                                        <PHQChart></PHQChart>
                                    </div>
                                </CardContent>
                            </Card>
                    </Grid>    
                    <Hidden only={['xs','sm']}>
                    <Grid item md={6}>
                        <Card variant="elevation">
                            <CardHeader title="What does this chart indicate?"></CardHeader>
                            <CardContent>
                                <div style={{ width: "100%", height: 250 }}>
                                    This chart is based on your PHQ-9 scores and indicates
                                    your mood variation over a period of 14 days.
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    </Hidden>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    PHQScore: state.phq.score,
});

export default connect(mapStateToProps, { fetchScore })(withStyles(styles)(MentalHealth));

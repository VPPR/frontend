import React, { PureComponent } from "react";
import { fetchHRV } from "redux/band/action";
import { connect } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { buildStyles } from "react-circular-progressbar";
import { Grid } from "@material-ui/core";

class HRV extends PureComponent {
    componentDidMount() {
        this.props.fetchHRV();
    }

    path_colors = ["#7ED957", "#ED9A43", "#E62626"];

    moodDetermine = (trues, total) => {
        var mood = (trues * 100) / total;
        if (mood <= 33) {
            return "Low";
        } else if (mood > 33 && mood < 67) {
            return "Medium";
        } else if (mood > 67) {
            return "High";
        }
    };

    colorRender = (trues, total) => {
        var mood = (trues * 100) / total;
        if (mood <= 33) {
            return this.path_colors[0];
        } else if (mood > 33 && mood < 67) {
            return this.path_colors[1];
        } else if (mood > 67) {
            return this.path_colors[2];
        }
    };
    render() {
        const hrv = this.props.hrv;
        const lastActivity = hrv[0]?.end_time ? new Date(hrv[0]?.end_time) : undefined;
        let last_activity_end = lastActivity
            ? `${lastActivity.toLocaleDateString("default", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
              })} ${lastActivity.toLocaleTimeString()}`
            : "";
        let count = {};
        hrv.forEach((x) => {
            var k = x.depressed;
            count[k] = (count[k] || 0) + 1;
        });

        var total = count.false + count.true;
        var pathcolor = this.colorRender(count.true, total);
        var mood_status = this.moodDetermine(count.true, total);
        return (
            <>
                <Grid item xs={12} md={6}>
                    <div style={{ height: 230, width: 230 }}>
                        <CircularProgressbar
                            maxValue={total}
                            value={count.true}
                            text={mood_status}
                            styles={buildStyles({
                                strokeLinecap: "butt",
                                pathColor: pathcolor,
                                textColor: pathcolor,
                                trailColor: "#494f56",
                            })}
                        ></CircularProgressbar>
                    </div>
                </Grid>
                <Grid container item xs={12} md={6} alignContent="center">
                    <div>Depression Probability: {((count.true * 100) / total).toFixed(2)}%</div>
                    <div>Last Recorded: {last_activity_end}</div>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    hrv: state.band.hrv,
});

export default connect(mapStateToProps, { fetchHRV })(HRV);

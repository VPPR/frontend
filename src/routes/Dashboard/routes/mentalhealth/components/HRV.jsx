import React, { PureComponent } from "react";
import { fetchHRV } from "redux/band/action";
import { connect } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { buildStyles } from "react-circular-progressbar";

class HRV extends PureComponent {
    componentDidMount() {
        this.props.fetchHRV();
    }

    path_colors = ["#7ED957", "#ED9A43", "#E62626"];

    moodDetermine = (trues, total) => {
        var mood = (trues * 100) / total;
        if (mood <= 33) {
            return "low";
        } else if (mood > 33 && mood < 67) {
            return "mod";
        } else if (mood > 67) {
            return "high";
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
        let count = {};

        hrv.forEach((x) => {
            var k = x.depressed;
            count[k] = (count[k] || 0) + 1;
        });

        var total = count.false + count.true;
        var pathcolor = this.colorRender(count.true, total);
        return (
            <>
                <div style={{ width: 150, height: 150 }}>
                    <CircularProgressbar
                        maxValue={total}
                        value={count.true}
                        text={this.moodDetermine(count.true, total)}
                        styles={buildStyles({
                            strokeLinecap: "butt",
                            pathColor: pathcolor,
                            textColor: pathcolor,
                            trailColor: "#494f56",
                        })}
                    ></CircularProgressbar>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    hrv: state.band.hrv,
});

export default connect(mapStateToProps, { fetchHRV })(HRV);

import React, { PureComponent } from "react";
import { fetchDailyScore } from "redux/phq/action";
import { connect } from "react-redux";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";

class PHQChart extends PureComponent {
    componentDidMount() {
        this.props.fetchDailyScore();
    }

    render() {
        return (
            <>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={this.props.data}>
                        <XAxis dataKey="date" padding={{ left: 30 }} stroke="#f01ae5">
                            <Label
                                value="Date"
                                offset={-4}
                                fill="#3d7be0"
                                position="insideBottom"
                                textDecoration="none"
                            ></Label>
                        </XAxis>
                        <YAxis stroke="#f01ae5">
                            <Label value="PHQ Score" angle="-90" position="insideLeft" fill="#3d7be0"></Label>
                        </YAxis>
                        <Tooltip separator=":"></Tooltip>
                        <Line type="" dataKey="estimated_phq" stroke="#20ad0e" strokeWidth="4"></Line>
                        <Line type="" dataKey="sum_of_avg" stroke="#cc6b16" strokeWidth="4"></Line>
                        <Legend verticalAlign="top"></Legend>
                    </LineChart>
                </ResponsiveContainer>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.phq.dailyscores,
});

export default connect(mapStateToProps, { fetchDailyScore })(PHQChart);

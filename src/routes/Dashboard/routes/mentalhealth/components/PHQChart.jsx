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
                    <LineChart width={500} height={500} data={this.props.data}>
                        <XAxis dataKey="date" padding={{ left: 30 }} stroke="#3b08d1">
                            <Label value="Date" offset={-5} stroke="#26b5ed" position="insideBottom"></Label>
                        </XAxis>
                        <YAxis stroke="#3b08d1">
                            <Label value="PHQ Score" angle="-90" position="insideLeft" stroke="#26b5ed"></Label>
                        </YAxis>
                        <Tooltip separator=":"></Tooltip>
                        <Line type="" dataKey="estimated_phq" stroke="#20fc03" strokeWidth="4"></Line>
                        <Line type="" dataKey="sum_of_avg" stroke="#ed5d09" strokeWidth="4"></Line>
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

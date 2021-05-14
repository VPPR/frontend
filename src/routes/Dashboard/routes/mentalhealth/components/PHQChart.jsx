import React, { PureComponent } from "react";
import { fetchDailyScore } from "redux/phq/action";
import { connect } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

class PHQChart extends PureComponent {
    componentDidMount() {
        this.props.fetchDailyScore();
    }

    render() {
        return (
            <>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={500} height={500} data={this.props.data}>
                        <XAxis dataKey="date"></XAxis>
                        <YAxis></YAxis>
                        <Line type="monotone" dataKey="estimated_phq" stroke="#ffffff"></Line>
                        <Line type="monotone" dataKey="sum_of_avg" stroke="#0b70e3"></Line>
                    </LineChart>
                </ResponsiveContainer>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.phq.dailyscore,
});

export default connect(mapStateToProps, { fetchDailyScore })(PHQChart);

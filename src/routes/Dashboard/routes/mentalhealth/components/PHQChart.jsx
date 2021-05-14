import React from "react";
import { fetchDailyScore } from "redux/phq/action";
import { connect } from "react-redux";

class PHQChart extends React.Component {
    componentDidMount() {
        this.props.fetchDailyScore();
    }

    render() {
        return <div>Somem</div>;
    }
}

const mapStateToProps = (state) => ({
    data: state.phq.dailyscore,
});

export default connect(mapStateToProps, { fetchDailyScore })(PHQChart);

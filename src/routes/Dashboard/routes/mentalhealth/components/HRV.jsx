import React, { PureComponent } from "react";
import { fetchHRV } from "redux/band/action";
import { connect } from "react-redux";

class HRV extends PureComponent {
    componentDidMount() {
        this.props.fetchHRV();
    }
    render() {
        return (
            <>
                <h1>Au Jo</h1>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    hrv: state.band.HRV,
});

export default connect(mapStateToProps, { fetchHRV })(HRV);

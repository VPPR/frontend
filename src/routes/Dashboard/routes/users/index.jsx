import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUsers } from "redux/users/action";
import { CircularProgress, Grid } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

class Users extends React.Component {
  // constructor(props) {
  //     super(props);
  // }

  columns = () => [{
    headerName: "Full Name",
    field: "fullname",
    width: 200,
  }, {
    headerName: "Email",
    field: "email",
    width: 400,
  }, {
    headerName: "Phone Number",
    field: "phone",
    width: 150,
  }, {
    headerName: "Is Active",
    field: "isActive",
    flex: 1,
  }, {
    headerName: "Is Admin",
    field: "isAdmin",
    flex: 1,
  }];
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const { users, isLoading } = this.props;
    console.log(isLoading);
    if (isLoading) {
      return (
        <Grid
          container
          justify="center"
          alignContent="center"
          style={{ height: "100%" }}
        >
          <CircularProgress />
        </Grid>
      );
    }
    return (
      <div style={{ height: "100%", display: "flex" }}>
        {users &&
          <DataGrid columns={this.columns()} rows={users} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  isLoading: state.user.isLoading,
});

export default withRouter(connect(mapStateToProps, { fetchUsers })(Users));

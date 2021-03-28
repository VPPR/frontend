import React, { createRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUsers } from "redux/users/action";
import { CircularProgress, Grid, Typography, withStyles } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Check, Clear } from "@material-ui/icons";
import clsx from "clsx";

const styles = (theme) => ({
  centerItem: theme.styles.centerItem,
  green: {
    color: theme.palette.success.main,
  },
  red: {
    color: theme.palette.error.main,
  },
});

class Users extends React.Component {



  columns = [{
    headerName: "Full Name",
    field: "fullname",
    width: 150,
  }, {
    headerName: "Email",
    field: "email",
    width: 400,
  }, {
    headerName: "Phone Number",
    field: "phone",
    width: 200,
  }, {
    headerName: "Is Active",
    field: "is_active",
    width: 150,
    headerAlign: "center",
    renderCell: (params) => {
      return (params.value
        ? <Check
          className={clsx(
            this.props.classes.centerItem,
            this.props.classes.green,
          )}
        />
        : <Clear
          className={clsx(
            this.props.classes.centerItem,
            this.props.classes.red,
          )}
        />);
    },
  }, {
    headerName: "Is Admin",
    field: "is_admin",
    headerAlign: "center",
    width: 150,
    renderCell: (params) => {
      return (params.value
        ? <Check
          className={clsx(
            this.props.classes.centerItem,
            this.props.classes.green,
          )}
        />
        : <Clear
          className={clsx(
            this.props.classes.centerItem,
            this.props.classes.red,
          )}
        />);
    },
  }];

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users, isLoading } = this.props;
    if (isLoading) {
      return (
        <Grid container justify="center" alignContent="center" style={{ height: "100%" }}>
          <CircularProgress />
        </Grid>
      )
    }
    return (
      <div
        style={{
          height: "100%",
          width:"100%",
          display:"flex",
          flexDirection:"column"
        }}
      >
        <Typography variant="h3">Users</Typography>
        <div style={{
          height: "100%",
          width:"100%",
          paddingTop: 30
        }}>
          {users &&
            <DataGrid columns={this.columns} rows={users} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  isLoading: state.user.isLoading,
});

export default withRouter(
  withStyles(styles)(connect(mapStateToProps, { fetchUsers })(Users)),
);

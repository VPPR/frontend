import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchApprovalRequests, approveRequest } from "redux/approvals/action";
import { CircularProgress, Grid, Typography, withStyles, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Check, Clear } from "@material-ui/icons";
import clsx from "clsx";
import { toast } from "react-toastify";

const styles = (theme) => ({
    centerItem: theme.styles.centerItem,
    green: {
        color: theme.palette.success.main,
    },
    red: {
        color: theme.palette.error.main,
    },
});

class Approval extends React.Component {
    columns = [
        {
            headerName: "Full Name",
            field: "fullname",
            width: 150,
        },
        {
            headerName: "Email",
            field: "email",
            width: 400,
        },
        {
            headerName: "Phone Number",
            field: "phone",
            width: 200,
        },
        {
            headerName: "Is Active",
            field: "is_active",
            width: 150,
            headerAlign: "center",
            renderCell: (params) => {
                return params.value ? (
                    <Check className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Clear className={clsx(this.props.classes.centerItem, this.props.classes.red)} />
                );
            },
        },
        {
            headerName: "Is Admin",
            field: "is_admin",
            headerAlign: "center",
            width: 150,
            renderCell: (params) => {
                return params.value ? (
                    <Check className={clsx(this.props.classes.centerItem, this.props.classes.green)} />
                ) : (
                    <Clear className={clsx(this.props.classes.centerItem, this.props.classes.red)} />
                );
            },
        },
        {
            headerName: "Actions",
            field: "actions",
            renderCell: (params) => (
                <Button
                    onClick={() => {
                        this.props.approveRequest(params.row.id);
                    }}
                    color="primary"
                >
                    Approve
                </Button>
            ),
        },
    ];

    componentDidMount() {
        this.props.fetchApprovalRequests();
    }

    componentDidUpdate() {
        if (this.props.approvedUser) {
            toast.success(`${this.props.approvedUser.fullname} approved`, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    render() {
        const { approvals, isLoading } = this.props;
        if (isLoading) {
            return (
                <Grid container justify="center" alignContent="center" style={{ height: "100%" }}>
                    <CircularProgress />
                </Grid>
            );
        }
        return (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography variant="h3">Approval Requests</Typography>
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        paddingTop: 30,
                    }}
                >
                    {approvals && <DataGrid columns={this.columns} rows={approvals} />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    approvals: state.approval.approvals,
    isLoading: state.approval.isLoading,
    approvedUser: state.approval.approvedUser,
});

export default withRouter(
    withStyles(styles)(connect(mapStateToProps, { fetchApprovalRequests, approveRequest })(Approval))
);

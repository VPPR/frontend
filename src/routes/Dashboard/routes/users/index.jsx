import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "redux/users/action";
import { CircularProgress, Grid, IconButton, Typography, withStyles } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Add, Check, Clear, Delete, Edit } from "@material-ui/icons";
import clsx from "clsx";
import UserModal from "./components/UserModal";

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
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
        };
    }

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
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton
                        onClick={() => {
                            this.editUser(params.row.id);
                        }}
                        color="primary"
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            this.props.deleteUser(params.row.id);
                        }}
                        color="primary"
                    >
                        <Delete />
                    </IconButton>
                </>
            ),
        },
    ];

    editUser = (id) => {
        this.setState({ selectedUser: id, modalOpen: true });
    };

    closeModal = () => {
        this.setState({ modalOpen: false });
    };

    openModal = () => {
        this.setState({ selectedUser: undefined, modalOpen: true });
    };
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const { users, isLoading } = this.props;
        const { modalOpen } = this.state;
        if (isLoading && !modalOpen) {
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
                {modalOpen && (
                    <UserModal onClose={this.closeModal} open={this.state.modalOpen} id={this.state.selectedUser} />
                )}
                <Grid container justify="space-between">
                    <Typography variant="h3">Users</Typography>
                    <div>
                        <IconButton onClick={() => this.openModal()}>
                            <Add />
                        </IconButton>
                    </div>
                </Grid>
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        paddingTop: 30,
                    }}
                >
                    {users && <DataGrid columns={this.columns} rows={users} />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    isLoading: state.user.isLoading,
});

export default withRouter(withStyles(styles)(connect(mapStateToProps, { fetchUsers, deleteUser })(Users)));

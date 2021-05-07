import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { fetchUserSelf } from "redux/users/action";
import { CircularProgress } from "@material-ui/core";
import { Assignment, Backup, Home, Person } from "@material-ui/icons";

export const allowedRoutes = (is_admin) => {
    if (is_admin) {
        return [
            { name: "Home", path: "/dashboard", component: Home },
            {
                name: "Users",
                path: "/dashboard/users",
                component: Person,
            },
        ];
    }
    return [
        { name: "Home", path: "/dashboard", component: Home },
        { name: "PHQ-9 Questionaire", path: "/dashboard/phq", component: Assignment },
        {
            name: "Upload",
            path: "/dashboard/upload",
            component: Backup,
        },
    ];
};

function AuthenticatedRoute(props) {
    const { rehydrated, isLoggedIn, currentUser, isAdmin, fetchUserSelf } = props;
    useEffect(() => {
        if (rehydrated && isLoggedIn && !currentUser) {
            fetchUserSelf();
        }
    }, [rehydrated, isLoggedIn, currentUser, fetchUserSelf]);
    if (rehydrated) {
        if (!isLoggedIn) {
            return <Redirect to="/login" />;
        } else if (!currentUser) {
            return <CircularProgress />;
        } else if (allowedRoutes(isAdmin).filter((x) => x.path === props.path).length) {
            return <Route {...props} />;
        }

        return <Redirect to="/dashboard" />;
    } else {
        return <CircularProgress />;
    }
}
const mapStateToProps = (state) => ({
    rehydrated: state._persist.rehydrated,
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.user.currentUser,
    isAdmin: state.user.currentUser ? state.user.currentUser.is_admin : false,
});
export default connect(mapStateToProps, { fetchUserSelf })(AuthenticatedRoute);

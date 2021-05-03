import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import PublishIcon from "@material-ui/icons/Publish";
import HomeIcon from "@material-ui/icons/Home";
import { useEffect } from "react";
import { fetchUserSelf } from "redux/users/action";
import { CircularProgress } from "@material-ui/core";
import { Assignment } from "@material-ui/icons";

export const allowedRoutes = (is_admin) => {
    if (is_admin) {
        return [
            { name: "Home", path: "/dashboard", component: HomeIcon },
            {
                name: "Users",
                path: "/dashboard/users",
                component: PersonIcon,
            },
        ];
    }
    return [
        { name: "Home", path: "/dashboard", component: HomeIcon },
        { name: "PHQ-9 Questionaire", path: "/dashboard/phq", component: Assignment },
        {
            name: "Upload",
            path: "/dashboard/upload",
            component: PublishIcon,
        },
    ];
};

function AuthenticatedRoute(props) {
    const { rehydrated, isLoggedIn, currentUser, is_admin, fetchUserSelf } = props;
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
        } else if (allowedRoutes(is_admin).filter((x) => x.path === props.path)) {
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

import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import PublishIcon from "@material-ui/icons/Publish";
import HomeIcon from "@material-ui/icons/Home";
import { useEffect } from "react";
import { fetchUserSelf } from "redux/users/action";

export const allowedRoutes = (is_admin) => {
  if (is_admin) {
    return ([{ name: "Dashboard", path: "/dashboard", component: HomeIcon }, {
      name: "Users",
      path: "/dashboard/users",
      component: PersonIcon,
    }]);
  }
  return ([{ name: "Dashboard", path: "/dashboard", component: HomeIcon }, {
    name: "Upload",
    path: "/dashboard/upload",
    component: PublishIcon,
  }]);
};

function AuthenticatedRoute(props) {
  useEffect(() => {
    if (props.rehydrated && props.isLoggedIn && !props.currentUser) {
      props.fetchUserSelf();
    }
  });
  if (props.rehydrated) {
    if (!props.isLoggedIn) {
      return <Redirect to="/login" />;
    } else if (!props.currentUser) {
      return "wait";
    } else if (
      allowedRoutes(props.is_admin).filter((x) => x.path === props.path)
    ) {
      return (<Route {...props} />);
    }

    return <Redirect to="/dashboard" />;
  } else {
    return "wait";
  }
}
const mapStateToProps = (state) => ({
  rehydrated: state._persist.rehydrated,
  isLoggedIn: state.auth.isLoggedIn,
  currentUser: state.user.currentUser,
  isAdmin: state.user.currentUser ? state.user.currentUser.is_admin : false,
});
export default connect(mapStateToProps, { fetchUserSelf })(AuthenticatedRoute);

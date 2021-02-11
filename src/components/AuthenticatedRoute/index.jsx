import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
export const allowedRoutes = {
  admin: ["/dashboard", "/users"],
  user: ["/dashboard", "/upload"],
};

function AuthenticatedRoute(props) {
  const userType = props.isAdmin ? "admin" : "user";
  if (props.rehydrated) {
    if (!props.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    if (allowedRoutes[userType].includes(props.path)) {
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
  isAdmin: state.user.currentUser ? state.user.currentUser.is_admin : false,
});
export default connect(mapStateToProps)(AuthenticatedRoute);

import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
export const allowedRoutes = {
  admin: ["/dashboard", "/users"],
  user: ["/dashboard", "/upload"],
};

function AuthenticatedRoute(props) {
  if (props.rehydrated) {
    if (!props.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    if (allowedRoutes[props.userType].includes(props.path)) {
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
  userType: state.auth.userType,
});
export default connect(mapStateToProps)(AuthenticatedRoute);

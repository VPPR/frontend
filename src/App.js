import { Grid } from "@material-ui/core";
import Login from "routes/Login";
import Signup from "routes/Signup";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "components/AuthenticatedRoute";
import { makeStyles } from "@material-ui/core";
import Dashboard from "routes/Dashboard";
import Landing from "routes/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const useStyles = makeStyles((theme) => ({
  fullScreen: {
    minHeight: "100vh",
    minWidth: "100vw",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <ToastContainer autoClose={5000} />
      <Grid
        container
        alignContent="center"
        justify="center"
        className={classes.fullScreen}
      >
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <AuthenticatedRoute
            path="/dashboard"
            component={Dashboard}
          />
          <Route path="/" component={Landing} />
        </Switch>
      </Grid>
    </>
  );
}

export default App;

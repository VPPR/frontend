import { Grid, makeStyles } from "@material-ui/core";

import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Signup from "components/Signup";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "components/AuthenticatedRoute";

function App() {
  return (
    <Grid
      container
      alignContent="center"
      justify="center"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "#282c34",
      }}
    >
      <Switch>
          <Route
            path="/admin/login"
            component={() => (<Login userType="admin" />)}
          />
          <Route path="/admin/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <AuthenticatedRoute
            path="/dashboard"
            render={() => (<div>Hello World</div>)}
          />
          <Route path="/" render={() => (<div>Index</div>)} />
        </Switch>
    </Grid>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Signup from "components/Signup";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "components/AuthenticatedRoute";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
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
      </header>
    </div>
  );
}

export default App;

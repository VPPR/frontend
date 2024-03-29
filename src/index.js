import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "redux/store";
import { CssBaseline } from "@material-ui/core";
import { CustomThemeProvider } from "context/theme-context";
import * as serviceWorker from "./serviceWorkerRegistration";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <CustomThemeProvider>
                <CssBaseline />
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </CustomThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
serviceWorker.register();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "redux/store";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    background: {
      default: "#d5d5d5",
      paper: "#ffffff",
      header: "#1e1e1e",
      sidebar: "#1e1e1e"
    },
    text: {
      sidebar: "#ffffff"
    }
  },
  overrides: {
    MuiDataGrid: {
      root: {
        border: "1px solid #626262",
        "& .MuiDataGrid-columnsContainer": {
          borderBottom: "1px solid #626262"
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "1px solid #626262"
        },
        "& .MuiDataGrid-columnSeparator": {
          color: "#626262"
        }
      },
    },



  },
  styles: {
    centerItem: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  }
})

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#0c1112", //"#2a2d36",//"#0e1017", //
      paper: "#202829",
      header: "#14191a", //"#383c48"//"#171922"//
    },
    primary: {
      main: "#1a6bab",
    },
    text: {
      sidebar: "#ffffff"
    }
  },
  styles: {
    centerItem: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches ? darkTheme : lightTheme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

import { createContext, useState, useContext, useMemo, useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
const ThemeContext = createContext();

const lightPalette = {
    type: "light",
    background: {
        paper: "#ffffff",
        header: "#1e1e1e",
        sidebar: "#1e1e1e",
    },
    text: {
        sidebar: "#ffffff",
    },
};
const lightOverride = {
    MuiDataGrid: {
        root: {
            border: "1px solid #626262",
            "& .MuiDataGrid-columnsContainer": {
                borderBottom: "1px solid #626262",
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #626262",
            },
            "& .MuiDataGrid-columnSeparator": {
                color: "#626262",
            },
        },
    },
};

const styles = {
    centerItem: {
        marginLeft: "auto",
        marginRight: "auto",
    },
};
const darkPalette = {
    type: "dark",
    background: {
        default: "#0c1112", //"#2a2d36",//"#0e1017", //
        paper: "#151b1c",
        header: "#14191a", //"#383c48"//"#171922"//
        sidebar: "#151b1c",
    },
    primary: {
        main: "#513cde", //"#1a6bab",
    },
    text: {
        sidebar: "#ffffff",
    },
};

export function CustomThemeProvider({ children }) {
    function getLocalTheme() {
        let themeString = localStorage.getItem("theme");
        if (themeString === "true") {
            return true;
        } else if (themeString === "false") {
            return false;
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return true;
        } else {
            return false;
        }
    }
    const [isDarkTheme, setTheme] = useState(getLocalTheme);
    useEffect(() => {
        localStorage.setItem("theme", isDarkTheme);
    }, [isDarkTheme]);

    const theme = useMemo(
        () =>
            createMuiTheme({
                palette: isDarkTheme ? darkPalette : lightPalette,
                overrides: isDarkTheme ? {} : lightOverride,
                styles: styles,
            }),
        [isDarkTheme]
    );
    const toggleTheme = () => {
        setTheme(!isDarkTheme);
    };
    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
}
export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("AuthProvider not present");
    }
    return context;
}

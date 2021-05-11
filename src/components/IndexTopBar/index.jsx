import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import clsx from "clsx";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: theme.palette.background.header,
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
    },
    image: {
        height: "16.9rem",
        width: "16.9rem",
        fontSize: "6.9rem",
        marginBottom: "2rem",
    },
    link: {
        color: "white",
        textDecoration: "none",
        //padding: "10px 10px",
        width: "6rem",
        textAlign: "center",
        "&:hover": {
            backgroundColor: "rgba(255,255,255,0.1)", //theme.palette.text.primary.light,
        },
    },
}));
function IndexTopBar() {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={clsx(classes.appBar)}>
            <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link to="/login" className={classes.link}>
                    <h3>Login</h3>
                </Link>
                <Link to="/signup" className={classes.link}>
                    <h3>Sign Up</h3>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default IndexTopBar;

import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Button, Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import { useThemeContext } from "context/theme-context";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.sidebar,
        color: theme.palette.text.sidebar,
    },
    component: {
        color: theme.palette.text.sidebar,
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
        },
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
        [theme.breakpoints.down("md")]: {
            width: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    active: {
        backgroundColor: "rgba(255,255,255,0.09)",
    },
}));

function Sidebar(props) {
    const classes = useStyles();
    const { isDarkTheme, toggleTheme } = useThemeContext();
    const open = props.open;
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({ [classes.paper]: true, [classes.drawerOpen]: open, [classes.drawerClose]: !open }),
            }}
            {...props}
        >
            <div className={classes.toolbar}></div>
            <Divider />
            <Grid container direction="column" style={{ height: "inherit" }} justify="space-between">
                <List style={{ padding: 0 }}>
                    {props.routes.map((route, index) => (
                        <ListItem
                            component={NavLink}
                            to={route.path}
                            button
                            key={route.name}
                            activeClassName={classes.active}
                            exact
                        >
                            <ListItemIcon>
                                <route.component className={classes.component} />
                            </ListItemIcon>
                            <ListItemText primary={route.name} />
                        </ListItem>
                    ))}
                </List>
                <List>
                    <ListItem
                        component={Button}
                        style={{ borderRadius: 0, textTransform: "none" }}
                        onClick={() => toggleTheme()}
                    >
                        <ListItemIcon>
                            {isDarkTheme ? (
                                <Brightness4 className={classes.component} />
                            ) : (
                                <Brightness7 className={classes.component} />
                            )}
                        </ListItemIcon>
                        <ListItemText className={classes.component} primary={`Change Theme`} />
                    </ListItem>
                </List>
            </Grid>
        </Drawer>
    );
}

export default Sidebar;

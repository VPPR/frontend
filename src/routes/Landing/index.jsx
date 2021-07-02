import { Divider, Grid, makeStyles, Typography, useTheme } from "@material-ui/core";
import { Description, Email, GitHub } from "@material-ui/icons";
import IndexTopBar from "components/IndexTopBar";
import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    divider: {
        marginLeft: theme.spacing(9),
        marginRight: theme.spacing(9),
        width: 4,
        backgroundColor: theme.palette.text.primary,
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    toolbar: theme.mixins.toolbar,
    links: {
        paddingTop: theme.spacing(9),
    },
    link: {
        textDecoration: "none",
        color: "white",
        backgroundColor: theme.palette.background.header,
        borderRadius: theme.spacing(5),
        paddingTop: theme.spacing(1), //theme.palette.text.primary.light,
        paddingLeft: theme.spacing(1.1),
        paddingRight: theme.spacing(1.1),
        paddingBottom: theme.spacing(0.7),
        display: "flex",
        marginTop: theme.spacing(1),
    },
    linkText: {
        paddingLeft: theme.spacing(0.5),
        margin: theme.spacing(0.5),
    },
}));

function Landing(props) {
    const {
        palette: { type },
    } = useTheme();
    const classes = useStyles();
    const { rehydrated, isLoggedIn } = props;

    if (rehydrated && isLoggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <Grid item container justify="center" alignContent="center">
            <IndexTopBar></IndexTopBar>
            <div className={classes.toolbar} />
            <Grid container justify="center" alignContent="center">
                <Grid container item xs={12} md={4} justify="center">
                    <img
                        src={type === "dark" ? `/vppr-whitetext.svg` : `/vppr-darktext.svg`}
                        height="250"
                        width="300"
                        alt="VPPR Logo"
                    />
                </Grid>
                <Divider orientation="vertical" flexItem={true} className={classes.divider} />
                <Grid container item alignContent="center" xs={12} md={4} justify="center">
                    <Typography variant="h4" align="center">
                        A Smart Solution For Detecting Depression
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={9} sm={4} md={3} justify="space-around" className={classes.links}>
                <a href="https://github.com/vppr" className={classes.link} target="_blank" rel="noreferrer">
                    <GitHub /> <div className={classes.linkText}>Github</div>
                </a>
                <a
                    href="https://www.irjet.net/archives/V8/i4/IRJET-V8I4649.pdf"
                    className={classes.link}
                    target="_blank"
                    rel="noreferrer"
                >
                    <Description /> <div className={classes.linkText}>Paper</div>
                </a>
                <a href="mailto:contact@vppr.tech" className={classes.link} target="_blank" rel="noreferrer">
                    <Email />
                    <div className={classes.linkText}> Email</div>
                </a>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
    rehydrated: state._persist.rehydrated,
    isLoggedIn: state.auth.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(Landing));

import { Grid, Paper } from "@material-ui/core";

function HRV(props) {
    return (
        // <Paper component={Grid} container item style={{ height: "100%" }} alignContent="center" justify="center">
        //     <Fade in={true} timeout={{ appear: 5000 }}>
        //         <Typography variant="h3">Phase 1</Typography>
        //     </Fade>
        // </Paper>
        <Paper component={Grid} container item style={{ height: "100%" }} alignContent="center" justify="center">
            <iframe
                title="presentation"
                src="https://vppr.github.io/revealjs-hidden/"
                style={{ width: "100%", height: "100%" }}
            ></iframe>
        </Paper>
    );
}

export default HRV;

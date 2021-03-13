import { AppBar, Button, makeStyles, Toolbar, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#455a64",
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow:1,
  },
  image :{
        height: "16.9rem",
        width: "16.9rem",
        fontSize: "6.9rem",
        marginBottom: "2rem",
  },
}));
function IndexTopBar() {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar)}
    >
      <Toolbar>
        <Typography variant="h5" noWrap color="textPrimary" className={classes.title}>
          VPPR
        </Typography>
        <Link to="/Login" style={{textDecoration:'none'}}>
           <Button variant="contained" color="primary">Login</Button>
         </Link>
         <Link to="/SignUp" style={{textDecoration:'none'}}>
           <Button variant="contained" color="primary">Sign Up</Button>
         </Link>
        
      </Toolbar>
    </AppBar>
  );
}

export default IndexTopBar;
 

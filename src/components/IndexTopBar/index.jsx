import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.background,
    zIndex: theme.zIndex.drawer + 1,
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
        <Typography variant="h5" noWrap color="textPrimary">
          VPPR
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default IndexTopBar;

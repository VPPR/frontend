import {AppBar, Toolbar, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography"
import clsx from "clsx";

const useStyles = makeStyles((theme)=>({
    appBar:{
      background:theme.palette.background,
      zIndex:theme.zIndex.drawer+2
    },
  }
));
function IndexTopBar({handleDrawer}) {
  const classes = useStyles();
  return(
  <AppBar
  position="fixed"
  className= {clsx(classes.appBar)}>
  <Toolbar>
  <Typography variant="h5" noWrap color="textPrimary">
      VPPR
  </Typography>
  </Toolbar>

  </AppBar>
   );
}

export default IndexTopBar;

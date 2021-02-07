import { AppBar, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.background.default,
    zIndex: theme.zIndex.drawer + 1,
  },
}));
function Header({ handleDrawer }) {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar //      {
        //   [classes.appBarShift]: open,
        // }
      )}
    >
      <Toolbar>
        <IconButton
          color="default"
          aria-label="open drawer"
          onClick={handleDrawer}
          edge="start"
          className={clsx(classes.menuButton //      {
            //   [classes.hide]: open,
            // }
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap color="textPrimary">
          Mini variant drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

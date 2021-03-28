import { AppBar, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { ExitToApp, Menu } from "@material-ui/icons";
import { connect } from "react-redux";
import { logout } from "redux/auth/action";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.background.header,
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    height:theme.mixins.toolbar.minHeight-10
  },
  menuButton: {
    color:theme.palette.text.sidebar,
    marginRight: "1rem",
  },
}));
function Header({ handleDrawer, logout }) {
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
          aria-label="open drawer"
          onClick={handleDrawer}
          edge="start"
          className={clsx(classes.menuButton //      {
            //   [classes.hide]: open,
            // }
          )}
        >
          <Menu />
        </IconButton>
        <div style={{flexGrow:1}}>
        <img src="/vppr-whitetext.svg" className={classes.logo}/>
        </div>
        {/* <Typography
          variant="h6"
          noWrap
          color="textPrimary"
          style={{ flexGrow: 1 }}
        >
          VPPR
        </Typography> */}
        <Link to="/" onClick={logout}>
          <IconButton color="secondary">
            <ExitToApp />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default connect(null, { logout })(Header);

import clsx from "clsx";
//Material ui core
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
//Material ui icons
import { Menu as MenuIcon } from "@material-ui/icons";
//Shared components
import DesktopView from "./DesktopView";
import MobileView from "./MobileView/MobileView";
import Logo from "../../../Assets/Logo.png";


const Header = (props) => {
  const { classes, open, handleDrawerOpen, handleDrawerClose, isMobile } = props;

  return (
    <AppBar
      square
      elevation={0}
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon style={{ width: 35, height: 35, color: "#707070" }} />
        </IconButton>

        {!open && (
          <div className={classes.brandDiv}>
            <img
              src={Logo}
              alt="Logo"
              style={{ width: 40, height: 40, marginRight: 5 }}
            />
            <span className={classes.brandStylesI} align="left">
              Smart Alert
            </span>
          </div>
        )}

        {
          open && <IconButton
          color="inherit"
          onClick={handleDrawerClose}
          edge="start"
          // className={classes.menuButtonII}
        >
          <MenuIcon style={{ width: 35, height: 35, color: "#707070" }} />
        </IconButton>
        }

        <div className={classes.spacing} />
        {!isMobile ? (
          <DesktopView classes={classes} />
        ) : (
          <MobileView classes={classes} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

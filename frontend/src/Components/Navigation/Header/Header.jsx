import clsx from "clsx";
//Material ui core
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
//Material ui icons
import { Menu as MenuIcon } from "@material-ui/icons";
//Shared components
import DesktopView from "./DesktopView"; 
import MobileView from "./MobileView/MobileView"

const Header = (props) => {
  const { classes, open, handleDrawerOpen, isMobile } = props;




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
          <MenuIcon color="primary" />
        </IconButton>

        {!open && (
          <Typography
            variant="h4"
            noWrap
            color="primary"
            className={clsx(classes.brandStylesI, isMobile && classes.dNone)}
          >
            Smart Alert
          </Typography>
        )}
        <div className={classes.spacing} />
        {!isMobile ? <DesktopView classes={classes} /> : <MobileView classes={classes}/>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

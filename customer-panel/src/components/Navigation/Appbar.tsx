import React from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { Menu } from "@material-ui/icons";

import clsx from "clsx";
import DesktopView from "./DesktopView";
import MobileView from "./MobileMenu"
interface AppbarProps {
  handleToggle: () => void;
  classes: ClassNameMap<
    "appBar" | "appBarShift" | "menuButton" | "link" | "linkActive" | "spacing"
  >;
  open: boolean;
  isMobile: boolean;
}

const Appbar: React.FC<AppbarProps> = ({
  handleToggle,
  classes,
  open,
  isMobile,
}) => {
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
          onClick={handleToggle}
          edge="start"
          className={clsx(classes.menuButton)}
        >
          <Menu />
        </IconButton>
        {
          isMobile ? <MobileView classes={classes}/> : <DesktopView classes={classes} />
        }
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;

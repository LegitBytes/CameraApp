import React from "react";
//Material ui core
import {
  Drawer,
  Typography,
  IconButton,
} from "@material-ui/core";
//Material ui icons
import { MenuOpen } from "@material-ui/icons";
//React-router-dom
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import TreeView from "../TreeView/TreeView"

const DrawerComp = (props) => {
  const {
    history,
    location,
    classes,
    open,
    handleDrawerClose,
    isMobile,
  } = props;

  return (
    <div>
      <Drawer
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        variant="permanent"
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        elevation={0}
      >
        <div className={classes.drawerHeader}>
          {open && (
            <Typography
              variant="h4"
              noWrap
              color="primary"
              className={classes.brandStylesII}
              align="left"
            >
              Smart Alert
            </Typography>
          )}
          <IconButton onClick={handleDrawerClose}>
            <MenuOpen color="primary" />
          </IconButton>
        </div>
            <TreeView />
      </Drawer>
    </div>
  );
};

export default withRouter(DrawerComp);

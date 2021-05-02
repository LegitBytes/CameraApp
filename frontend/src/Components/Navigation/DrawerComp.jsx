import React from "react";
//Material ui core
import { Drawer, Typography, IconButton, TextField } from "@material-ui/core";
//Material ui icons
import { Menu } from "@material-ui/icons";
//React-router-dom
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import TreeView from "../TreeView/TreeView";
import Logo from "../../Assets/Logo.png";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"

const getMuiTheme = () => createMuiTheme({
  overrides: {
    MuiInputBase:{
      root:{
        background: "#fff"
      }
    }
  }
})

const DrawerComp = (props) => {
  const {
    history,
    location,
    classes,
    open,
    handleDrawerClose,
    isMobile,
  } = props;

  const theme = getMuiTheme()



  return (
    <ThemeProvider theme={theme}>
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
          <div className={classes.alignItemsCenter}>
            <img
              src={Logo}
              alt="Logo"
              style={{ width: 40, height: 40, marginRight: -17 }}
            />
            {open && (
              <span
                variant="h4"
                noWrap
                color="primary"
                className={classes.brandStylesII}
                align="left"
              >
                Smart Alert
              </span>
            )}
          </div>
        </div>
          <TextField variant="outlined" placeholder="Filter for Customer / Site / Camera" size="small" className={classes.filterStyles}/>
        <TreeView />
      </Drawer>
    </ThemeProvider>
  );
};

export default withRouter(DrawerComp);

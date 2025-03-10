import React, { useState, useEffect } from "react";
//Material ui core
import { CssBaseline, useMediaQuery } from "@material-ui/core";
//Components
import Header from "./Header/Header";
import DrawerComp from "./DrawerComp";
//utils
import { useNavigationStyles } from "../../Util/CSS/NavigationStyles";
import { useTheme } from "@material-ui/core/styles";
 
const Navigation = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false); 
  const classes = useNavigationStyles(open);
  useEffect(() => {
    let openVal = isMobile ? false : true;
    setOpen(openVal);
  }, [isMobile]);

  const handleDrawerChange = () => {
    setOpen(!open);
  };

  

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Header
        classes={classes}
        open={open}
        handleDrawerChange={handleDrawerChange}
        isMobile={isMobile}
      />
      <DrawerComp
        classes={classes}
        open={open}
        isMobile={isMobile}
      />

      {/* <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.routeMargin} >
          <Routes />
        </div>
      </main> */}
    </div>
  );
};

export default Navigation;

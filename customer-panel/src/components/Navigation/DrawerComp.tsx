import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import React from "react";
import CompanyLogo from "../../assets/CompanyLogo.svg";
import { Drawer, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import MainDrawer from "./MainDrawer";
interface DrawerCompProps {
  classes: ClassNameMap<
    "drawerPaper" | "drawer" | "drawerHeader" | "titleStyles" | "tvRoot"
  >;
  open: boolean;
}

const DrawerComp: React.FC<DrawerCompProps> = ({ open, classes }) => {
  const location = useLocation();
  const pathname: string = location.pathname;
  const currentPath: string = pathname.split("/")[1];

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <img src={CompanyLogo} alt="Company Logo" />
        <Typography variant="h6" className={classes.titleStyles}>
          {process.env.REACT_APP_NAME}
        </Typography>
      </div>
      {currentPath === "main" ? (
        <MainDrawer classes={classes} />
      ) : (
        <div> Coming soon... </div>
      )}
    </Drawer>
  );
};

export default DrawerComp;

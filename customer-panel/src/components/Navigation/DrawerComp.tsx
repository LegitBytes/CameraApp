import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import React, { useState } from "react";
import CompanyLogo from "../../assets/CompanyLogo.svg";
import { Drawer, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import MainDrawer from "./MainDrawer";
import { TransitionLeft, TransitionProps } from "../../shared/Slides";
import { Alert } from "../../shared/Interfaces";
import AlertComp from "../../shared/Alert";
import AlertDrawer from "./AlertDrawer";
interface DrawerCompProps {
  classes: ClassNameMap<
    | "drawerPaper"
    | "drawer"
    | "drawerHeader"
    | "titleStyles"
    | "tvRoot"
    | "listStyles"
    | "ml5"
    | "mr5"
  >;
  open: boolean;
}

const DrawerComp: React.FC<DrawerCompProps> = ({ open, classes }) => {
  const [alertDetails, setAlertDetails] = useState<Alert>({
    open: false,
    horizontal: "center",
    vertical: "bottom",
    message: "",
  });

  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const handleOpen = (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => {
    setTransition(() => TransitionLeft);
    setAlertDetails({
      open: true,
      horizontal,
      vertical,
      message,
    });
  };

  const handleClose = () => {
    setAlertDetails({ ...alertDetails, open: false });
  };

  const location = useLocation();
  const pathname: string = location.pathname;
  const currentPath: string = pathname.split("/")[1];

  return (
    <>
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
          <MainDrawer classes={classes} handleOpen={handleOpen} />
        ) : (
          <AlertDrawer handleOpen={handleOpen} classes={classes} />
        )}
      </Drawer>
      <AlertComp
        open={alertDetails.open}
        vertical={alertDetails.vertical}
        horizontal={alertDetails.horizontal}
        transition={transition}
        message={alertDetails.message}
        handleClose={handleClose}
      />
    </>
  );
};

export default DrawerComp;

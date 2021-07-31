import React, { useContext } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { useNavigationStyles } from "./Styles";
import {
  AppBar,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

import CompanyLogo from "../../Assets/CompanyLogo.svg";
import DesktopView from "./DesktopView";
import { Routes } from "../../Utilities/Routes/Routes";

import { useTheme } from "@material-ui/core/styles";
import MobileMenu from "./MobileMenu";
import { AuthRoutes } from "../../Utilities/Routes/AuthRoutes";
import { AuthContext } from "../../Context/Auth";

const Navigation: React.FC<RouteComponentProps> = ({ history }) => {
  const classes: ClassNameMap<
    "root" | "spacing" | "brand" | "link" | "linkActive" | "containerStyles"
  > = useNavigationStyles();

  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const { userId } = useContext(AuthContext);
  return (
    // <>
    //   <AppBar elevation={0} position="fixed" className={classes.root}>
    //     <Toolbar>
    //       <div className={classes.brand} onClick={() => history.push("/")}>
    //         <img src={CompanyLogo} alt="Company Logo" />
    //         <Typography variant="h6">Camera-app</Typography>
    //       </div>
    //       {isMobile ? (
    //         <MobileMenu classes={classes} />
    //       ) : (
    //         <DesktopView classes={classes} />
    //       )}
    //     </Toolbar>
    //   </AppBar>
    //   <div className={classes.containerStyles}>
    //     <Routes />
    //   </div>{" "}
    // </>

    <>
      {!userId ? (
        <AuthRoutes />
      ) : (
        <>
          {" "}
          <AppBar elevation={0} position="fixed" className={classes.root}>
            <Toolbar>
              <div className={classes.brand} onClick={() => history.push("/")}>
                <img src={CompanyLogo} alt="Company Logo" />
                <Typography variant="h6">Camera-app</Typography>
              </div>
              {isMobile ? (
                <MobileMenu classes={classes} />
              ) : (
                <DesktopView classes={classes} />
              )}
            </Toolbar>
          </AppBar>
          <div className={classes.containerStyles}>
            <Routes />
          </div>{" "} 
        </> 
      )}
    </>
  );
};

export default withRouter(Navigation);

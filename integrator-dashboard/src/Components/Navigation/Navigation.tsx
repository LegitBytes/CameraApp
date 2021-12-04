import React, { useContext, useState } from "react";
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
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "../../Shared/Fallback";

const Navigation: React.FC<RouteComponentProps> = ({ history }) => {
  const classes: ClassNameMap<
    "root" | "spacing" | "brand" | "link" | "linkActive" | "containerStyles"
  > = useNavigationStyles();

  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const { userId, userToken } = useContext(AuthContext);

  //Error boundary config
  const [errorMessage, setErrorMessage] = useState<string>("");
  const onError = (error: Error, errorInfo: { componentStack: string }) => {
    console.log("Logging -> ", error, errorInfo);
    setErrorMessage(error.message);
  };
  return (
    <>
      {!userId || !userToken ? (
        <AuthRoutes />
      ) : (
        <>
          {" "}
          <ErrorBoundary
            fallback={<Fallback errorMessage={errorMessage} />}
            onError={onError}
          >
            <AppBar elevation={0} position="fixed" className={classes.root}>
              <Toolbar>
                <div
                  className={classes.brand}
                  onClick={() => history.push("/")}
                >
                  <img src={CompanyLogo} alt="Company Logo" />
                  <Typography variant="h6">Smart Alert</Typography>
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
          </ErrorBoundary>
        </>
      )}
    </>
  );
};

export default withRouter(Navigation);

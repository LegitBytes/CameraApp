import React, { useEffect, useContext, useState } from "react";
import { Theme, CssBaseline, useTheme, useMediaQuery } from "@material-ui/core";
import DrawerComp from "./DrawerComp";
import Appbar from "./Appbar";
import clsx from "clsx";
import { useStyles } from "./Styles";
import Routes from "../../util/routes/routes";
import { AuthRoutes } from "../../util/routes/AuthRoutes";
import { AuthContext } from "../../context/Auth";
import { ErrorBoundary } from "react-error-boundary"
import Fallback from "../../shared/Fallback";
const Navigation: React.FC = () => {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down(1100));
  const [open, setOpen] = React.useState(isMobile ? false : true);
  const { userToken, userId } = useContext(AuthContext);
  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  //Error boundary config
  const [errorMessage, setErrorMessage] = useState<string>("");
  const onError = (error: Error, errorInfo: { componentStack: string }) => {
    console.log("Logging -> ", error, errorInfo);
    setErrorMessage(error.message);
  };

  return (
    <>
      {!userToken || !userId ? (
        <AuthRoutes />
      ) : (
        <ErrorBoundary
          fallback={<Fallback errorMessage={errorMessage} />}
          onError={onError}
        >
          <div className={classes.root}>
            <CssBaseline />
            <Appbar
              handleToggle={handleToggle}
              classes={classes}
              isMobile={isMobile}
              open={open}
            />
            <DrawerComp open={open} classes={classes} />
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              <Routes />
            </main>
          </div>
        </ErrorBoundary>
      )}
    </>
  );
};

export default Navigation;

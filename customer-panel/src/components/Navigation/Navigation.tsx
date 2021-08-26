import React, { useEffect, useContext } from "react";
import { Theme, CssBaseline, useTheme, useMediaQuery } from "@material-ui/core";
import DrawerComp from "./DrawerComp";
import Appbar from "./Appbar";
import clsx from "clsx";
import { useStyles } from "./Styles";
import Routes from "../../util/routes/routes";
import { AuthRoutes } from "../../util/routes/AuthRoutes";
import { AuthContext } from "../../context/Auth";
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
  return (
    <>
      {!userToken || !userId ? (
        <AuthRoutes />
      ) : (
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
      )}
    </>
  );
};

export default Navigation;

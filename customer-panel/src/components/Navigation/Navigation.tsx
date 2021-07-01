import React, { useEffect } from "react";
import { Theme, CssBaseline, useTheme, useMediaQuery } from "@material-ui/core";
import DrawerComp from "./DrawerComp";
import Appbar from "./Appbar";
import clsx from "clsx";
import { useStyles } from "./Styles";
import Routes from "../../util/routes/routes";

const Navigation: React.FC = () => {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down(600));
  const [open, setOpen] = React.useState(isMobile ? false : true);

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
  );
};

export default Navigation;

import React, { useContext } from "react";
import {
  Typography,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { AccountCircle, Brightness4, Brightness7 } from "@material-ui/icons";
import { ThemeContext } from "../../../Context/Theme";

//Component

const DesktopView = ({ classes }) => {

  const { dark, toggle } = useContext(ThemeContext);

  
  return (
    <>
      <Typography className={classes.ml20} variant="subtitle1" color="primary">
        Admin
      </Typography>
      <Tooltip title={dark ? "Toggle light mode" : "Toggle dark mode"} arrow>
        <IconButton
          onClick={toggle}
          className={classes.ml20}
          disableRipple
          disableTouchRipple
        >
          {!dark ? (
            <Brightness4 className={classes.accountIconStyles} />
          ) : (
            <Brightness7 className={classes.accountIconStyles} />
          )}
        </IconButton>
      </Tooltip>
      <IconButton className={classes.ml20} disableRipple disableTouchRipple>
        <AccountCircle className={classes.accountIconStyles} />
      </IconButton>
    </>
  );
};

export default DesktopView;

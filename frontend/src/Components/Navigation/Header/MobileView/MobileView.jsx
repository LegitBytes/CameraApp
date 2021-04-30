import React from "react";
import { IconButton } from "@material-ui/core"
import { MoreVert } from "@material-ui/icons";
import MobileMenu from "./MobileMenu";

const MobileView = ({ classes }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.ml20}>
      <IconButton onClick={handleClick} >
        <MoreVert />
      </IconButton>
      <MobileMenu anchorEl={anchorEl} handleClose={handleClose}  />
    </div>
  );
};

export default MobileView;

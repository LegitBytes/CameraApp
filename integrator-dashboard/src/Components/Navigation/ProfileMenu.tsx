import React, { useContext, useState } from "react";
import ProfileLogo from "../../Assets/ProfileLogo.svg";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { AuthContext } from "../../Context/Auth";
import { RouteContext } from "../../Context/RouteContext";
import { useHistory } from "react-router-dom";
const ProfileMenu: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const { resetRoute } = useContext(RouteContext);
  const { replace } = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    handleClose();
    Auth.signOut().then((_) => {
      logout();
      resetRoute();
      replace("/");
    });
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <img src={ProfileLogo} alt="Profile Logo" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;

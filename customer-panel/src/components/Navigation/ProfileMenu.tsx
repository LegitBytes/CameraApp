import React, { useState, useContext } from "react";
import ProfileLogo from "../../assets/ProfileLogo.svg";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AuthContext } from "../../context/Auth";
import { Auth } from "aws-amplify";
import { RouteContext } from "../../context/RouteContext";
import { useHistory } from "react-router-dom"
const ProfileMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { replace } = useHistory()
  const { logout } = useContext(AuthContext);
  const { resetRoute } = useContext(RouteContext);
  const handleClick = (event: any) => {
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
      replace("/")
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

import React, { useContext, useState } from "react";
import { Typography } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { paths } from "../../util/paths";
import { NavLink } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import Notification from "../../assets/Notification.svg";
import { RouteContext } from "../../context/RouteContext";

interface MobileMenuProps {
  classes: ClassNameMap<"spacing" | "link" | "linkActive">;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ classes }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setRoute } = useContext(RouteContext)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onPathClick = (path:string) => {
    handleClose()
    setRoute(path)
  }
  
  return (
    <>
      <div className={classes.spacing} />
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)} 
        onClose={handleClose}
      >
        {paths.map((path) => (
          <MenuItem
            onClick={() => onPathClick(path.path)}
            key={path.text}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NavLink
              to={path.path}
              className={classes.link}
              activeClassName={classes.linkActive}
              key={path.text}
            >
              <Typography variant="body1">{path.text}</Typography>
            </NavLink>
          </MenuItem>
        ))}
        <MenuItem
          onClick={handleClose}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton>
            <img src={Notification} alt="notifications" />
          </IconButton>
          <ProfileMenu />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MobileMenu;

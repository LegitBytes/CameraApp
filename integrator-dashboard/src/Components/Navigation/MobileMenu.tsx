import React, { useState, useContext } from "react";
import { Typography } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { paths } from "../../Utilities/Paths";
import { NavLink } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { AuthContext } from "../../Context/Auth";
import { RouteContext } from "../../Context/RouteContext";

interface MobileMenuProps {
  classes: ClassNameMap<"root" | "spacing" | "brand" | "link" | "linkActive">;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ classes }) => {
  const { setRoute } = useContext(RouteContext);

  const { isSuperAdmin } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pathClick = (path: string) => {
    handleClose();
    setRoute(path);
  };

  let filteredPaths = paths;
  if (!isSuperAdmin) {
    filteredPaths = paths.filter((item) => item.text !== "Integrator");
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
        {filteredPaths.map((path) => (
          <MenuItem onClick={() => pathClick(path.path)} key={path.text}>
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
          <ProfileMenu />
        </MenuItem>
      </Menu>
    </>
  );
};

export default MobileMenu;

import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { SupervisedUserCircle, AccountCircle, Brightness4, Brightness7 } from "@material-ui/icons";
import { ThemeContext } from "../../../../Context/Theme"


const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.common.white,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.black,
      },
    },
  },
}))(MenuItem);

const MobileMenu = ({ anchorEl, handleClose }) => {
  const { dark, toggle } = useContext(ThemeContext)
  return (
    <div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SupervisedUserCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </StyledMenuItem>
        <StyledMenuItem onClick={toggle}>
          <ListItemIcon>
          {!dark ? (
            <Brightness4  />
          ) : (
            <Brightness7  />
          )}
          </ListItemIcon>
          <ListItemText primary={ dark ? "Toggle light mode" : "Toggle dark mode" } />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default MobileMenu;

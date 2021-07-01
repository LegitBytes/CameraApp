import React from "react";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { NavLink } from "react-router-dom";
import { paths } from "../../util/paths";
import { IconButton, Typography } from "@material-ui/core";
import Notification from "../../assets/Notification.svg";
import ProfileMenu from "./ProfileMenu";
interface DesktopViewProps {
  classes: ClassNameMap<"link" | "linkActive" | "spacing">;
}

const DesktopView: React.FC<DesktopViewProps> = ({ classes }) => {
  return (
    <>
      {paths.map((path) => (
        <NavLink
          to={path.path}
          className={classes.link}
          activeClassName={classes.linkActive}
          key={path.text}
        >
          <Typography variant="body1">{path.text}</Typography>
        </NavLink>
      ))}
      <div className={classes.spacing} />;
      <IconButton>
        <img src={Notification} alt="notifications" />
      </IconButton>
      <ProfileMenu />
    </>
  );
};

export default DesktopView;

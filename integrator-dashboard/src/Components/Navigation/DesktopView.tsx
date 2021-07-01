import React from "react";
import { Typography } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { paths } from "../../Utilities/Paths";
import { NavLink } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";


interface DesktopViewProps {
  classes: ClassNameMap<"root" | "spacing" | "brand" | "link" | "linkActive">;
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
      <div className={classes.spacing}></div>
      <ProfileMenu />
    </>
  );
};

export default DesktopView;

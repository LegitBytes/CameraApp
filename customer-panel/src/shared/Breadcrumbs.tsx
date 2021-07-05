import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@material-ui/core";
interface BreadcrumbsProps {
  customer: string;
  site: string;
  camera: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ts1: {
      color: "#0079FE",
    },
    ts2: {
      color: "#676767",
    },
  })
);

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customer, site, camera }) => {

    const classes = useStyles()
  return (
    <MuiBreadcrumbs>
      <Typography variant="body1" className={classes.ts1}>
        {customer}
      </Typography>
      <Typography variant="body1" className={classes.ts1}>
        {site}
      </Typography>
      <Typography variant="body1" className={classes.ts2}>
        {camera}
      </Typography>
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;

import React from "react";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useStyles } from "./Styles";
interface params {
  camera: string;
  customer: string;
  site: string;
}
const MainDetails: React.FC = () => {
  const classes = useStyles();
  const params: params = useParams();
  console.log(params);
  const { camera, customer, site } = params;
  const camera_name = camera.split("-")[0];
  const smtp_user_name = camera.split("-")[1];
  console.log("smtp_user_name -> ", smtp_user_name);

  return (
    <>
      <Breadcrumbs>
        <Typography variant="body1" className={classes.ts1}>
          {customer}
        </Typography>
        <Typography variant="body1" className={classes.ts1}>
          {site}
        </Typography>
        <Typography variant="body1" className={classes.ts2}>
          {camera_name}
        </Typography>
      </Breadcrumbs>
    </>
  );
};

export default MainDetails;

import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Typography, Grid } from "@material-ui/core";
interface MainProps extends RouteComponentProps {}

const Main: React.FC<MainProps> = () => {
  return (
    <Grid
      container
      direction="row"
      style={{ position: "absolute", top: "50%", left: "0" }}
      justify="center"
      alignItems="center"
    >
      <Typography style={{ color: "rgba(0,0,0,0.3)" }} variant="h5">
        Work in progress, please select a camera to proceed!
      </Typography>
    </Grid>
  );
};

export default Main;

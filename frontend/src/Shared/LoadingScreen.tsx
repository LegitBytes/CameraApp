import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((_: Theme) => ({
  progressStyles: {
    position: "absolute",
    top: "50%"
  }
}));

const LoadingScreen: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="center" >
      <CircularProgress color="primary" className={classes.progressStyles}/>
    </Grid>
  );
};

export default LoadingScreen;
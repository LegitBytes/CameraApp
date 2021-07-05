import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
const useStyles = makeStyles((_: Theme) => ({
  progressStyles: {
    position: "absolute",
    top: "50%",
  },
  white: {
    color: "#fff",
  },
}));
interface LoadingScreenProps {
  white?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ white }) => {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="center">
      <CircularProgress
        color="primary"
        className={clsx(classes.progressStyles, white && classes.white)}
      />
    </Grid>
  );
};

export default LoadingScreen;

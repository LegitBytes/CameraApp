import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Button from "./Buttons";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
    },
  })
);

interface FallbackProps {
  errorMessage: string;
}

const Fallback: React.FC<FallbackProps> = ({ errorMessage }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3">Something went wrong!</Typography>
      <Typography variant="h4">{errorMessage}</Typography>
      <Button
        type="primary"
        variant="contained"
        onClick={() => window.location.reload()}
      >
        Reload
      </Button>
    </div>
  );
};

export default Fallback;

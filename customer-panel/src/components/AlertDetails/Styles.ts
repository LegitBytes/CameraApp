import { makeStyles, createStyles, Theme } from "@material-ui/core";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ts1: {
      color: "#0079FE",
    },
    ts2: {
      color: "#676767",
    },
    carouselStyles: {
      width: "80%",
      height: "40%"
    },
    mt20: {
      marginTop: 20
    }
  })
);

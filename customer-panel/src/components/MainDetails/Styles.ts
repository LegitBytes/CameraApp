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
      height: "40%",
    },
    mt20: {
      marginTop: 20,
    },
    mb50: {
      marginBottom: 50,
    },
    bottomDivStyles: {
      display: "flex",
      background: "rgba(0,0,0,0.8)",
      padding: 10,
      justifyContent: "space-between",
    },
    timeSelectorDiv: {
      marginTop: 30,
      width: "80%",
      padding: 10,
      display: "flex",
      justifyContent: "space-between",
    },
    utilStyles: {
      display: "flex",
      justifyContent: "center",
      width: "80%",
      marginTop: 20,
    },
  })
);

interface StyleProps {
  left: string;
  alert: boolean | undefined;
}

export const useTimeLineStyles = makeStyles((theme: Theme) =>
  createStyles({
    timelineStyles: {
      position: "relative",
      marginTop: 20,
      width: "80%",
      height: 7,
      background: "#6C757D",
      borderRadius: 5,
    },
  })
);

export const useDotStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    dotStyles: {
      position: "absolute",
      left: ({ left }) => left,
      top: "-50%",
      background: ({ alert }) => (alert ? "#FFC107" : "#007BFF"),
      height: 14,
      width: 14,
      borderRadius: "50%",
      marginBottom: 10,
      cursor: "pointer",
    },
  })
);

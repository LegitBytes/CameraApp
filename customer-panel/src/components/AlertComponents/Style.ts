import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ts1: {
      color: "#676767",
    },
    ts2: {
      color: "#4D4C4C",
    },
    response: {
      background: "#0079FE",
      padding: 10,
      marginTop: 10,
      marginRight: -theme.spacing(2),
      marginLeft: -theme.spacing(2),
      display: "flex",
      alignItems: "center",
      color: "#fff",
    },
    tsBold: {
      fontWeight: "bold",
      color: "#4D4C4C",
    },
    carouselStyles: {
      width: "100%",
      height: "60%",
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
      padding: 5,
      justifyContent: "space-between",
    },
  })
);

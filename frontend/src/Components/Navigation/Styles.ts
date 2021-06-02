import { makeStyles, Theme } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

export const useNavigationStyles = (): ClassNameMap<
  "root" | "spacing" | "brand" | "link" | "linkActive" | "containerStyles"
> => {
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      background: "#fff",
      margin: 0,
      padding: 0,
      color: "#000",
      display: "flex",
    },
    brand: {
      background: "#28344B",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 322,
      height: 71,
      marginLeft: -24,
      marginRight: theme.spacing(4),
      [theme.breakpoints.down("sm")]: {
        width: 200,
        height: 60,
      },
      cursor: "pointer",
    },
    spacing: {
      flexGrow: 1,
      //   marginRight: theme.spacing(2)
    },
    link: {
      color: "#6C757D",
      marginRight: theme.spacing(2),
      textDecoration: "none",
      "&:hover": {
        color: "#0079FE",
      },
    },
    linkActive: {
      color: "#0079FE",
    },
    containerStyles: {
      height: "100%",
      width: "100%",
      minHeight: "100%",
      // padding: 20
      paddingBottom: 20,
    },
  }));
  const classes = useStyles();
  return classes;
};

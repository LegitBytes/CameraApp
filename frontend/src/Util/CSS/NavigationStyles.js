import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import { ThemeContext } from "../../Context/Theme";
export const useNavigationStyles = (open) => {
  const { dark } = useContext(ThemeContext);

  const drawerWidth = 230;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      background: dark ? "#FFFFFF" : "#FFFFFF",
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },

    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      background: dark ? "#334259" : "#334259",
      border: "#707070",
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: 0,
      },
      background: dark ? "#334259" : "#334259",
      border: "#707070",
    },

    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: "space-between",
      background: dark ? "#334259" : "#334259",
      border: "#707070",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: "#EDEDED" ,
      minHeight: "768px",
      height: "100%",
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    brandStylesI: {
      fontWeight: "bold",
      fontSize: 23
    },
    brandStylesII: {
      fontWeight: "bold",
      marginLeft: "20px",
      color: "#fff",
      fontSize: 23
    },
    active: {
      color: "#09C491",
    },
    inactive: {
      color: theme.palette.primary.main,
    },
    spacing: {
      flexGrow: 1,
    },
    mr20: {
      marginRight: "20px",
    },
    ml20: {
      marginLeft: "20px",
    },
    accountIconStyles: {
      color: "#09C491",
      width: "35px",
      height: "35px",
    },
    dNone: {
      display: "none",
    },
    routeMargin: {
      marginLeft: 10,
      marginTop: 60,
    },
  }));

  const classes = useStyles();

  return classes;
};

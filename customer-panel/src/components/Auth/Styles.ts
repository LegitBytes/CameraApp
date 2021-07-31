import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      display: "flex",
      width: "100vw",
      height: "100vh",
      flexGrow: 1,
      flexDirection: "column",
      background:
        "linear-gradient(to bottom, rgb(250, 250, 250) 0%, rgb(253, 212, 57) 1%, rgb(210, 132, 76) 41%, rgb(160, 85, 83) 61%, rgb(105, 49, 84) 81%, rgb(70, 32, 83) 100%)",
      justifyContent: "center",
      alignItems: "center",
    },
    logoStyles: {
      width: 200,
      height: 150,
      marginBottom: -20,
    },
    textFieldStyles: {
      [theme.breakpoints.down(650)]: {
        width: "90%",
      },
      width: "30%",
      marginTop: 20,
      background: "#fff",
      borderRadius: 5,
    },
    btnStyles: {
      [theme.breakpoints.down(650)]: {
        width: "90%",
      },
      width: "30%",
      marginTop: 20,
      background: "#3C56A6",
      color: "#fff",
    },
    adornmentStyle: {
      cursor: "pointer",
    },
    iconStyle: {
      color: "#676767",
    },
  })
);

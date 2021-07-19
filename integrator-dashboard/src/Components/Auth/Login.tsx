import React from "react";
import { useStyles } from "./Styles";
import AuthLogo from "../../Assets/AuthLogo.svg";
import { Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <img src={AuthLogo} alt="AuthLogo" className={classes.logoStyles} />
      <Paper
        square
        className={classes.linkStyles}
        onClick={() => history.push("/login/super-admin")}
      >
        <Typography variant="button">Login as Super Admin</Typography>
      </Paper>
      <Paper
        square
        className={classes.linkStyles}
        onClick={() => history.push("/login/integrator")}
      >
        <Typography variant="button">Login as Integrator</Typography>
      </Paper>
    </div>
  );
};

export default Login;

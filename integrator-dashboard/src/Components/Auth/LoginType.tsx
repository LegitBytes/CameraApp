import React, { useState, useContext } from "react";
import { useStyles } from "./Styles";
import AuthLogo from "../../Assets/AuthLogo.svg";
import {
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { Person, Lock, LockOpen } from "@material-ui/icons";
import { AuthContext } from "../../Context/Auth";

interface type {
  type: "super-admin" | "integrator";
}

interface formState {
  email: string;
  password: string;
}
interface Errors {
  email: boolean;
  password: boolean;
}

const Login: React.FC = () => {
  const { login, toggleIsSuperAdmin } = useContext(AuthContext);
  const history = useHistory();
  const params: type = useParams();
  const { type } = params;
  const classes = useStyles();
  const [pwdType, setPwdType] = useState<"password" | "text">("password");

  const [formState, setFormState] = useState<formState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({
    email: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    validateFormFields(name, value);
  };

  const validateFormFields = (name: string, value: string) => {
    let errs = errors;
    switch (name) {
      case "email":
        const re =
        //eslint-disable-next-line
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(value)) {
          errs.email = true;
        } else {
          errs.email = false;
        }
        break;
      case "password":
        if (value.length < 8) {
          errs.password = true;
        } else {
          errs.password = false;
        }
        break;
      default: 
        break;
    }

    setErrors(errs);
  };

  const signIn = (e) => {
    e.preventDefault();
    if (type === "super-admin") {
      login("abc");
      toggleIsSuperAdmin(true);
    } else {
      login("abc");
    }
    history.replace("/")
  };

  return (
    <div className={classes.root}>
      <img src={AuthLogo} alt="AuthLogo" className={classes.logoStyles} />
      <Typography
        variant="button"
        style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}
      >
        {/* Your Smart Alert */}
        Login as {type}
      </Typography>
      <TextField
        name="email"
        type="email"
        variant="outlined"
        size="small"
        error={errors.email}
        placeholder="Email"
        onChange={handleChange}
        value={formState.email}
        className={classes.textFieldStyles}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" className={classes.adornmentStyle}>
              <Person className={classes.iconStyle} />
            </InputAdornment>
          ),
        }}
      />
      {errors.email && (
        <Typography variant="overline" style={{ color: "#fff" }}>
          Invalid Email
        </Typography>
      )}
      <TextField
        name="password"
        type={pwdType}
        variant="outlined"
        size="small"
        placeholder="Password"
        error={errors.password}
        onChange={handleChange}
        value={formState.password}
        className={classes.textFieldStyles}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" className={classes.adornmentStyle}>
              {pwdType === "password" ? (
                <LockOpen
                  className={classes.iconStyle}
                  onClick={() => setPwdType("text")}
                />
              ) : (
                <Lock
                  className={classes.iconStyle}
                  onClick={() => setPwdType("password")}
                />
              )}
            </InputAdornment>
          ),
        }}
      />
      {errors.password && (
        <Typography variant="overline" style={{ color: "#fff" }}>
          Password should be at least 8 characters long
        </Typography>
      )}
      <Button
        disableElevation
        className={classes.btnStyles}
        variant="contained"
        disabled={errors.email || errors.password}
        onClick={signIn}
      >
        Login
      </Button>

      <Typography
        variant="overline"
        style={{ color: "#fff", marginTop: 20, cursor: "pointer" }}
        onClick={() => history.push("/forgot-password/" + type)}
      >
        Forgot Password
      </Typography>
    </div>
  );
};

export default Login;

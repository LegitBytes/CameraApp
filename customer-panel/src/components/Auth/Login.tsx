import React, { useState, useContext, useEffect } from "react";
import { useStyles } from "./Styles";
import AuthLogo from "../../assets/AuthLogo.svg";
import {
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Person, Lock, LockOpen } from "@material-ui/icons";
import { AuthContext } from "../../context/Auth";
import { Auth } from "aws-amplify";
import LoadingScreen from "../../shared/LoadingScreen";

interface formState {
  email: string;
  password: string;
}
interface Errors {
  email: boolean;
  password: boolean;
}

interface LoginProps {
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
}

const Login: React.FC<LoginProps> = ({ handleOpen }) => {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();
  const [pwdType, setPwdType] = useState<"password" | "text">("password");
  const [loading, setLoading] = useState<boolean>(false);
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

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const signIn = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      const user = await Auth.signIn(formState.email, formState.password);
      console.log("user -> ", user);
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        setLoading(false);
        history.replace({
          pathname: "reset-password",
          state: {
            email: formState.email,
            pass: formState.password,
          },
        });
      } else {
        if (
          user.signInUserSession.accessToken.payload["cognito:groups"] &&
          user.signInUserSession.accessToken.payload["cognito:groups"].indexOf(
            "UserGroup"
          ) >= 0
        ) {
          login(
            user.signInUserSession.idToken.jwtToken,
            user.attributes["custom:user_id"]
          );
          setLoading(false);
          history.replace("/");
        } else {
          handleOpen("left", "bottom", "NOT AUTHORIZED");
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      handleOpen("left", "bottom", err.message);
    }
  };

  return (
    <div className={classes.root}>
      {loading ? (
        <LoadingScreen white />
      ) : (
        <>
          <img src={AuthLogo} alt="AuthLogo" className={classes.logoStyles} />
          <Typography
            variant="button"
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,
              marginTop: 10,
            }}
          >
            Smart Alert Center
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
                <InputAdornment
                  position="start"
                  className={classes.adornmentStyle}
                >
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
                <InputAdornment
                  position="start"
                  className={classes.adornmentStyle}
                >
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
            style={{
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              marginTop: 10,
              marginBottom: 10,
            }}
            onClick={() => history.push("/forgot-password")}
          >
            Forgot Password
          </Typography>
        </>
      )}
    </div>
  );
};

export default Login;

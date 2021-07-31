import React, { useState, useContext, useEffect } from "react";
import { useStyles } from "./Styles";
import AuthLogo from "../../Assets/AuthLogo.svg";
import {
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { Lock, LockOpen } from "@material-ui/icons";
import { AuthContext } from "../../Context/Auth";
import { Auth } from "aws-amplify";
import LoadingScreen from "../../Shared/LoadingScreen";

interface formState {
  password: string;
  cnfPassword: string;
}
interface Errors {
  password: boolean;
  cnfPassword: boolean;
}

interface ResetPasswordProps {
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
}

interface location {
  search: {};
  state: { email: string; pass: string };
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ handleOpen }) => {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const { state }: location = useLocation();
  const { email, pass } = state;
  const classes = useStyles();
  const [pwdType, setPwdType] = useState<"password" | "text">("password");
  const [cnfPwdType, setCnfPwdType] = useState<"password" | "text">("password");
  const [loading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<formState>({
    password: "",
    cnfPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({
    password: false,
    cnfPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    validateFormFields(name, value);
  };

  const validateFormFields = (name: string, value: string) => {
    let errs = errors;
    switch (name) {
      case "password":
        if (value.length < 8) {
          errs.password = true;
        } else {
          errs.password = false;
        }
        break;
      case "cnfPassword":
        if (value !== formState["password"]) {
          errs.cnfPassword = true;
        } else {
          errs.cnfPassword = false;
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

    if (!formState.password || !formState.cnfPassword) {
      handleOpen("left", "bottom", "Enter credentials!");
      return;
    } else {
      try {
        const user = await Auth.signIn(email, pass);
        console.log("user -> ", user);
        const finalUser = await Auth.completeNewPassword(
          user,
          formState.password
        );
        console.log("final user -> ", finalUser);
        if (
          user.signInUserSession.accessToken.payload["cognito:groups"] &&
          user.signInUserSession.accessToken.payload["cognito:groups"].indexOf(
            "AdminGroup"
          ) >= 0
        ) {
          login(
            finalUser.signInUserSession.idToken.jwtToken,
            finalUser.challengeParam.userAttributes["custom:user_id"],
            true
          );
        } else {
          login(
            finalUser.signInUserSession.idToken.jwtToken,
            finalUser.challengeParam.userAttributes["custom:integrator_id"],
            false
          );
        }

        setLoading(false);
        history.replace("/");
      } catch (err) {
        console.log(err);
        setLoading(false);
        handleOpen("left", "bottom", err.message);
      }
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
            name="password"
            type={pwdType}
            variant="outlined"
            size="small"
            placeholder="New Password"
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

          <TextField
            name="cnfPassword"
            type={cnfPwdType}
            variant="outlined"
            size="small"
            placeholder="Confirm Password"
            error={errors.cnfPassword}
            onChange={handleChange}
            value={formState.cnfPassword}
            className={classes.textFieldStyles}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  className={classes.adornmentStyle}
                >
                  {cnfPwdType === "password" ? (
                    <LockOpen
                      className={classes.iconStyle}
                      onClick={() => setCnfPwdType("text")}
                    />
                  ) : (
                    <Lock
                      className={classes.iconStyle}
                      onClick={() => setCnfPwdType("password")}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />
          {errors.cnfPassword && (
            <Typography variant="overline" style={{ color: "#fff" }}>
              Password and Confirm Passwords should be the same
            </Typography>
          )}

          <Button
            disableElevation
            className={classes.btnStyles}
            variant="contained"
            disabled={errors.password || errors.cnfPassword}
            onClick={signIn}
          >
            Reset Password
          </Button>
        </>
      )}
    </div>
  );
};

export default ResetPassword;

import {
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LoadingScreen from "../../shared/LoadingScreen";
import { useStyles } from "./Styles";
import AuthLogo from "../../assets/AuthLogo.svg";
import { Lock, LockOpen, Person, Code } from "@material-ui/icons";

interface ForgotPasswordProps {
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
}

interface formState {
  code: string;
  password: string;
  cnfPassword: string;
}
interface Errors {
  password: boolean;
  cnfPassword: boolean;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ handleOpen }) => {
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUserNameError] = useState(false);
  const [formState, setFormState] = useState<formState>({
    code: "",
    password: "",
    cnfPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({
    password: false,
    cnfPassword: false,
  });

  const [showSubmitDiv, setShowSubmitDiv] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [pwdType, setPwdType] = useState<"password" | "text">("password");
  const [cnfPwdType, setCnfPwdType] = useState<"password" | "text">("password");

  const userNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    validateUserName(e.target.value);
  };

  const validateUserName = (value: string) => {
    const re =
      //eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(value)) {
      setUserNameError(true);
    } else {
      setUserNameError(false);
    }
  };

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

  const sendCodeToEmail = async () => {
    setLoading(true);
    try {
      const res = await Auth.forgotPassword(username);

      if (res) {
        setLoading(false);
        setShowSubmitDiv(true);
      }
    } catch (err) {
      setLoading(false);
      handleOpen("left", "bottom", err.message);
    }
  };

  const changePassword = async () => {
    setLoading(true);
    try {
      await Auth.forgotPasswordSubmit(
        username,
        formState.code,
        formState.password
      );
      setLoading(false);
      handleOpen("left", "bottom", "Password changed successfully!");
      history.replace("/login");
    } catch (err) {
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
          {!showSubmitDiv ? (
            <>
              <TextField
                type="email"
                variant="outlined"
                size="small"
                error={usernameError}
                placeholder="Enter your registered email..."
                onChange={userNameChange}
                value={username}
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
              {usernameError && (
                <Typography variant="overline" style={{ color: "#fff" }}>
                  Invalid Email
                </Typography>
              )}
              <Button
                disableElevation
                className={classes.btnStyles}
                variant="contained"
                disabled={usernameError}
                onClick={sendCodeToEmail}
              >
                Send Verification Code
              </Button>
            </>
          ) : (
            <>
              <Typography
                variant="button"
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                The code is sent to your registered email address.
              </Typography>

              <TextField
                name="code"
                type="text"
                variant="outlined"
                size="small"
                placeholder="Code"
                onChange={handleChange}
                value={formState.code}
                className={classes.textFieldStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      className={classes.adornmentStyle}
                    >
                      <Code className={classes.iconStyle} />
                    </InputAdornment>
                  ),
                }}
              />

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
                onClick={changePassword}
              >
                Submit
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ForgotPassword;

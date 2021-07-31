import { Grid, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../shared/Buttons";
import LoadingScreen from "../../shared/LoadingScreen";
import { modalAction } from "../interfaces";

interface ModalChildProps {
  title: modalAction;
  handleGet: () => Promise<void>;
  updateId: string;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
  handleModalClose: () => void;
  value: string;
}

const ModalChild: React.FC<ModalChildProps> = ({
  title,
  handleGet,
  updateId,
  handleOpen,
  handleModalClose,
  value,
}) => {
  const [formState, setFormState] = useState<{ change_name: string }>({
    change_name: "",
  });
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    switch (title) {
      case "EDIT CUSTOMER":
        setUrl(
          `${process.env.REACT_APP_API_URL}customers/aliase-customer/${updateId}`
        );
        break;
      case "EDIT SITE":
        setUrl(`${process.env.REACT_APP_API_URL}sites/aliase-site/${updateId}`);
        break;
      case "EDIT CAMERA":
        setUrl(
          `${process.env.REACT_APP_API_URL}cameras/aliase-camera/${updateId}`
        );
        break;
      default:
        break;
    }
  }, [title, updateId, value]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.patch(url, formState);
      setLoading(false);
      handleModalClose();
      handleGet();
    } catch (err) {
      setLoading(false);
      handleModalClose();
      handleOpen(
        "center",
        "bottom",
        "Something went wrong, update incomplete!"
      );
    }
  };

  const onChange = (e: any) => {
    setFormState({ change_name: e.target.value });
    validateFormField("change_name", e.target.value);
  };

  const validateFormField = (name: string, value: string) => {
    //eslint-disable-next-line
    let regexp = /[~`!@#$%^&()_={}[\]:;,.<>+\/?-]/;
    switch (name) {
      case "change_name":
        if (regexp.test(value)) {
          setError(true);
        } else {
          setError(false);
        }
        break;
      default: break;
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ marginTop: 100 }}>
          <LoadingScreen />
        </div>
      ) : (
        <Grid container direction="row" justify="center">
          <Grid item xs={false} sm={2} />
          <Grid item xs={12} sm={8}>
            <TextField
              variant="outlined"
              size="medium"
              label={title}
              onChange={onChange}
              fullWidth
              defaultValue={value}
              error={error} 
            />
            {error && (
              <Typography variant="overline" style={{ color : "red" }}>
                Special characters are not allowed
              </Typography>
            )}
          </Grid>
          <Grid item xs={false} sm={2} />
          <Grid item xs={3} sm={4} />
          <Grid item xs={12} sm={4} style={{ marginTop: 10 }}>
            <Button
              variant="contained"
              size="medium"
              type="primary"
              onClick={handleUpdate}
              fullWidth
              disabled={error || !formState["change_name"]}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={3} sm={4} />
        </Grid>
      )}
    </>
  );
};

export default ModalChild;

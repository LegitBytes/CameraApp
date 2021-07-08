import { Grid, TextField } from "@material-ui/core";
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
  label: "customer_name" | "site_name" | "camera_name";
  value: string;
}

type formState =
  | { customer_name: string }
  | { site_name: string }
  | { camera_name: string }
  | {};

const ModalChild: React.FC<ModalChildProps> = ({
  title,
  handleGet,
  updateId,
  handleOpen,
  handleModalClose,
  label,
  value,
}) => {
  const [formState, setFormState] = useState<formState>({});
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    switch (title) {
      case "EDIT CUSTOMER":
        setFormState({ customer_name: value });
        setUrl(`${process.env.REACT_APP_API_URL}customers/${updateId}`);
        break;
      case "EDIT SITE":
        setFormState({ site_name: value });
        setUrl(`${process.env.REACT_APP_API_URL}sites/${updateId}`);
        break;
      case "EDIT CAMERA":
        setFormState({ camera_name: value });
        setUrl(`${process.env.REACT_APP_API_URL}cameras/${updateId}`);
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
              onChange={(e) => setFormState({ [label]: e.target.value })}
              fullWidth
              defaultValue={value}
            />
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

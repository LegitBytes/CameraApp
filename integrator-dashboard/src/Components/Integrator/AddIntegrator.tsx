import React, { useCallback, useState } from "react";
import { Typography, TextField, Grid } from "@material-ui/core";
// import { setter } from "../../Utilities/Helpers/setter";
import ButtonComp from "../../Shared/Buttons";
import { Integrator } from "../Interfaces";
import axios, { AxiosResponse } from "axios";

interface FormState {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
}
interface FormError {
  name: boolean;
  email: boolean;
}

interface AddIntegratorProps {
  action: "ADD" | "EDIT";
  url: string;
  item: Integrator | null;
  handleModalClose: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getIntegratorData: () => void;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
  updateId: string;
}

const AddIntegrator: React.FC<AddIntegratorProps> = ({
  action,
  url,
  item,
  handleModalClose,
  setLoading,
  getIntegratorData,
  handleOpen,
  updateId,
}) => {
  const initialState =
    action === "ADD"
      ? {
          name: "",
          email: "",
          phone: "",
        }
      : {
          name: item?.name,
          email: item?.email,
          phone: item?.phone,
        };

  const [formState, setFormState] = useState<FormState>(initialState);

  const [formError, setFormError] = useState<FormError>({
    name: false,
    email: false,
  });

  const onChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    validateFormField(name, value);
  };

  const validateFormField = (name, value) => {
    //eslint-disable-next-line
    let regexp1 = /[~`!@#$%^&()_={}[\]:;,.<>+\/?-]/;
    let regexp2 =
      //eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors = { name: false, email: false };
    switch (name) {
      case "name":
        if (regexp1.test(value)) {
          errors.name = true;
        } else {
          errors.name = false;
        }
        break;
      case "email":
        if (!regexp2.test(value)) {
          errors.email = true;
        } else {
          errors.email = false;
        }
        break;
      default:
        break;
    }
    setFormError(errors);
  };

  const handleSave = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      handleModalClose();
      setLoading(true);
      if (action === "ADD") {
        try {
          const response: AxiosResponse<any> = await axios.post(
            url + "/add-integrator",
            formState
          );
          if (response.status === 201) {
            getIntegratorData();
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
          handleOpen("left", "bottom", "Something went wrong!");
        }
      } else {
        try {
          const response: AxiosResponse<any> = await axios.patch(
            url + "/" + updateId,
            formState
          );
          if (response.status === 200) {
            getIntegratorData();
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
          handleOpen("left", "bottom", "Something went wrong!");
        }
      }
    },
    [
      formState,
      getIntegratorData,
      updateId,
      url,
      action,
      handleModalClose,
      setLoading,
      handleOpen,
    ]
  );

  return (
    <form onSubmit={handleSave}>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6">
            <label htmlFor="name">Name: <span style={{ color: "red" }}>*</span></label>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="name"
            id="name"
            type="text"
            onChange={onChange}
            // size="small"
            variant="outlined"
            fullWidth={true}
            value={formState.name}
            error={formError.name}
          />
          {formError.name && (
            <Typography variant="overline" style={{ color: "red" }}>
              Special characters are not allowed
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            <label htmlFor="email">Email: <span style={{ color: "red" }}>*</span></label>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            id="email"
            type="text"
            onChange={onChange}
            // size="small"
            variant="outlined"
            fullWidth={true}
            value={formState.email}
            error={formError.email}
          />
          {formError.email && (
            <Typography variant="overline" style={{ color: "red" }}>
              Invalid email
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            <label htmlFor="phone">Phone: </label>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="phone"
            id="phone"
            type="text"
            onChange={onChange}
            // size="small"
            variant="outlined"
            fullWidth={true}
            value={formState.phone}
          />
        </Grid>
        <Grid item xs={false} sm={4} />
        <Grid item xs={12} sm={4} style={{ marginTop: 20 }}>
          <ButtonComp
            // onClick={handleSave}
            htmlType="submit"
            type="primary"
            variant="contained"
            fullWidth={true}
            disabled={formError.name || formError.email || !formState.name || !formState.email}
          >
            Save
          </ButtonComp>
        </Grid>
        <Grid item xs={false} sm={4} />
      </Grid>
    </form>
  );
};

export default AddIntegrator;

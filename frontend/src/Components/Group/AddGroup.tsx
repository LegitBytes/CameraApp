import React, { useCallback, useState } from "react";
import { Typography, TextField, Grid } from "@material-ui/core";
// import { setter } from "../../Utilities/Helpers/setter";
import ButtonComp from "../../Shared/Buttons";
import { Group } from "../Interfaces";
import axios, { AxiosResponse } from "axios";

interface FormState {
  group_name: string | undefined;
  integrator_id: string | undefined;
}

interface AddGroupProps {
  action: "ADD" | "EDIT";
  url: string;
  item: Group | null;
  handleModalClose: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getGroupData: () => void;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
  updateId: string;
}

const AddGroup: React.FC<AddGroupProps> = ({
  action,
  url,
  item,
  handleModalClose,
  setLoading,
  getGroupData,
  handleOpen,
  updateId,
}) => {
  const initialState =
    action === "ADD"
      ? {
          group_name: "",
          integrator_id: "084c16fc-2b4d-4d2b-a335-7f7bc618d345",
        }
      : {
          group_name: item?.group_name,
          integrator_id: "084c16fc-2b4d-4d2b-a335-7f7bc618d345",
        };

  const [formState, setFormState] = useState<FormState>(initialState);

  const onChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSave = useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    handleModalClose();
    setLoading(true);
    if (action === "ADD") {
      try {
        const response: AxiosResponse<any> = await axios.post(
          url + "/add-group",
          formState
        );
        if (response.status === 201) {
          getGroupData();
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
          getGroupData();
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        handleOpen("left", "bottom", "Something went wrong!");
      }
    }
  }, [
    formState,
    getGroupData,
    updateId,
    url,
    action,
    handleModalClose,
    setLoading,
    handleOpen,
  ]);

  return (
    <form onSubmit={handleSave}>
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6">
            <label htmlFor="name">Name: </label>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="group_name"
            id="name"
            type="text"
            onChange={onChange}
            // size="small"
            variant="outlined"
            fullWidth={true}
            value={formState.group_name}
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
          >
            Save
          </ButtonComp>
        </Grid>
        <Grid item xs={false} sm={4} />
      </Grid>
    </form>
  );
};

export default AddGroup;

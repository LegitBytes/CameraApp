import React from "react";
import { Typography, TextField, Grid } from "@material-ui/core";
import { FormState } from "./AllGroups";
// import { setter } from "../../Utilities/Helpers/setter";
import ButtonComp from "../../Shared/Buttons";

interface AddGroupProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  handleSave: () => void;
}

const AddGroup: React.FC<AddGroupProps> = ({
  formState,
  setFormState,
  handleSave,
}) => {
  const onChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
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
          onClick={handleSave}
          type="primary"
          variant="contained"
          fullWidth={true}
        >
          Save
        </ButtonComp>
      </Grid>
      <Grid item xs={false} sm={4} />
    </Grid>
  );
};

export default AddGroup;

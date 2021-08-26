import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,

} from "@material-ui/core";
import ButtonComp from "../../Shared/Buttons";
import { Group, Camera } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import LoadingScreen from "../../Shared/LoadingScreen";
import { FormEvent } from "react";
import { AuthContext } from "../../Context/Auth";

export interface FormState {
  camera_name: string | undefined;
  group_id: string | undefined;
  integrator_id: string | undefined;
}

interface FormError {
  camera_name: boolean;
}

interface AddCameraProps {
  action: "ADD" | "EDIT";
  url: string;
  item: Camera | null;
  handleModalClose: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getCameraData: () => void;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
  updateId: string;
}

const AddCamera: React.FC<AddCameraProps> = ({
  action,
  url,
  item,
  handleModalClose,
  setLoading,
  getCameraData,
  handleOpen,
  updateId,
}) => {
  const { isSuperAdmin, userId } = useContext(AuthContext);

  const initialState =
    action === "ADD"
      ? {
          camera_name: "",
          group_id: "",
          integrator_id: !isSuperAdmin ? userId : "",
        }
      : {
          camera_name: item?.camera_name,
          group_id: item?.groups.group_id,
          integrator_id: !isSuperAdmin
            ? userId
            : item?.integrators.integrator_id,
        };

  const [formState, setFormState] = useState<FormState>(initialState);

  const [formError, setFormError] = useState<FormError>({
    camera_name: false,
  });
  const onChange = (e) => {
    let { name, value } = e.target;
    if (isSuperAdmin && name === "group_id") {
      let group = groupData.find((gr) => gr.group_id === value);
      setFormState({
        ...formState,
        [name]: value,
        integrator_id: group?.integrators.integrator_id,
      });
    } else {
      setFormState({ ...formState, [name]: value });
    }
    validateFormField(name, value);
  };

  const validateFormField = (name, value) => {
    //eslint-disable-next-line
    let regexp1 = /[~`!@#$%^&()_={}[\]:;,.<>+\/?-]/;
    let errors = { camera_name: false };
    switch (name) {
      case "camera_name":
        if (regexp1.test(value)) {
          errors.camera_name = true;
        } else {
          errors.camera_name = false;
        }
        break;
      default:
        break;
    }
    setFormError(errors);
  };

  const [loading1, setLoading1] = useState<boolean>(true);

  const [groupData, setGroupData] = useState<Group[]>([]);
/*
  const onCopy = (value): void => {
    navigator.clipboard.writeText(value);
    handleOpen("right", "bottom", "Copied!");
  };
*/
  const getGroupData = useCallback(async (): Promise<void> => {
    setLoading1(true);
    try {
      const response: AxiosResponse<{ groups: Group[] }> = await axios.get(
        process.env.REACT_APP_API_URL + "groups"
      );
      let groups: Group[] = []
      if(!isSuperAdmin){
        groups = response.data.groups.filter(group => group.integrators.integrator_id === userId)
      }else{
        groups = response.data.groups
      }
      setGroupData(groups);
      setLoading1(false);
    } catch (err) {
      setLoading1(false);
    }
  }, [isSuperAdmin, userId]);

  useEffect(() => {
    getGroupData();

    return () => {
      setGroupData([]);
    };
  }, [getGroupData]);

  const handleSave = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleModalClose();
      setLoading(true);

      if (action === "ADD") {
        try {
          const response: AxiosResponse<any> = await axios.post(
            url + "/add-camera",
            formState
          );
          if (response.status === 201) {
            getCameraData();
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
            getCameraData();
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
      getCameraData,
      updateId,
      url,
      action,
      handleModalClose,
      setLoading,
      handleOpen,
    ]
  );

  if (loading1) {
    return (
      <div style={{ marginTop: 100 }}>
        <LoadingScreen />
      </div>
    );
  } else
    return (
      <form onSubmit={handleSave}>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">
              <label htmlFor="camera_name">
                Name: <span style={{ color: "red" }}>*</span>
              </label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="camera_name"
              id="camera_name"
              type="text"
              onChange={onChange}
              variant="outlined"
              fullWidth={true}
              value={formState.camera_name}
              error={formError.camera_name}
            />
            {formError.camera_name && (
              <Typography variant="overline" style={{ color: "red" }}>
                Special characters are not allowed
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <label htmlFor="group_id">
                Group: <span style={{ color: "red" }}>*</span>
              </label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Select
              variant="outlined"
              fullWidth={true}
              name="group_id"
              onChange={onChange}
              value={formState.group_id}
              id="group_id"
            >
              {groupData.map((item) => (
                <MenuItem key={item.group_id} value={item.group_id}>
                  {item.group_name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={false} sm={4} />
          <Grid item xs={12} sm={4} style={{ marginTop: 20 }}>
            <ButtonComp
              // onClick={handleSave}
              type="primary"
              variant="contained"
              fullWidth={true}
              htmlType="submit"
              disabled={
                formError.camera_name ||
                !formState.camera_name ||
                !formState.group_id
              }
            >
              Save
            </ButtonComp>
          </Grid>
          <Grid item xs={false} sm={4} />
        </Grid>
      </form>
    );
};

export default AddCamera;

import React, { useState, useCallback, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import ButtonComp from "../../Shared/Buttons";
import { Group, Camera } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import LoadingScreen from "../../Shared/LoadingScreen";
import { FormEvent } from "react";
import { FileCopy } from "@material-ui/icons";

export interface FormState {
  camera_name: string | undefined;
  smtp_user_name: string | undefined;
  smtp_password: string | undefined;
  group_id: string | undefined;
  integrator_id: string | undefined;
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
  const initialState =
    action === "ADD"
      ? {
          camera_name: "",
          smtp_user_name: "",
          smtp_password: "",
          group_id: "",
          integrator_id: "084c16fc-2b4d-4d2b-a335-7f7bc618d345",
        }
      : {
          camera_name: item?.camera_name,
          smtp_user_name: item?.smtp_user_name,
          smtp_password: item?.smtp_password,
          group_id: item?.groups.group_id,
          integrator_id: "084c16fc-2b4d-4d2b-a335-7f7bc618d345",
        };

  const [formState, setFormState] = useState<FormState>(initialState);

  const onChange = (e) => {
    let { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const [loading1, setLoading1] = useState<boolean>(true);

  const [groupData, setGroupData] = useState<Group[]>([]);

  const onCopy = (value): void => {
    navigator.clipboard.writeText(value);
    handleOpen("right", "bottom", "Copied!");
  };

  const getGroupData = useCallback(async (): Promise<void> => {
    setLoading1(true);
    try {
      const response: AxiosResponse<{ groups: Group[] }> = await axios.get(
        process.env.REACT_APP_API_URL + "groups"
      );
      // const activeArr = response.data.groups.filter(
      //   (item) => item.is_disabled === false
      // );
      // setGroupData(activeArr);
      setGroupData(response.data.groups);
      setLoading1(false);
    } catch (err) {
      setLoading1(false);
    }
  }, []);

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
              <label htmlFor="camera_name">Name:</label>
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
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <label htmlFor="smtp_user_name">SMTP Username:</label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="smtp_user_name"
              id="smtp_user_name"
              type="text"
              onChange={onChange}
              variant="outlined"
              fullWidth={true}
              value={formState.smtp_user_name}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        onCopy(formState.smtp_user_name);
                      }}
                      disabled={!formState.smtp_user_name}
                      size="small"
                    >
                      <FileCopy />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <label htmlFor="smtp_password">SMTP Password:</label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="smtp_password"
              id="smtp_password"
              type="text"
              onChange={onChange}
              variant="outlined"
              fullWidth={true}
              value={formState.smtp_password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        onCopy(formState.smtp_password);
                      }}
                      disabled={!formState.smtp_password}
                      size="small"
                    >
                      <FileCopy />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <label htmlFor="group_id">Group:</label>
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

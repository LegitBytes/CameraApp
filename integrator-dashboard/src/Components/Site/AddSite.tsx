import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
} from "@material-ui/core";
import ButtonComp from "../../Shared/Buttons";
import { Group, Site, Camera } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import LoadingScreen from "../../Shared/LoadingScreen";
import AutoCompleteComp from "../../Shared/AutoCompleteComp";
import { FormEvent } from "react";
import { AuthContext } from "../../Context/Auth";

export interface FormState {
  site_name: string | undefined;
  group_id: string | undefined;
  integrator_id: string | undefined;
  user_ids: any[] | undefined;
  customer_ids: any[] | undefined;
  camera_ids: any[] | undefined;
}

interface FormError {
  site_name: boolean;
}

interface AddSiteProps {
  action: "ADD" | "EDIT";
  url: string;
  item: Site | null;
  handleModalClose: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getSiteData: () => void;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
  updateId: string;
}

const AddSite: React.FC<AddSiteProps> = ({
  action,
  url,
  item,
  handleModalClose,
  setLoading,
  getSiteData,
  handleOpen,
  updateId,
}) => {
  const { isSuperAdmin, userId } = useContext(AuthContext);

  const initialState =
    action === "ADD"
      ? {
          site_name: "",
          group_id: "",
          integrator_id: !isSuperAdmin ? userId : "",
          user_ids: [],
          customer_ids: [],
          camera_ids: [],
        }
      : {
          site_name: item?.site_name,
          group_id: item?.groups.group_id,
          integrator_id: !isSuperAdmin
            ? userId
            : item?.integrators.integrator_id,
          user_ids: item?.users.map(
            (user: { user_id: string }) => user.user_id
          ),
          customer_ids: item?.customers.map(
            (customer: { customer_id: string }) => customer.customer_id
          ),
          camera_ids: item?.cameras.map(
            (camera: { camera_id: string }) => camera.camera_id
          ),
        };

  const [formState, setFormState] = useState<FormState>(initialState);
  const [formError, setFormError] = useState<FormError>({
    site_name: false,
  });
  const onChange = (e) => {
    let { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    validateFormField(name, value);
  };

  const validateFormField = (name, value) => {
    //eslint-disable-next-line
    let regexp1 = /[~`!@#$%^&()_={}[\]:;,.<>+\/?-]/;
    let errors = { site_name: false };
    switch (name) {
      case "site_name":
        if (regexp1.test(value)) {
          errors.site_name = true;
        } else {
          errors.site_name = false;
        }
        break;
      default:
        break;
    }
    setFormError(errors);
  };

  const [loading1, setLoading1] = useState<boolean>(true);

  const [groupData, setGroupData] = useState<Group[]>([]);

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

  const [loading4, setLoading4] = useState<boolean>(true);

  const [cameraData, setCameraData] = useState<Camera[]>([]);
  const [filteredCameraData, setFilteredCameraData] =
    useState<Camera[]>(cameraData);
  const getCameraData = useCallback(async (): Promise<void> => {
    setLoading4(true);
    try {
      const response: AxiosResponse<{ cameras: Camera[] }> = await axios.get(
        process.env.REACT_APP_API_URL + "cameras"
      );
      setCameraData(response.data.cameras);
      setFilteredCameraData(response.data.cameras);

      setLoading4(false);
    } catch (err) {
      setLoading4(false);
    }
  }, []);

  const getUsedData = (data: any[], dataKey: string, stateKey: string) => {
    const withUndefined = formState[stateKey].map((val) =>
      data.find((item) => item[dataKey] === val)
    );
    return withUndefined.filter((item) => item !== undefined);
  };

  const onGroupChange = (e) => {
    let { name, value } = e.target;
    if (isSuperAdmin) {
      let group = groupData.find((gr) => gr.group_id === value);
      console.log(group);
      setFormState({
        ...formState,
        integrator_id: group?.integrators.integrator_id,
        [name]: value,
      });
    } else {
      setFormState({ ...formState, [name]: value });
    }
    let filteredCameras = cameraData.filter(
      (item: Camera) => item.groups.group_id === value
    );
    if (!!filteredCameras.length) {
      setFilteredCameraData(filteredCameras);
    } else {
      setFilteredCameraData([
        {
          camera_id: "",
          camera_name: "No cameras available", //This is for visula feedback, Since we are mapping camera_name in autoComplete
          ip_address: "",
          smtp_user_name: "",
          smtp_password: "",
          total_request: 0,
          groups: {
            group_id: "",
            group_name: "",
            integrators: { integrator_id: "" },
          },
          user_count: 0,
          is_disabled: false,
          users: [],
          sites: { site_id: "", site_name: "" },
          deleteDisabled: false,
          integrators: { integrator_id: "" },
          change_name: "",
        },
      ]);
    }
  };

  const handleChange = (
    newVal: any[],
    changeKey: string,
    returnKey: string
  ) => {
    let arr = newVal.map((item) => item[returnKey]);
    setFormState({ ...formState, [changeKey]: arr });
  };

  useEffect(() => {
    getGroupData();
    getCameraData();

    return () => {
      setGroupData([]);
      setCameraData([]);
    };
  }, [getGroupData, getCameraData]);

  const handleSave = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleModalClose();
      setLoading(true);

      if (action === "ADD") {
        try {
          const response: AxiosResponse<any> = await axios.post(
            url + "/add-site",
            formState
          );
          if (response.status === 201) {
            getSiteData();
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
            getSiteData();
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
      getSiteData,
      updateId,
      url,
      action,
      handleModalClose,
      setLoading,
      handleOpen,
    ]
  );

  const handleDelete = (option: any) => {
    if (option.hasOwnProperty("camera_id")) {
      let filteredCameras = formState.camera_ids?.filter(
        (camId) => camId !== option["camera_id"]
      );
      setFormState({ ...formState, camera_ids: filteredCameras });
    }
  };

  if (loading1 || loading4) {
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
              <label htmlFor="site_name">
                Name: <span style={{ color: "red" }}>*</span>
              </label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="site_name"
              id="site_name"
              type="text"
              onChange={onChange}
              variant="outlined"
              fullWidth={true}
              value={formState.site_name}
              error={formError.site_name}
            />
            {formError.site_name && (
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
              onChange={onGroupChange}
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

          <Grid item xs={12}>
            <Typography variant="h6">
              <label htmlFor="camera_ids">
                Cameras:
              </label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <AutoCompleteComp
              data={filteredCameraData}
              usedData={getUsedData(
                filteredCameraData,
                "camera_id",
                "camera_ids"
              )}
              changeKey="camera_ids"
              labelKey="camera_name"
              returnKey="camera_id"
              handleChange={handleChange}
              placeholder="ADD NEW CAMERA"
              handleDelete={handleDelete}
            />
          </Grid>

          <Grid item xs={false} sm={4} />
          <Grid item xs={12} sm={4} style={{ marginTop: 20 }}>
            <ButtonComp
              // onClick={handleSave}
              type="primary"
              variant="contained"
              fullWidth={true}
              htmlType="submit"
              disabled={ formError.site_name || !formState.site_name || !formState.group_id}
            >
              Save
            </ButtonComp>
          </Grid>
          <Grid item xs={false} sm={4} />
        </Grid>
      </form>
    );
};

export default AddSite;

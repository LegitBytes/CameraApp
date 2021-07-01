import React, { useState, useCallback, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
} from "@material-ui/core";
import ButtonComp from "../../Shared/Buttons";
import { Customer, Group, Site, Camera, User } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import LoadingScreen from "../../Shared/LoadingScreen";
import AutoCompleteComp from "../../Shared/AutoCompleteComp";
import { FormEvent } from "react";

export interface FormState {
  site_name: string | undefined;
  group_id: string | undefined;
  integrator_id: string | undefined;
  user_ids: any[] | undefined;
  customer_ids: any[] | undefined;
  camera_ids: any[] | undefined;
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
  const initialState =
    action === "ADD"
      ? {
          site_name: "",
          group_id: "",
          integrator_id: "084c16fc-2b4d-4d2b-a335-7f7bc618d345",
          user_ids: [],
          customer_ids: [],
          camera_ids: [],
        }
      : {
          site_name: item?.site_name,
          group_id: item?.groups.group_id,
          integrator_id: "084c16fc-2b4d-4d2b-a335-7f7bc618d345",
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

  const onChange = (e) => {
    let { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const [loading1, setLoading1] = useState<boolean>(true);

  const [groupData, setGroupData] = useState<Group[]>([]);

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

  const [loading2, setLoading2] = useState<boolean>(true);

  const [customerData, setCustomerData] = useState<Customer[]>([]);

  const getCustomerData = useCallback(async (): Promise<void> => {
    setLoading2(true);
    try {
      const response: AxiosResponse<{ customers: Customer[] }> =
        await axios.get(process.env.REACT_APP_API_URL + "customers");
      setCustomerData(response.data.customers);

      setLoading2(false);
    } catch (err) {
      setLoading2(false);
    }
  }, []);

  const [loading3, setLoading3] = useState<boolean>(true);

  const [userData, setUserData] = useState<User[]>([]);

  const getUserData = useCallback(async (): Promise<void> => {
    setLoading3(true);
    try {
      const response: AxiosResponse<{ users: User[] }> = await axios.get(
        process.env.REACT_APP_API_URL + "users"
      );
      setUserData(response.data.users);

      setLoading3(false);
    } catch (err) {
      setLoading3(false);
    }
  }, []);

  const [loading4, setLoading4] = useState<boolean>(true);

  const [cameraData, setCameraData] = useState<Camera[]>([]);

  const getCameraData = useCallback(async (): Promise<void> => {
    setLoading4(true);
    try {
      const response: AxiosResponse<{ cameras: Camera[] }> = await axios.get(
        process.env.REACT_APP_API_URL + "cameras"
      );
      setCameraData(response.data.cameras);

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
    getCustomerData();
    getUserData();
    getCameraData();

    return () => {
      setGroupData([]);
      setCustomerData([]);
      setUserData([]);
      setCameraData([]);
    };
  }, [getGroupData, getCustomerData, getUserData, getCameraData]);

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

  if (loading1 || loading2 || loading3 || loading4) {
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
              <label htmlFor="site_name">Name:</label>
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

          <Grid item xs={12}>
            <Typography variant="h6">
              <label htmlFor="customer_ids">Customers:</label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <AutoCompleteComp
              data={customerData}
              usedData={getUsedData(
                customerData,
                "customer_id",
                "customer_ids"
              )}
              changeKey="customer_ids"
              labelKey="customer_name"
              returnKey="customer_id"
              handleChange={handleChange}
              placeholder="ADD NEW CUSTOMER"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">
              <label htmlFor="user_ids">Users:</label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <AutoCompleteComp
              data={userData}
              usedData={getUsedData(userData, "user_id", "user_ids")}
              changeKey="user_ids"
              labelKey="user_email"
              returnKey="user_id"
              handleChange={handleChange}
              placeholder="ADD NEW USER"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <label htmlFor="camera_ids">Cameras:</label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <AutoCompleteComp
              data={cameraData}
              usedData={getUsedData(cameraData, "camera_id", "camera_ids")}
              changeKey="camera_ids"
              labelKey="camera_name"
              returnKey="camera_id"
              handleChange={handleChange}
              placeholder="ADD NEW CAMERA"
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

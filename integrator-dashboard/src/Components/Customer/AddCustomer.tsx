import React, { useState, useCallback, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
} from "@material-ui/core";
import ButtonComp from "../../Shared/Buttons";
import { Customer, Group, Site, User } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import LoadingScreen from "../../Shared/LoadingScreen";
import AutoCompleteComp from "../../Shared/AutoCompleteComp";
import { FormEvent } from "react";

export interface FormState {
  customer_name: string | undefined;
  group_id: string | undefined;
  integrator_id: string | undefined;
  site_ids: any[] | undefined;
  user_ids: any[] | undefined;
}

interface AddCustomerProps {
  action: "ADD" | "EDIT";
  url: string;
  item: Customer | null;
  handleModalClose: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getCustomerData: () => void;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
  updateId: string;
}

const AddCustomer: React.FC<AddCustomerProps> = ({
  action,
  url,
  item,
  handleModalClose,
  setLoading,
  getCustomerData,
  handleOpen,
  updateId,
}) => {
  const initialState =
    action === "ADD"
      ? {
          customer_name: "",
          group_id: "",
          integrator_id: "084c16fc-2b4d-4d2b-a335-7f7bc618d345",
          site_ids: [],
          user_ids: [],
        }
      : {
          customer_name: item?.customer_name,
          group_id: item?.groups.group_id,
          integrator_id: "084c16fc-2b4d-4d2b-a335-7f7bc618d345",
          site_ids: item?.sites.map(
            (site: { site_id: string }) => site.site_id
          ),
          user_ids: item?.users.map(
            (user: { user_id: string }) => user.user_id
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

  const [userData, setUserData] = useState<User[]>([]);

  const getUserData = useCallback(async (): Promise<void> => {
    setLoading2(true);
    try {
      const response: AxiosResponse<{ users: User[] }> = await axios.get(
        process.env.REACT_APP_API_URL + "users"
      );
      setUserData(response.data.users);

      setLoading2(false);
    } catch (err) {
      setLoading2(false);
    }
  }, []);

  const [loading3, setLoading3] = useState<boolean>(true);

  const [siteData, setSiteData] = useState<Site[]>([]);

  const getSiteData = useCallback(async (): Promise<void> => {
    setLoading3(true);
    try {
      const response: AxiosResponse<{ sites: Site[] }> = await axios.get(
        process.env.REACT_APP_API_URL + "sites"
      );
      setSiteData(response.data.sites);

      setLoading3(false);
    } catch (err) {
      setLoading3(false);
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
    getUserData();
    getSiteData();

    return () => {
      setGroupData([]);
      setUserData([]);
      setSiteData([]);
    };
  }, [getGroupData, getUserData, getSiteData]);

  const handleSave = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleModalClose();
      setLoading(true);

      if (action === "ADD") {
        try {
          const response: AxiosResponse<any> = await axios.post(
            url + "/add-customer",
            formState
          );
          if (response.status === 201) {
            getCustomerData();
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
            getCustomerData();
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
      getCustomerData,
      updateId,
      url,
      action,
      handleModalClose,
      setLoading,
      handleOpen,
    ]
  );

  if (loading1 || loading2 || loading3) {
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
              <label htmlFor="customer_name">Name:</label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="customer_name"
              id="customer_name"
              type="text"
              onChange={onChange}
              variant="outlined"
              fullWidth={true}
              value={formState.customer_name}
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
              <label htmlFor="customer_ids">Users:</label>
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
              <label htmlFor="site_ids">Sites:</label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <AutoCompleteComp
              data={siteData}
              usedData={getUsedData(siteData, "site_id", "site_ids")}
              changeKey="site_ids"
              labelKey="site_name"
              returnKey="site_id"
              handleChange={handleChange}
              placeholder="ADD NEW SITE"
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

export default AddCustomer;

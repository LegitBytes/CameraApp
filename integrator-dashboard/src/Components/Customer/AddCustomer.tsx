import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
} from "@material-ui/core";
import ButtonComp from "../../Shared/Buttons";
import { Customer, Group, Site } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import LoadingScreen from "../../Shared/LoadingScreen";
import AutoCompleteComp from "../../Shared/AutoCompleteComp";
import { FormEvent } from "react";
import { AuthContext } from "../../Context/Auth";

export interface FormState {
  customer_name: string | undefined;
  group_id: string | undefined;
  integrator_id: string | undefined;
  site_ids: any[] | undefined;
  user_ids: any[] | undefined;
}

interface FormError {
  customer_name: boolean;
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
  const { isSuperAdmin, userId } = useContext(AuthContext);
  const initialState =
    action === "ADD"
      ? {
          customer_name: "",
          group_id: "",
          integrator_id: !isSuperAdmin ? userId : "",
          site_ids: [],
          user_ids: [],
        }
      : {
          customer_name: item?.customer_name,
          group_id: item?.groups.group_id,
          integrator_id: !isSuperAdmin
            ? userId
            : item?.integrators.integrator_id,
          site_ids: item?.sites.map(
            (site: { site_id: string }) => site.site_id
          ),
          user_ids: item?.users.map(
            (user: { user_id: string }) => user.user_id
          ),
        };

  const [formState, setFormState] = useState<FormState>(initialState);
  const [formError, setFormError] = useState<FormError>({
    customer_name: false,
  });

  const onChange = (e) => {
    let { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    validateFormField(name, value);
  };
  const validateFormField = (name, value) => {
    //eslint-disable-next-line
    let regexp1 = /[~`!@#$%^&()_={}[\]:;,.<>+\/?-]/;
    let errors = { customer_name: false };
    switch (name) {
      case "customer_name":
        if (regexp1.test(value)) {
          errors.customer_name = true;
        } else {
          errors.customer_name = false;
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
      setGroupData(response.data.groups);
      setLoading1(false);
    } catch (err) {
      setLoading1(false);
    }
  }, []);

  const [loading3, setLoading3] = useState<boolean>(true);

  const [siteData, setSiteData] = useState<Site[]>([]);
  const [filteredSiteData, setFilteredSiteData] = useState<Site[]>([]);

  const getSiteData = useCallback(async (): Promise<void> => {
    setLoading3(true);
    try {
      const response: AxiosResponse<{ sites: Site[] }> = await axios.get(
        process.env.REACT_APP_API_URL + "sites"
      );
      setSiteData(response.data.sites);
      setFilteredSiteData(response.data.sites);

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

  const onGroupChange = (e) => {
    let { name, value } = e.target;
    if (isSuperAdmin) {
      let group = groupData.find((gr) => gr.group_id === value);
      setFormState({
        ...formState,
        integrator_id: group?.integrators.integrator_id,
        [name]: value,
      });
    } else {
      setFormState({ ...formState, [name]: value });
    }
    let filteredSites = siteData.filter(
      (item: Site) => item.groups.group_id === value
    );
    if (!!filteredSites.length) {
      setFilteredSiteData(filteredSites);
    } else {
      setFilteredSiteData([
        {
          site_id: "",
          site_name: "No sites available", //This is for visual feedback, Since we are mapping site_name in autoComplete
          groups: {
            group_name: "",
            group_id: "",
            integrators: { integrator_id: "" },
          },
          users: [],
          customers: [],
          cameras: [],
          is_disabled: false,
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
    getSiteData();

    return () => {
      setGroupData([]);
      setSiteData([]);
    };
  }, [getGroupData, getSiteData]);

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

  const handleDelete = (option: any) => {
    let filteredSiteIds = formState["site_ids"]?.filter(
      (siteId) => siteId !== option["site_id"]
    );
    setFormState({
      ...formState,
      site_ids: filteredSiteIds,
    });
  };

  if (loading1 || loading3) {
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
              <label htmlFor="customer_name">
                Name: <span style={{ color: "red" }}>*</span>
              </label>
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
              error={formError.customer_name}
            />
            {formError.customer_name && (
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
              <label htmlFor="site_ids">Sites:</label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <AutoCompleteComp
              data={filteredSiteData}
              usedData={getUsedData(filteredSiteData, "site_id", "site_ids")}
              changeKey="site_ids"
              labelKey="site_name"
              returnKey="site_id"
              handleChange={handleChange}
              placeholder="ADD NEW SITE"
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
              disabled={formError.customer_name || !formState.customer_name || !formState.group_id}
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

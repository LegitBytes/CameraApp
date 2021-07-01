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
  user_email: string | undefined;
  group_id: string | undefined;
  integrator_id: string | undefined;
  site_ids: any[] | undefined;
  customer_ids: any[] | undefined;
  camera_ids: any[] | undefined;
}

interface AddUserProps {
  action: "ADD" | "EDIT";
  url: string;
  item: User | null;
  handleModalClose: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getUserData: () => void;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
  updateId: string;
}

const AddUser: React.FC<AddUserProps> = ({
  action,
  url,
  item,
  handleModalClose,
  setLoading,
  getUserData,
  handleOpen,
  updateId,
}) => {
  const initialState =
    action === "ADD"
      ? {
          user_email: "",
          group_id: "",
          integrator_id: "084c16fc-2b4d-4d2b-a335-7f7bc618d345",
          site_ids: [],
          customer_ids: [],
          camera_ids: [],
        }
      : {
          user_email: item?.user_email,
          group_id: item?.groups.group_id,
          integrator_id: "084c16fc-2b4d-4d2b-a335-7f7bc618d345",
          site_ids: item?.sites.map(
            (site: { site_id: string }) => site.site_id
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
  const [filteredCustomerData, setFilteredCustomerData] = useState<Customer[]>(
    []
  );

  const getCustomerData = useCallback(async (): Promise<void> => {
    setLoading2(true);
    try {
      const response: AxiosResponse<{ customers: Customer[] }> =
        await axios.get(process.env.REACT_APP_API_URL + "customers");
      let withDeleteDisabled = response.data.customers.map((item) => ({
        ...item,
        deleteDisabled: false,
      }));
      setCustomerData(withDeleteDisabled);
      setFilteredCustomerData(withDeleteDisabled);
      setLoading2(false);
    } catch (err) {
      setLoading2(false);
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
      let withDeleteDisabled = response.data.sites.map((item) => ({
        ...item,
        deleteDisabled: false,
      }));
      setSiteData(withDeleteDisabled);
      setFilteredSiteData(withDeleteDisabled);

      setLoading3(false);
    } catch (err) {
      setLoading3(false);
    }
  }, []);

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
      let withDeleteDisabled = response.data.cameras.map((item) => ({
        ...item,
        deleteDisabled: false,
      }));
      setCameraData(withDeleteDisabled);
      setFilteredCameraData(withDeleteDisabled);

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
    // let beforeReturn = withUndefined.filter((item) => item !== undefined);

    // let retVal: any[] = [];
    // //

    // if (stateKey === "customer_ids") {
    //   retVal = beforeReturn.map((item) => ({
    //     ...item,
    //     deleteDisabled: false,
    //   }));
    // }else{
    //   retVal = beforeReturn.map((item) => ({
    //     ...item,
    //     deleteDisabled: true,
    //   }));
    // }

    // return retVal;
  };

  const handleChange = (
    newVal: any[],
    changeKey: string,
    returnKey: string
  ) => {
    // console.log("newVal ->", newVal);

    let arr = newVal.map((item) => item[returnKey]);
    // setFormState({ ...formState, [changeKey]: arr });

    switch (changeKey) {
      case "customer_ids":
        let siteIds: string[] = [];
        newVal.forEach((val) => {
          val.sites.forEach((site) => siteIds.push(site.site_id));
        });
        let formSiteIds = formState.site_ids ? formState.site_ids : [];
        siteIds.forEach((item) => {
          let exists = formSiteIds.find((ele) => ele === item);
          if (!exists) {
            formSiteIds.push(item);
          }
        });
        // brr = [...brr, ...temp]
        let disabledSites = filteredSiteData;
        formSiteIds.forEach((siteId) => {
          let index = disabledSites.findIndex(
            (item) => item.site_id === siteId
          );
          if (index >= 0) {
            disabledSites[index].deleteDisabled = true;
          }
        });
        setFilteredSiteData(disabledSites);

        let camIdsFromCust: string[] = [];

        newVal.forEach((val) => {
          val.sites.forEach((site) => {
            site.cameras.forEach((cam) => {
              camIdsFromCust.push(cam.camera_id);
            });
          });
        });

        let formCamIds = formState.camera_ids ? formState.camera_ids : [];
        camIdsFromCust.forEach((item) => {
          let exists = formCamIds.find((ele) => ele === item);
          if (!exists) {
            formCamIds.push(item);
          }
        });

        let disabledCameras = filteredCameraData;

        formCamIds.forEach((camId) => {
          let index = disabledCameras.findIndex(
            (item) => item.camera_id === camId
          );
          if (index >= 0) {
            disabledCameras[index].deleteDisabled = true;
          }
        });
        // setFilteredCameraData(disabledCameras);
        setFormState({ ...formState, [changeKey]: arr, site_ids: formSiteIds });
        break;
      case "site_ids":
        let camIds: string[] = [];
        newVal.forEach((val) => {
          val.cameras.forEach((cam) => camIds.push(cam.camera_id));
        });

        let formCameraIds = formState.camera_ids ? formState.camera_ids : [];
        camIds.forEach((item) => {
          let exists = formCameraIds.find((ele) => ele === item);
          if (!exists) {
            formCameraIds.push(item);
          }
        });
        setFormState({
          ...formState,
          [changeKey]: arr,
          camera_ids: formCameraIds,
        });

        break;
      case "camera_ids":
        setFormState({
          ...formState,
          [changeKey]: arr,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getGroupData();
    getCustomerData();
    getSiteData();
    getCameraData();

    return () => {
      setGroupData([]);
      setCustomerData([]);
      setSiteData([]);
      setCameraData([]);
    };
  }, [getGroupData, getCustomerData, getSiteData, getCameraData]);

  const onGroupChange = (e) => {
    let { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    console.log("group_id in onGroupChange", value);

    let filteredCustomers = customerData.filter(
      (item: Customer) => item.groups.group_id === value
    );

    if (!!filteredCustomers.length) {
      setFilteredCustomerData(filteredCustomers);
    } else {
      setFilteredCustomerData([
        {
          customer_id: "",
          customer_name: "No customers available",
          groups: { group_id: "", group_name: "" },
          is_disabled: false,
          sites: [],
          users: [],
          deleteDisabled: false,
        },
      ]);
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
          site_name: "No sites available",
          groups: { group_name: "", group_id: "" },
          users: [],
          customers: [],
          cameras: [],
          is_disabled: false,
          deleteDisabled: false,
        },
      ]);
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
          camera_name: "No cameras available",
          ip_address: "",
          smtp_user_name: "",
          smtp_password: "",
          total_request: 0,
          groups: { group_id: "", group_name: "" },
          user_count: 0,
          is_disabled: false,
          users: [],
          sites: { site_id: "", site_name: "" },
          deleteDisabled: false,
        },
      ]);
    }
  };

  const handleSave = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleModalClose();
      setLoading(true);

      if (action === "ADD") {
        try {
          const response: AxiosResponse<any> = await axios.post(
            url + "/add-user",
            formState
          );
          if (response.status === 201) {
            getUserData();
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
            getUserData();
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
      getUserData,
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
              <label htmlFor="user_email">Email:</label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="user_email"
              id="user_email"
              type="text"
              onChange={onChange}
              variant="outlined"
              fullWidth={true}
              value={formState.user_email}
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
              <label htmlFor="customer_ids">Customers:</label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <AutoCompleteComp
              data={filteredCustomerData}
              usedData={getUsedData(
                filteredCustomerData,
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
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              <label htmlFor="camera_ids">Cameras:</label>
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

export default AddUser;

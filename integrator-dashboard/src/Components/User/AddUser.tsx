import React, { useState, useCallback, useEffect, useContext } from "react";
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
import { AuthContext } from "../../Context/Auth";

export interface FormState {
  user_email: string | undefined;
  group_id: string | undefined;
  integrator_id: string | undefined;
  site_ids: any[] | undefined;
  customer_ids: any[] | undefined;
  camera_ids: any[] | undefined;
}
interface FormError {
  email: boolean;
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
  const { isSuperAdmin, userId } = useContext(AuthContext);
  const initialState =
    action === "ADD"
      ? {
          user_email: "",
          group_id: "",
          integrator_id: !isSuperAdmin ? userId : "",
          site_ids: [],
          customer_ids: [],
          camera_ids: [],
        }
      : {
          user_email: item?.user_email,
          group_id: item?.groups.group_id,
          integrator_id: !isSuperAdmin
            ? userId
            : item?.integrators.integrator_id,
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
  const [formError, setFormError] = useState<FormError>({
    email: false,
  });

  //This is simple, this is onChange for email

  const onChange = (e) => {
    let { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    validateFormField(name, value);
  };
  const validateFormField = (name, value) => {
    let regexp2 =
      //eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors = { email: false };
    switch (name) {
      case "user_email":
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

  //Fetching all groups. No other transformation

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

  // Fetching all customers, sites and group, and adding a key deleteDisabled in each, so that they can be later used for greying out in AutoComplete
  // FilteredData is initially the duplicate of data fetched, but is changed based on group change

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getGroupData, getCustomerData, getSiteData, getCameraData]);

  //getUsedData return the whole customers, sites and Cameras data which are already present in formState, onMount -> comes into effect for update action, as a result of which the values are not greyed out.

  //Filtering customers, sites and cameras values based on current group.

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

    let filteredCustomers = customerData.filter(
      (item: Customer) => item.groups.group_id === value
    );

    if (!!filteredCustomers.length) {
      setFilteredCustomerData(filteredCustomers);
    } else {
      setFilteredCustomerData([
        {
          customer_id: "",
          customer_name: "No customers available", //This is for visual feedback, Since we are mapping customer_name in autoComplete
          groups: {
            group_id: "",
            group_name: "",
            integrators: { integrator_id: "" },
          },
          is_disabled: false,
          sites: [],
          users: [],
          deleteDisabled: false,
          integrators: { integrator_id: "" },
          change_name: "",
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
          email: "",
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

  const getUsedData = (data: any[], dataKey: string, stateKey: string) => {
    const withUndefined = formState[stateKey].map((val) => {
      let obj = data.find((item) => item[dataKey] === val);

      let allSitesFromCustomer: string[] = [];
      let allCamerasFromCustomer: string[] = [];
      let existingCustomersWithUndefined = formState.customer_ids?.map(
        (custId) =>
          filteredCustomerData.find((cust) => cust.customer_id === custId)
      );
      let existingCustomersWithoutUndefined =
        existingCustomersWithUndefined?.filter((item) => item !== undefined);
      existingCustomersWithoutUndefined?.forEach((cust) => {
        cust?.sites.forEach((site: Site) => {
          allSitesFromCustomer.push(site.site_id);
          site.cameras.forEach((camera: Camera) => {
            allCamerasFromCustomer.push(camera.camera_id);
          });
        });
      });

      if (stateKey === "site_ids") {
        if (allSitesFromCustomer.indexOf(val) >= 0) {
          obj = { ...obj, deleteDisabled: true };
        }
      }

      if (stateKey === "camera_ids") {
        let lonerSites: string[] = [];
        formState["site_ids"]?.forEach((site) => {
          if (allSitesFromCustomer.indexOf(site) < 0) {
            lonerSites.push(site);
          }
        });
        let allCamerasFromLonerSites: string[] = [];

        lonerSites.forEach((site) => {
          let siteDetails = filteredSiteData.find((s) => s.site_id === site);
          if (siteDetails) {
            siteDetails.cameras.forEach((sdCam: Camera) => {
              allCamerasFromLonerSites.push(sdCam.camera_id);
            });
          }
        });

        let readOnlyCameras = [
          ...allCamerasFromCustomer,
          ...allCamerasFromLonerSites,
        ];

        if (readOnlyCameras.indexOf(val) >= 0) {
          obj = { ...obj, deleteDisabled: true };
        }
      }
      return obj;
    });
    return withUndefined.filter((item) => item !== undefined);
  };

  //This is where main logic is residing for making stuffs read only, since nothing is changed onMount for action edit, they will not be greyed out

  const handleChange = (
    newVal: any[],
    changeKey: string,
    returnKey: string
  ) => {
    let arr = newVal.map((item) => item[returnKey]); //All the customers/site/cameras selected after change
    // setFormState({ ...formState, [changeKey]: arr });

    switch (changeKey) {
      case "customer_ids": //key in the formState
        let siteIds: string[] = [];
        let camIdsFromCust: string[] = [];
        newVal.forEach((val) => {
          val.sites.forEach((site) => {
            siteIds.push(site.site_id);
            site.cameras.forEach((camera) =>
              camIdsFromCust.push(camera.camera_id)
            );
          }); //All sites - sitesIDs and cameras-cameraIDs in the selected customers after change
        });
        let formSiteIds = formState.site_ids ? formState.site_ids : []; //All sites - siteIDs in the formState now, can be empty [] as well
        siteIds.forEach((item) => {
          let exists = formSiteIds.find((ele) => ele === item);
          if (!exists) {
            formSiteIds.push(item); //Adding site - siteIDs from selected sites-siteIds to formState siteIDs which are not present
          }
        });
        let disabledSites = filteredSiteData;
        siteIds.forEach((siteId) => {
          let index = disabledSites.findIndex(
            (item) => item.site_id === siteId
          );
          if (index >= 0) {
            disabledSites[index].deleteDisabled = true;
          }
        });
        setFilteredSiteData(disabledSites);

        let formCamIds = formState.camera_ids ? formState.camera_ids : [];
        camIdsFromCust.forEach((item) => {
          let exists = formCamIds.find((ele) => ele === item);
          if (!exists) {
            formCamIds.push(item);
          }
        });

        let disabledCameras = filteredCameraData;

        camIdsFromCust.forEach((camId) => {
          let index = disabledCameras.findIndex(
            (item) => item.camera_id === camId
          );
          if (index >= 0) {
            disabledCameras[index].deleteDisabled = true;
          }
        });
        setFilteredCameraData(disabledCameras);
        setFormState({
          ...formState,
          [changeKey]: arr,
          site_ids: formSiteIds,
          camera_ids: formCamIds,
        });
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

        let disabledCameras2 = filteredCameraData;

        camIds.forEach((camId) => {
          let index = disabledCameras2.findIndex(
            (item) => item.camera_id === camId
          );
          if (index >= 0) {
            disabledCameras2[index].deleteDisabled = true;
          }
        });
        setFilteredCameraData(disabledCameras2);

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

  const handleDelete = (option: any) => {
    if (option.hasOwnProperty("customer_id")) {
      let filteredCustomerIds = formState["customer_ids"]?.filter(
        (custId) => custId !== option["customer_id"]
      );
      let sitesFromCustomer: string[] = [];
      let camerasFromCustomer: string[] = [];
      option.sites.forEach((site: Site) => {
        sitesFromCustomer.push(site.site_id);
        site.cameras.forEach((camera: Camera) => {
          camerasFromCustomer.push(camera.camera_id);
        });
      });
      let siteIdsDelete = formState["site_ids"];
      let cameraIdsDelete = formState["camera_ids"];
      sitesFromCustomer.forEach((sid) => {
        siteIdsDelete = siteIdsDelete?.filter((siteID) => siteID !== sid);
      });
      camerasFromCustomer.forEach((cid) => {
        cameraIdsDelete = cameraIdsDelete?.filter((camID) => camID !== cid);
      });
      setFormState({
        ...formState,
        customer_ids: filteredCustomerIds,
        site_ids: siteIdsDelete,
        camera_ids: cameraIdsDelete,
      });
    }

    if (option.hasOwnProperty("site_id")) {
      let filteredSiteIds = formState["site_ids"]?.filter(
        (siteId) => siteId !== option["site_id"]
      );
      let camerasFromSites = option.cameras.map((cam) => cam.camera_id);
      let cameraIdsDelete = formState["camera_ids"];
      camerasFromSites.forEach((cid) => {
        cameraIdsDelete = cameraIdsDelete?.filter((camID) => camID !== cid);
      });
      setFormState({
        ...formState,
        site_ids: filteredSiteIds,
        camera_ids: cameraIdsDelete,
      });
    }
    if (option.hasOwnProperty("camera_id")) {
      let filteredCameraIds = formState["camera_ids"]?.filter(
        (camId) => camId !== option["camera_id"]
      );
      setFormState({ ...formState, camera_ids: filteredCameraIds });
    }
  };

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
              <label htmlFor="user_email">
                Email: <span style={{ color: "red" }}>*</span>
              </label>
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
              handleDelete={handleDelete}
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
              handleDelete={handleDelete}
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
              disabled={
                formError.email || !formState.user_email || !formState.group_id
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

export default AddUser;

import React, { useEffect, useCallback, useState, useContext } from "react";
import LoadingScreen from "../../shared/LoadingScreen";
import axios, { AxiosResponse } from "axios";
import { customer, site, user, camera, modalAction } from "../interfaces";
import StyledTreeItem from "../../shared/StyledTreeItem";
import { TreeView } from "@material-ui/lab";
import { ChevronLeft, ExpandMore, Edit } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { ChangeEvent } from "react";
import ModalComp from "../../shared/ModalComp";
import ModalChild from "./ModalChild";
import { IconButton, Typography } from "@material-ui/core";
import { AuthContext } from "../../context/Auth";
import { RouteContext } from "../../context/RouteContext";

interface MainDrawerProp {
  classes: ClassNameMap<"tvRoot" | "inputStyles">;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
}

const MainDrawer: React.FC<MainDrawerProp> = ({ classes, handleOpen }) => {
  const history = useHistory();
  const { userId } = useContext(AuthContext);
  const { setRoute } = useContext(RouteContext)
  const [loading, setLoading] = useState<boolean>(false);
  // const temporaryUser = "6029f127-d062-4ad3-9622-f55bf99e7ee8";
  const [customerDetails, setCustomerDetails] = useState<customer[]>([]);
  const [filteredCustomerDetails, setFilteredCustomerDetails] = useState<
    customer[]
  >([]);
  const [lonerSites, setLonerSites] = useState<site[]>([]);
  const [filteredLonerSites, setFilteredLonerSites] = useState<site[]>([]);

  const [lonerCameras, setLonerCameras] = useState<camera[]>([]);
  const [filteredLonerCameras, setFilteredLonerCameras] = useState<camera[]>(
    []
  );
  const getCustomerDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res: AxiosResponse<{ user: user }> = await axios.get(
        process.env.REACT_APP_API_URL + "users/" + userId
      );
      console.log("user res -> ", res.data.user);

      setCustomerDetails(res.data.user.customers);
      setFilteredCustomerDetails(res.data.user.customers);

      //get loner sites and loner cameras ->
      //get all sites and cameras from all customers
      //for sites compare with all sites under user
      //for cameras concat the allCamerasFromSites and cameras from lonerSites, the compare with all cameras under user.
      let allSitesFromCustomer: site[] = [];
      let allCamerasFromCustomer: camera[] = [];
      res.data.user.customers.forEach((cust) => {
        cust.sites.forEach((site) => {
          allSitesFromCustomer.push(site);
          site.cameras.forEach((camera) => {
            allCamerasFromCustomer.push(camera);
          });
        });
      });

      //Loner sites ->
      let lonerSitesArr: site[] = [];
      res.data.user.sites.forEach((site) => {
        let siteExists = allSitesFromCustomer.find(
          (s: site) => s.site_id === site.site_id
        );
        if (!siteExists) {
          lonerSitesArr.push(site);
        }
      });
      console.log("loner sites ->", lonerSitesArr);
      setLonerSites(lonerSitesArr);
      setFilteredLonerSites(lonerSitesArr);

      //loner cameras
      //get all cameras from loner sites
      let allCamerasFromLonerSites: camera[] = [];
      lonerSitesArr.forEach((site) => {
        site.cameras.forEach((camera) => allCamerasFromLonerSites.push(camera));
      });
      //concat all cameras from customers and all cameras from loner sites
      let allParentedCameras: camera[] = allCamerasFromCustomer.concat(
        allCamerasFromLonerSites
      );
      let lonerCamerasArr: camera[] = [];

      res.data.user.cameras.forEach((camera) => {
        let cameraExists = allParentedCameras.find(
          (c) => c.camera_id === camera.camera_id
        );
        if (!cameraExists) {
          lonerCamerasArr.push(camera);
        }
      });
      console.log("loner cameras -> ", lonerCamerasArr);
      setLonerCameras(lonerCamerasArr);
      setFilteredLonerCameras(lonerCamerasArr);

      setLoading(false);
    } catch (err) {
      console.log(err);
      handleOpen(
        "left",
        "bottom",
        "Something went wrong! Cameras could not be fetched!"
      );
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCustomerDetails();
    return () => {
      setCustomerDetails([]);
    };
  }, [getCustomerDetails]);
  const [expanded, setExpanded] = React.useState([]);

  const handleChange = (event: any, nodes: any) => {
    setExpanded(nodes);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value = value.toLowerCase();

    //-----------------------------------Customer level--------------------------------------------//
    let arr: customer[] = [];
    arr = customerDetails.filter((item) => {
      let searchTerm: "change_name" | "customer_name" = item.change_name
        ? "change_name"
        : "customer_name";
      return item[searchTerm]?.toLowerCase().includes(value);
    });
    if (arr.length === 0) {
      arr = customerDetails.filter((customer) => {
        let crr = customer.sites.filter((site) => {
          let searchTerm: "change_name" | "site_name" = site.change_name
            ? "change_name"
            : "site_name";
          return site[searchTerm]?.toLowerCase().includes(value);
        });
        return !!crr.length ? true : false;
      });
    }
    if (arr.length === 0) {
      arr = customerDetails.filter((customer) => {
        let drr = customer.sites.filter((site) => {
          let frr = site.cameras.filter((camera) => {
            let searchTerm: "change_name" | "camera_name" = site.change_name
              ? "change_name"
              : "camera_name";
            return camera[searchTerm]?.toLowerCase().includes(value);
          });
          return !!frr.length ? true : false;
        });
        return !!drr.length ? true : false;
      });
    }

    if (arr.length === 0) {
      //-------------------------------------------------Loner Site Level ---------------------------------------//
      let lonerSiteArr: site[] = [];
      lonerSiteArr = lonerSites.filter((item) => {
        let searchTerm: "change_name" | "site_name" = item.change_name
          ? "change_name"
          : "site_name";
        return item[searchTerm]?.toLowerCase().includes(value);
      });
      if (lonerSiteArr.length === 0) {
        lonerSiteArr = lonerSites.filter((site) => {
          let crr = site.cameras.filter((camera) => {
            let searchTerm: "change_name" | "camera_name" = camera.change_name
              ? "change_name"
              : "camera_name";
            return camera[searchTerm]?.toLowerCase().includes(value);
          });
          return !!crr.length ? true : false;
        });
      }
      if (lonerSiteArr.length === 0) {
        //---------------------------------------Loner camera level ------------------------------------------------//
        let lonerCameraArr: camera[] = [];
        lonerCameraArr = lonerCameras.filter((item) => {
          let searchTerm: "change_name" | "camera_name" = item.change_name
            ? "change_name"
            : "camera_name";
          return item[searchTerm]?.toLowerCase().includes(value);
        });
        if (lonerCameraArr.length === 0) {
          setFilteredCustomerDetails(customerDetails);
          setFilteredLonerSites(lonerSites);
          setFilteredLonerCameras(lonerCameras);
        } else {
          setFilteredLonerCameras(lonerCameraArr);
          setFilteredCustomerDetails([]);
          setFilteredLonerSites([]);
        }
      } else {
        setFilteredLonerSites(lonerSiteArr);
        setFilteredCustomerDetails([]);
        setFilteredLonerCameras([]);
      }
    } else {
      setFilteredCustomerDetails(arr);
      setFilteredLonerSites([]);
      setFilteredLonerCameras([]);
    }

    if (value === "") {
      setFilteredCustomerDetails(customerDetails);
      setFilteredLonerSites(lonerSites);
      setFilteredLonerCameras(lonerCameras);
    }
  };

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<modalAction>("EDIT CUSTOMER");
  const [updateId, setUpdateId] = useState<string>("");
  const [defaultValue, setDefaultValue] = useState<string>("");
  const handleModalOpen = (
    title: modalAction,
    p_updateId: string,
    dValue: string
  ): void => {
    setTitle(title);
    setUpdateId(p_updateId);
    setDefaultValue(dValue);
    setModalOpen(true);
  };
  const handleModalClose = (): void => {
    setModalOpen(false);
    setTitle("");
  };

  const onClick = (
    customer: string,
    site: string,
    camera_name: string,
    smtp: string
  ) => {
    history.push(`/main/${customer}/${site}/${camera_name}-${smtp}`);
    setRoute(`/main/${customer}/${site}/${camera_name}-${smtp}`)
  };

  return (
    <>
      {loading ? (
        <LoadingScreen white />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <input
              className={classes.inputStyles}
              onChange={onChange}
              placeholder="Filter for Customer / Site / Camera"
            />
          </div>

          <TreeView
            className={classes.tvRoot}
            defaultCollapseIcon={<ExpandMore style={{ color: "#fff" }} />}
            defaultExpandIcon={<ChevronLeft style={{ color: "#fff" }} />}
            expanded={expanded}
            onNodeToggle={handleChange}
          >
            {/**************************************  Customer level ************************/}
            {filteredCustomerDetails.map((customer: customer) => (
              <StyledTreeItem
                labelText={
                  customer.change_name
                    ? customer.change_name
                    : customer.customer_name
                }
                nodeId={customer.customer_id}
                key={customer.customer_id}
                labelIcon={
                  <IconButton
                    size="medium"
                    style={{
                      marginRight: 7,
                      color: "#fff",
                      height: 7,
                      width: 7,
                    }}
                    onClick={() =>
                      handleModalOpen(
                        "EDIT CUSTOMER",
                        customer.customer_id,
                        customer.change_name
                          ? customer.change_name
                          : customer.customer_name
                      )
                    }
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                }
              >
                {customer.sites.map((site: site) => (
                  <StyledTreeItem
                    labelText={
                      site.change_name ? site.change_name : site.site_name
                    }
                    nodeId={site.site_id}
                    key={site.site_id}
                    labelIcon={
                      <IconButton
                        size="medium"
                        style={{
                          marginRight: 7,
                          color: "#fff",
                          height: 7,
                          width: 7,
                        }}
                        onClick={() =>
                          handleModalOpen(
                            "EDIT SITE",
                            site.site_id,
                            site.change_name ? site.change_name : site.site_name
                          )
                        }
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    }
                  >
                    {site.cameras.map((camera: camera) => (
                      <StyledTreeItem
                        labelText={
                          camera.change_name
                            ? camera.change_name
                            : camera.camera_name
                        }
                        nodeId={camera.camera_id}
                        key={camera.camera_id}
                        onClick={() =>
                          onClick(
                            customer.change_name
                              ? customer.change_name
                              : customer.customer_name,
                            site.change_name
                              ? site.change_name
                              : site.site_name,
                            camera.change_name
                              ? camera.change_name
                              : camera.camera_name,
                            camera.smtp_user_name
                          )
                        }
                        labelIcon={
                          <IconButton
                            size="medium"
                            style={{
                              marginRight: 7,
                              color: "#fff",
                              height: 7,
                              width: 7,
                            }}
                            onClick={() =>
                              handleModalOpen(
                                "EDIT CAMERA",
                                camera.camera_id,
                                camera.change_name
                                  ? camera.change_name
                                  : camera.camera_name
                              )
                            }
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        }
                      />
                    ))}
                  </StyledTreeItem>
                ))}
              </StyledTreeItem>
            ))}
            {/***************************** Loner Site Level ******************************/}
            {!!filteredLonerSites.length && (
              <Typography
                variant="h6"
                style={{ color: "#fff", marginTop: 10, marginLeft: 5 }}
              >
                {" "}
                Orphan Sites
              </Typography>
            )}

            {filteredLonerSites.map((lonerSite) => (
              <StyledTreeItem
                labelText={
                  lonerSite.change_name
                    ? lonerSite.change_name
                    : lonerSite.site_name
                }
                nodeId={lonerSite.site_id}
                key={lonerSite.site_id}
                labelIcon={
                  <IconButton
                    size="medium"
                    style={{
                      marginRight: 7,
                      color: "#fff",
                      height: 7,
                      width: 7,
                    }}
                    onClick={() =>
                      handleModalOpen(
                        "EDIT SITE",
                        lonerSite.site_id,
                        lonerSite.change_name
                          ? lonerSite.change_name
                          : lonerSite.site_name
                      )
                    }
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                }
              >
                {lonerSite.cameras.map((lonerSiteCamera: camera) => (
                  <StyledTreeItem
                    labelText={
                      lonerSiteCamera.change_name
                        ? lonerSiteCamera.change_name
                        : lonerSiteCamera.camera_name
                    }
                    nodeId={lonerSiteCamera.camera_id}
                    key={lonerSiteCamera.camera_id}
                    onClick={() =>
                      onClick(
                        "NO CUSTOMER",
                        lonerSite.change_name
                          ? lonerSite.change_name
                          : lonerSite.site_name,
                        lonerSiteCamera.change_name
                          ? lonerSiteCamera.change_name
                          : lonerSiteCamera.camera_name,
                        lonerSiteCamera.smtp_user_name
                      )
                    }
                    labelIcon={
                      <IconButton
                        size="medium"
                        style={{
                          marginRight: 7,
                          color: "#fff",
                          height: 7,
                          width: 7,
                        }}
                        onClick={() =>
                          handleModalOpen(
                            "EDIT CAMERA",
                            lonerSiteCamera.camera_id,
                            lonerSiteCamera.change_name
                              ? lonerSiteCamera.change_name
                              : lonerSiteCamera.camera_name
                          )
                        }
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    }
                  />
                ))}
              </StyledTreeItem>
            ))}
            {/******************************** Loner cameras *********************************/}
            {!!filteredLonerCameras.length && (
              <Typography
                variant="h6"
                style={{ color: "#fff", marginTop: 10, marginLeft: 5 }}
              >
                {" "}
                Orphan Cameras
              </Typography>
            )}
            {filteredLonerCameras.map((lonerCamera: camera) => (
              <StyledTreeItem
                labelText={
                  lonerCamera.change_name
                    ? lonerCamera.change_name
                    : lonerCamera.camera_name
                }
                nodeId={lonerCamera.camera_id}
                key={lonerCamera.camera_id}
                onClick={() =>
                  onClick(
                    "NO CUSTOMER",
                    "NO SITE",
                    lonerCamera.change_name
                      ? lonerCamera.change_name
                      : lonerCamera.camera_name,
                    lonerCamera.smtp_user_name
                  )
                }
                labelIcon={
                  <IconButton
                    size="medium"
                    style={{
                      marginRight: 7,
                      color: "#fff",
                      height: 7,
                      width: 7,
                    }}
                    onClick={() =>
                      handleModalOpen(
                        "EDIT CAMERA",
                        lonerCamera.camera_id,
                        lonerCamera.change_name
                          ? lonerCamera.change_name
                          : lonerCamera.camera_name
                      )
                    }
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                }
              />
            ))}
          </TreeView>
        </>
      )}
      <ModalComp
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        modalTop="20%"
        modalWidth="60%"
        title={title}
      >
        <ModalChild
          handleGet={getCustomerDetails}
          handleModalClose={handleModalClose}
          handleOpen={handleOpen}
          title={title}
          updateId={updateId}
          value={defaultValue}
        />
      </ModalComp>
    </>
  );
};

export default MainDrawer;

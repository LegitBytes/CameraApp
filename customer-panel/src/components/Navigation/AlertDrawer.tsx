import React, { useCallback, useEffect, useState, useContext } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  // ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { alertUser, cameraDetails } from "../interfaces";
import axios, { AxiosResponse } from "axios";
import LoadingScreen from "../../shared/LoadingScreen";
// import { FiberManualRecord } from "@material-ui/icons";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { RouteContext } from "../../context/RouteContext";
import { Button } from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";

interface AlertDrawerProps {
  classes: ClassNameMap<
    "ml5" | "mr5" | "listStyles" | "inputStyles" | "listHeaderStyles"
  >;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
}

const AlertDrawer: React.FC<AlertDrawerProps> = ({ handleOpen, classes }) => {
  // const temporaryUser = "6029f127-d062-4ad3-9622-f55bf99e7ee8";
  const { userId } = useContext(AuthContext);
  const { setRoute } = useContext(RouteContext);
  const history = useHistory();
  const [userAlerts, setUserAlerts] = useState<alertUser>({
    camera_details: [],
    cameras: [],
    sites: [],
    user_email: "",
    user_id: "",
  });

  const [cameraDetails, setCameraDetails] = useState<cameraDetails[]>([]);
  const [filteredCameraDetails, setFilteredCameraDetails] = useState<
    cameraDetails[]
  >([]);

  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [groupAnchorEl, setGroupAnchorEl] = useState(null);

  const [loading, setLoading] = useState<boolean>(false);

  const url = process.env.REACT_APP_API_URL + "user-details/" + userId;

  const getCameraAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ user: alertUser }> = await axios.get<{
        user: alertUser;
      }>(
        url
        //   ,{
        //   headers: {
        //     AUTHORIZATION: userToken,
        //   },
        // }
      );

      let reducedAlerts = response.data.user.camera_details.reduce(
        (c, ac) => [...c, ...ac],
        []
      );
      setCameraDetails(reducedAlerts);
      setFilteredCameraDetails(reducedAlerts);

      setUserAlerts(response.data.user);
      setLoading(false);
    } catch (err) {
      console.log("err -> **", err);
      handleOpen("left", "bottom", "Alerts could not be fetched!");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCameraAlerts();
    return () => {
      setUserAlerts({
        camera_details: [],
        cameras: [],
        sites: [],
        user_email: "",
        user_id: "",
      });
    };
  }, [getCameraAlerts]);

  const getCameraAndSite = (email: string) => {
    const camera = userAlerts.cameras.find((camera) => camera.email === email);
    const site = userAlerts.sites.find(
      (site) => site.site_id === camera?.site_id
    );
    return { camera_name: camera?.camera_name, site_name: site?.site_name };
  };

  const onClick = (path: string) => {
    history.push(path);
    setRoute(path);
  };

  const handleSortClick = (event: any) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleGroupClick = (event: any) => {
    setGroupAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleGroupClose = () => {
    setGroupAnchorEl(null);
  };

  const sorter = (term: "asc" | "desc"): void => {
    let alerts = [...cameraDetails];
    if (term === "asc") {
      alerts.sort((al1, al2) => al1.timestamp - al2.timestamp);
    } else {
      alerts.sort((al1, al2) => al2.timestamp - al1.timestamp);
    }
    setFilteredCameraDetails(alerts);
    handleSortClose();
  };
  
  const groupBy = (det: boolean | "reset"): void => {
    if(det === "reset"){
      setFilteredCameraDetails(cameraDetails)
    }else{
      let filteredAlerts = cameraDetails.filter(al => al.alert === det)
      setFilteredCameraDetails(filteredAlerts)
    }
    handleGroupClose()
  }

  return (
    <>
      {loading ? (
        <LoadingScreen white />
      ) : (
        <>
          <div className={classes.listHeaderStyles}>
            <Button
              variant="text"
              style={{ color: "#fff" }}
              onClick={handleSortClick}
            >
              sort by
            </Button>
            <Button variant="text" style={{ color: "#fff" }} onClick={handleGroupClick}>
              group by
            </Button>
          </div>
          <List>
            {filteredCameraDetails.map((alert) => (
              <ListItem
                className={classes.listStyles}
                onClick={() =>
                  onClick("/alerts/" + alert.fromemail + "/" + alert.timestamp)
                }
                style={{ cursor: "pointer" }}
                key={alert.timestamp}
              >
                <ListItemIcon className={classes.ml5}>
                <FiberManualRecord style={{ color: alert.alert ? "#29A329": "#F11D05" }} />
              </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1">
                    {getCameraAndSite(alert.fromemail).camera_name}
                    {getCameraAndSite(alert.fromemail).site_name?.length
                      ? " - " + getCameraAndSite(alert.fromemail).site_name
                      : ""}
                    {" - "} {new Date(alert.timestamp).toLocaleString()}
                  </Typography>
                  {/* <Typography variant="body1">
                  {getCameraAndSite(alert.fromemail).site_name}
                </Typography> */}
                  {/* <Typography variant="body1">Detected</Typography> */}
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <Menu
            anchorEl={sortAnchorEl}
            keepMounted
            open={Boolean(sortAnchorEl)}
            onClose={handleSortClose}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            <MenuItem onClick={() => sorter("desc")}>Latest first</MenuItem>
            <MenuItem onClick={() => sorter("asc")}>Latest last</MenuItem>
          </Menu>

          <Menu
            anchorEl={groupAnchorEl}
            keepMounted
            open={Boolean(groupAnchorEl)}
            onClose={handleGroupClose}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            <MenuItem onClick={() => groupBy(true)}>True Alerts</MenuItem>
            <MenuItem onClick={() => groupBy(false)}>False Alerts</MenuItem>
            <MenuItem onClick={() => groupBy("reset")}>Reset</MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};

export default AlertDrawer;

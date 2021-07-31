import React, { useCallback, useEffect, useState, useContext } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { alertUser } from "../interfaces";
import axios, { AxiosResponse } from "axios";
import LoadingScreen from "../../shared/LoadingScreen";
import { FiberManualRecord } from "@material-ui/icons";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/Auth"
import { RouteContext } from "../../context/RouteContext";

interface AlertDrawerProps {
  classes: ClassNameMap<"ml5" | "mr5" | "listStyles" | "inputStyles">;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
}

const AlertDrawer: React.FC<AlertDrawerProps> = ({ handleOpen, classes }) => {
  // const temporaryUser = "6029f127-d062-4ad3-9622-f55bf99e7ee8";
  const { userId } = useContext(AuthContext)
  const { setRoute } = useContext(RouteContext)
  const history = useHistory();
  const [userAlerts, setUserAlerts] = useState<alertUser>({
    camera_details: [],
    cameras: [],
    sites: [],
    user_email: "",
    user_id: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const url = process.env.REACT_APP_API_URL + "user-details/" +userId;

  const getCameraAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ user: alertUser }> = await axios.get<{
        user: alertUser;
      }>(url);
      setUserAlerts(response.data.user);
      setLoading(false);
    } catch (err) {
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

  const getCameraAndSite = (smtp_user_name: string) => {
    const camera = userAlerts.cameras.find(
      (camera) => camera.smtp_user_name === smtp_user_name
    );
    const site = userAlerts.sites.find(
      (site) => site.site_id === camera?.site_id
    );
    return { camera_name: camera?.camera_name, site_name: site?.site_name };
  };

  const onClick = (path: string) => {
    history.push(path)
    setRoute(path)
  }

  return (
    <>
      {loading ? (
        <LoadingScreen white />
      ) : (
        <List>
          {userAlerts.camera_details.map((alerts) =>
            alerts.map((alert) => (
              <ListItem
                className={classes.listStyles}
                onClick={() => onClick("/alerts/" + alert.fromemail + "/" + alert.timestamp)}
                style={{ cursor: "pointer" }}
                key={alert.timestamp}
              >
                <ListItemIcon className={classes.ml5}>
                  <FiberManualRecord style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body1">
                    {getCameraAndSite(alert.fromemail).camera_name} -{" "}
                    {getCameraAndSite(alert.fromemail).site_name}
                  </Typography>
                  {/* <Typography variant="body1">
                    {getCameraAndSite(alert.fromemail).site_name}
                  </Typography> */}
                  <Typography variant="body1">Detected</Typography>
                </ListItemText>
              </ListItem>
            ))
          )}
        </List>
      )}
    </>
  );
};

export default AlertDrawer;

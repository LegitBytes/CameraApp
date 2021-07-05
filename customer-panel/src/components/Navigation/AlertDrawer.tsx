import React, { useCallback, useEffect, useState } from "react";
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
interface AlertDrawerProps {
  classes: ClassNameMap<"ml5" | "mr5" | "listStyles">;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
}

const AlertDrawer: React.FC<AlertDrawerProps> = ({ handleOpen, classes }) => {
  const temporaryUser = "6029f127-d062-4ad3-9622-f55bf99e7ee8";
  const history = useHistory();
  const [userAlerts, setUserAlerts] = useState<alertUser>({
    camera_details: [],
    cameras: [],
    sites: [],
    user_email: "",
    user_id: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const url = process.env.REACT_APP_API_URL + "user-details/" + temporaryUser;

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
                onClick={() => history.push("/alerts/" + alert.timestamp)}
                style={{ cursor: "pointer" }}
              >
                <ListItemIcon >
                  <FiberManualRecord style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2">
                    {getCameraAndSite(alert.fromemail).camera_name} -{" "}
                    {getCameraAndSite(alert.fromemail).site_name}
                  </Typography>
                  {/* <Typography variant="body1">
                    {getCameraAndSite(alert.fromemail).site_name}
                  </Typography> */}
                  <Typography variant="body2">Detected</Typography>
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

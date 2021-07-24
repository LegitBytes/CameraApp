import React, { useState, useEffect, useCallback, useContext } from "react";
import { alertUser, cameraDetails } from "../interfaces";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import AlertView from "./AlertView";
import { AuthContext } from "../../context/Auth";
interface AlertComponentProps {
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
}

interface params {
  fromemail: string;
  timestamp: string;
}

const AlertComponent: React.FC<AlertComponentProps> = ({ handleOpen }) => {
  const { timestamp, fromemail }: params = useParams();

  // const temporaryUser = "6029f127-d062-4ad3-9622-f55bf99e7ee8";
  const { userId } = useContext(AuthContext)

  const [alert, setAlert] = useState<cameraDetails>({
    HTMLbody: "",
    fromemail: "",
    rekognitionData: [],
    subject: "",
    timestamp: 0,
    toemail: "",
    alert: false,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const url = process.env.REACT_APP_API_URL + "user-details/" + userId;

  const [imageList, setImageList] = useState<string[]>([]);

  const [cameraAndSite, setCameraAndSite] = useState<{
    camera_name: string;
    site_name: string;
  }>({ camera_name: "", site_name: "" });

  const getImageUrls = (data: cameraDetails | undefined) => {
    const imgUrls: string[] = [];
    if (data === undefined) {
      imgUrls.push("not-available/not-available.jpg");
      setImageList(imgUrls);
      handleOpen("right", "bottom", "No images available");
      return;
    } else {
      if (data.rekognitionData && !!data.rekognitionData.length) {
        data.rekognitionData.forEach((item) => {
          let imgUrl = Object.keys(item)[0];
          imgUrls.push(imgUrl);
        });
        if (imgUrls.length === 0) {
          imgUrls.push("not-available/not-available.jpg");
          handleOpen("right", "bottom", "No images available");
        }
      } else {
        imgUrls.push("not-available/not-available.jpg");
        handleOpen("right", "bottom", "No images available");
      }
      setImageList(imgUrls);
    }
  };

  const getAlert = (allAlerts: alertUser) => {
    let alert: cameraDetails | undefined;
    allAlerts.camera_details.forEach((alerts) => {
      let exists = alerts.find(
        (item) =>
          item.timestamp === parseInt(timestamp) && item.fromemail === fromemail
      );
      if (exists) {
        alert = exists;
      } else {
        return;
      }
    });
    return alert;
  };

  const getCameraAndSite = (userAlerts: alertUser, smtp_user_name: string) => {
    const camera = userAlerts.cameras.find(
      (camera) => camera.smtp_user_name === smtp_user_name
    );
    const site = userAlerts.sites.find(
      (site) => site.site_id === camera?.site_id
    );
    if (camera && site) {
      setCameraAndSite({
        camera_name: camera?.camera_name,
        site_name: site?.site_name,
      });
    } else {
      setCameraAndSite({ camera_name: "", site_name: "" });
    }
  };

  const getCameraAlert = useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ user: alertUser }> = await axios.get<{
        user: alertUser;
      }>(url);
      if (!(timestamp && fromemail)) {
        let al = response.data.user.camera_details[0][0];
        al = { ...al, alert: al.alert !== undefined ? al.alert : false };
        setAlert(al);
        // setAlert(response.data.user.camera_details[0][0]);
        getImageUrls(al);
        // getImageUrls(response.data.user.camera_details[0][0]);
        getCameraAndSite(response.data.user, al.fromemail);
      } else {
        let al = getAlert(response.data.user);
        if (al) {
          al = { ...al, alert: al.alert !== undefined ? al.alert : false };
          setAlert(al);
          getImageUrls(al);
          getCameraAndSite(response.data.user, al.fromemail);
        } else {
          setAlert({
            HTMLbody: "",
            fromemail: "",
            rekognitionData: [],
            subject: "",
            timestamp: 0,
            toemail: "",
            alert: false,
          });
          getImageUrls(undefined);
          setCameraAndSite({ camera_name: "", site_name: "" });
        }
      }
      setLoading(false);
    } catch (err) {
      handleOpen("right", "bottom", "Alerts could not be fetched!");
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timestamp, url]);

  useEffect(() => {
    getCameraAlert();
    return () => {
      setAlert({
        HTMLbody: "",
        fromemail: "",
        rekognitionData: [],
        subject: "",
        timestamp: 0,
        toemail: "",
        alert: false,
      });
      setImageList([]);
    };
  }, [getCameraAlert]);

  const getDateAndTime = (timeStamp: number): string => {
    let date = new Date(timeStamp);
    return (
      date.toLocaleTimeString() +
      ", " +
      date
        .toDateString()
        .substr(
          date.toDateString().indexOf(" "),
          date.toDateString().length - 1
        )
    );
  };

  const onMultipleDownload = (e: any) => {
    e.preventDefault();
    imageList.forEach((image) => {
      window.open((process.env.REACT_APP_DOWNLOAD_URL as string) + image);
    });
  };

  const onSingleDownload = (e: any, imageUrl: string) => {
    e.preventDefault();
    window.open((process.env.REACT_APP_DOWNLOAD_URL as string) + imageUrl);
  };

  return (
    <AlertView
      loading={loading}
      imageList={imageList}
      dateTime={getDateAndTime(alert.timestamp)}
      alert={alert}
      site={cameraAndSite.site_name}
      camera={cameraAndSite.camera_name}
      onSingleDownload={onSingleDownload}
      onMultipleDownload={onMultipleDownload}
    />
  );
};

export default AlertComponent;

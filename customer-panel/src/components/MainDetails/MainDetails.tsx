import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStyles } from "./Styles";
import axios, { AxiosResponse } from "axios";
import { cameraDetails } from "../interfaces";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MainDetailsView from "./MainDetailsView";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

interface params {
  camera: string;
  customer: string;
  site: string;
}

interface MainDetailsProps {
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
}

const MainDetails: React.FC<MainDetailsProps> = ({ handleOpen }) => {
  const classes = useStyles();
  const params: params = useParams();
  const { camera, customer, site } = params;
  console.log(camera);

  const camera_name = camera.split("-")[0];
  const email = camera.split("-")[1];
  const today: number = new Date().setHours(new Date().getHours(), 0, 0, 0);
  const yesterday: number = today - 24 * 60 * 60 * 1000;

  const [timeDuration, setTimeduration] = useState<{
    from: number;
    to: number;
  }>({
    from: yesterday,
    to: today,
  });

  const [cameraDetails, setCameraDetails] = useState<cameraDetails[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [timestamp, setTimestamp] = useState<number>(0);

  const url =
    process.env.REACT_APP_API_URL +
    `camera-details/${email}/${timeDuration.from}/${timeDuration.to}`;

  const getImageUrls = (data: cameraDetails) => {
    const imgUrls: string[] = [];
    if (data === undefined) {
      setTimestamp(0);
      imgUrls.push("not-available/not-available.jpg");
      setImageList(imgUrls);
      handleOpen("right", "bottom", "No images available");
      return;
    } else {
      setTimestamp(data.timestamp);
    }
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
  };

  const getRecognitionData = useCallback(async () => {
    if (timeDuration.from >= timeDuration.to) {
      handleOpen(
        "right",
        "bottom",
        "From date should be smaller than To date!"
      );
      return;
    }

    setLoading(true);
    try {
      const res: AxiosResponse<{ camera_details: cameraDetails[] }> =
        await axios.get<{ camera_details: cameraDetails[] }>(url);
      setCameraDetails(res.data.camera_details);
      getImageUrls(res.data.camera_details[0]);
      // setTimestamp(res.data.camera_details)
      setLoading(false);
    } catch (err) {
      console.log(err);
      handleOpen(
        "right",
        "bottom",
        "Something went wrong. Details could not be fetched!"
      );
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    getRecognitionData();

    return () => {
      setCameraDetails([]);
    };
  }, [getRecognitionData]);

  const formatCameraDetails = () => {
    return cameraDetails.map((cameraDetail: cameraDetails) =>
      cameraDetail.alert === undefined
        ? { ...cameraDetail, alert: false }
        : cameraDetail
    );
  };

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

  const handleDateTimeChange = (date: MaterialUiPickersDate, key: string) => {
    setTimeduration({ ...timeDuration, [key]: date?.getTime() });
  };

  return (
    <MainDetailsView
      camera_name={`${camera_name} - ${email}`}
      site={site}
      customer={customer}
      classes={classes}
      formatCameraDetails={formatCameraDetails}
      getDateAndTime={getDateAndTime}
      getImageUrls={getImageUrls}
      imageList={imageList}
      loading={loading}
      timestamp={timestamp}
      toTime={timeDuration.to}
      fromTime={timeDuration.from}
      handleDateTimeChange={handleDateTimeChange}
      handleOpen={handleOpen}
    />
  );
};

export default MainDetails;

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumbs, Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useStyles } from "./Styles";
import axios, { AxiosResponse } from "axios";
import { cameraDetails } from "../interfacess";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import LoadingScreen from "../../shared/LoadingScreen";

interface params {
  camera: string; 
  customer: string;
  site: string;
}
const AlertDetails: React.FC = () => {
  const classes = useStyles();
  const params: params = useParams();
  const { camera, customer, site } = params;
  const camera_name = camera.split("-")[0];
  const smtp_user_name = camera.split("-")[1];
  const today: number = new Date().setHours(0, 0, 0, 0);
  const yesterday: number = today - 24 * 60 * 60 * 1000;
  // console.log("smtp_user_name -> ", smtp_user_name);

  const [cameraDetails, setCameraDetails] = useState<cameraDetails[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const defaultUrl =
    process.env.REACT_APP_API_URL +
    `customer-details/${smtp_user_name}/${yesterday}/${today}`;

  const getImageUrls = (data: cameraDetails) => {
    const imgUrls: string[] = [];
    if (data?.rekognitionData) {
      data.rekognitionData.forEach((item) => {
        let imgUrl = Object.keys(item)[0];
        imgUrls.push(imgUrl);
      });
      if (imgUrls.length === 0) {
        imgUrls.push("not-available/not-available.jpg");
      }
    } else {
      imgUrls.push("not-available/not-available.jpg");
    }
    setImageList(imgUrls);
  };

  const getRecognitionData = useCallback(async () => {
    setLoading(true);
    try {
      const res: AxiosResponse<{ camera_details: cameraDetails[] }> =
        await axios.get<{ camera_details: cameraDetails[] }>(defaultUrl);
      console.log("response -> ", res.data.camera_details);
      setCameraDetails(res.data.camera_details);
      getImageUrls(res.data.camera_details[0]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [defaultUrl]);

  useEffect(() => {
    getRecognitionData();

    return () => {
      setCameraDetails([]);
    };
  }, [getRecognitionData]);

  return (
    <>
      <Breadcrumbs>
        <Typography variant="body1" className={classes.ts1}>
          {customer}
        </Typography>
        <Typography variant="body1" className={classes.ts1}>
          {site}
        </Typography>
        <Typography variant="body1" className={classes.ts2}>
          {camera_name}
        </Typography>
      </Breadcrumbs>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Grid
          container
          direction="row" 
          justify="center"
          className={classes.mt20}
        >
          <Carousel
            className={classes.carouselStyles}
            showStatus={false}
            showThumbs={false}
            showIndicators={false}
          >
            {imageList.map((img) => (
              <div key={img}>
                <img src={process.env.REACT_APP_IMAGE_URL + img} alt={img} />
                {/* <p className="legend">Hello</p> */}
              </div>
            ))}
          </Carousel>
        </Grid>
      )}
    </>
  );
};

export default AlertDetails;

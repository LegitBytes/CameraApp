/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { useTileStyles } from "./Style";
import {
  Grid,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Button,
} from "@material-ui/core";
import { cameraDetails } from "../interfaces";
import axios, { AxiosResponse } from "axios";
import Breadcrumbs from "../../shared/Breadcrumbs";
import LoadingScreen from "../../shared/LoadingScreen";
import { useHistory } from "react-router-dom";
interface TileProps {
  smtp_user_name: string;
  camera: string;
  site: string;
  customer: string;
  email: string
  //   handleOpen: (
  //     horizontal: "left" | "center" | "right",
  //     vertical: "top" | "bottom",
  //     message: string
  //   ) => void;
}

const Tile: React.FC<TileProps> = ({
  smtp_user_name,
  camera,
  site,
  customer,
  email
  //   handleOpen,
}) => {
  const classes = useTileStyles();
  const history = useHistory();
  const today: number = new Date().setHours(new Date().getHours(), 0, 0, 0);
  const yesterday: number = today - 24 * 60 * 60 * 1000;

  const [cameraDetails, setCameraDetails] = useState<cameraDetails[]>([]);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const url =
    process.env.REACT_APP_API_URL +
    // `camera-details/${smtp_user_name}/${yesterday}/${today}`;
    `camera-details/${email}/${yesterday}/${today}`;

  const getImageUrl = (data: cameraDetails) => {
    if (data === undefined) {
      setImage("not-available/not-available.jpg");
      return;
    } else {
      if (data.rekognitionData && !!data.rekognitionData.length) {
        let imgUrl = Object.keys(data.rekognitionData[0])[0];
        setImage(imgUrl);
      } else {
        setImage("not-available/not-available.jpg");
      }
    }
  };

  const getRecognitionData = useCallback(async () => {
    setLoading(true);
    try {
      const res: AxiosResponse<{ camera_details: cameraDetails[] }> =
        await axios.get<{ camera_details: cameraDetails[] }>(url);
      setCameraDetails(res.data.camera_details);
      getImageUrl(res.data.camera_details[0]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    getRecognitionData();

    return () => {
      setCameraDetails([]);
    };
  }, [getRecognitionData]);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card elevation={5} className={classes.root}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <CardMedia
            component="img"
            alt={image}
            height="100%"
            width="100%"
            image={process.env.REACT_APP_IMAGE_URL + image}
            title={image}
          />
        )}
        <CardContent>
          <Breadcrumbs camera={camera} customer={customer} site={site} />
        </CardContent>
        <CardActions>
          <Button
            variant="text"
            className={classes.button}
            onClick={() =>
              history.push(
                `/main/${customer}/${site}/${camera}-${email}`
              )
            }
          >
            View details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Tile;

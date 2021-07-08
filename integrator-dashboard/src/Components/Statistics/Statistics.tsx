import React, { useState, useCallback, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Grid, Paper } from "@material-ui/core";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import { Alert } from "../../Shared/Interfaces";
import axios, { AxiosResponse } from "axios";
import { CameraStats, Site, SiteStats } from "../Interfaces";
import LoadingScreen from "../../Shared/LoadingScreen";
import AlertComp from "../../Shared/Alert";
import { useStyles } from "./Styles";
import { getSiteStats } from "./Util";

const Statistics: React.FC = () => {
  const classes = useStyles();
  const [alertDetails, setAlertDetails] = useState<Alert>({
    open: false,
    horizontal: "center",
    vertical: "bottom",
    message: "",
  });

  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const handleOpen = (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => {
    setTransition(() => TransitionLeft);
    setAlertDetails({
      open: true,
      horizontal,
      vertical,
      message,
    });
  };

  const handleClose = () => {
    setAlertDetails({ ...alertDetails, open: false });
  };

  const [cameraStats, setCameraStats] = useState<CameraStats[]>([]);
  const [siteStats, setSiteStats] = useState<SiteStats[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const url = process.env.REACT_APP_API_URL + "camera-total-count";
  const siteUrl = process.env.REACT_APP_API_URL + "sites";

  const getStatistics = useCallback(async () => {
    setLoading(true);
    try {
      const res: AxiosResponse<{ camera_details: CameraStats[] }> =
        await axios.get(url);
      setCameraStats(res.data.camera_details);
      const response: AxiosResponse<{ sites: Site[] }> = await axios.get(
        siteUrl
      );

      let formattedSiteStats = getSiteStats(
        response.data.sites,
        res.data.camera_details
      );

      setSiteStats(formattedSiteStats);
      setLoading(false);
    } catch (err) {
      console.log(err);

      handleOpen("left", "bottom", "Something went wrong!");
      setLoading(false);
    }
  }, [url, siteUrl]);

  useEffect(() => {
    getStatistics();
    return () => {
      setCameraStats([]);
      setSiteStats([]);
    };
  }, [getStatistics]);

  const getCameraLabel = () => {
    return cameraStats.map(
      (stat) => stat.smtp_email + ` (${stat.alert}/${stat.request_count})`
    );
  };
  const getCameraData = () => {
    // console.log(
    //   cameraStats.map((stat) => (stat.alert / stat.request_count) * 100)
    // );

    return cameraStats.map((stat) => (stat.alert / stat.request_count) * 100);
  };
  const getColor = (data) => {
    return data.map(
      (_) => "#" + Math.floor(Math.random() * 16777215).toString(16)
    );
  };

  const getSiteLabel = () => {
    return siteStats.map(
      (stat) => stat.site_name + ` (${stat.alert}/${stat.total_requests})`
    );
  };

  const getSiteData = () => {
    return siteStats.map((stat) =>
      isNaN((stat.alert / stat.total_requests) * 100)
        ? 0
        : (stat.alert / stat.total_requests) * 100
    );
  };

  const cameraData = {
    labels: getCameraLabel(),
    datasets: [
      {
        label: "Camera Usage(%)",
        data: getCameraData(),
        backgroundColor: getColor(cameraStats),
      },
    ],
  };

  const siteData = {
    labels: getSiteLabel(),
    datasets: [
      {
        label: "Site Usage(%)",
        data: getSiteData(),
        backgroundColor: getColor(siteStats),
      },
    ],
  };

  const getOptions = (title: "Camera" | "Site") => {
    return {
      indexAxis: "y",
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      //   responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: title + " Usage in Percentage",
        },
      },
    };
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Grid container direction="row" style={{ marginTop: 100 }}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={5} className={classes.paperStyles}>
              <Bar type="bar1" data={siteData} options={getOptions("Site")} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={5} className={classes.paperStyles}>
              <Bar
                type="bar"
                data={cameraData}
                options={getOptions("Camera")}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
      <AlertComp
        open={alertDetails.open}
        vertical={alertDetails.vertical}
        horizontal={alertDetails.horizontal}
        transition={transition}
        message={alertDetails.message}
        handleClose={handleClose}
      />
    </>
  );
};

export default Statistics;

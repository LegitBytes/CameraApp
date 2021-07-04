import React, { useEffect, useState } from "react";
import { Breadcrumbs, Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { cameraDetails } from "../interfaces";
import clsx from "clsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import LoadingScreen from "../../shared/LoadingScreen";
import Timeline from "./Timeline";
import Button from "../../shared/Buttons";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { DateTimePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0079FE",
    },
  },
});

interface MainDetailsViewProps {
  customer: string;
  site: string;
  camera_name: string;
  loading: boolean;
  classes: ClassNameMap<
    | "carouselStyles"
    | "ts1"
    | "ts2"
    | "bottomDivStyles"
    | "mt20"
    | "mb50"
    | "timeSelectorDiv"
    | "utilStyles"
  >;
  imageList: string[];
  timestamp: number;
  getDateAndTime: (timestamp: number) => string;
  getImageUrls: (data: cameraDetails) => void;
  formatCameraDetails: () => cameraDetails[];
  toTime: number;
  fromTime: number;
  handleDateTimeChange: (date: MaterialUiPickersDate, key: string) => void;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
}

const MainDetailsView: React.FC<MainDetailsViewProps> = ({
  customer,
  site,
  camera_name,
  loading,
  classes,
  imageList,
  timestamp,
  getImageUrls,
  getDateAndTime,
  formatCameraDetails,
  handleDateTimeChange,
  toTime,
  fromTime,
  handleOpen,
}) => {

  const SCALES: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const [ scaleArray, setScaleArray ] = useState<number[]>(SCALES)

  const [startTime, setStartTime] = useState<number>(fromTime);
  const [endTime, setEndTime] = useState<number>(toTime);

  useEffect(() => {
    setStartTime(fromTime);
    setEndTime(toTime);
  }, [fromTime, toTime]);

  const changeFromTo = (item: number) => {
    if (item === 0) {
      handleOpen("right", "bottom", "Please select the next higher interval");
      return;
    } else if (item === 1) {
      setStartTime(fromTime);
      let et = Math.round((toTime - fromTime) / 10 + fromTime);
      setEndTime(et);
    } else if (item === 10) {
      let st = Math.round(0.9 * (toTime - fromTime) + fromTime);
      setStartTime(st);
      setEndTime(toTime);
    } else {
      let st = Math.round(((item - 1) / 10) * (toTime - fromTime) + fromTime);
      setStartTime(st);
      let et = Math.round((item / 10) * (toTime - fromTime) + fromTime);
      setEndTime(et)
    }
    setScaleArray([])
  };

  const scaleFromTo = (item: number): string => {
    if (item === 0) { 
      return "";
    } else if (item === 1) {
      let et = Math.round((toTime - fromTime) / 10 + fromTime);
      return `${getDateAndTime(fromTime)} to ${getDateAndTime(et)}`;
    } else if (item === 10) {
      let st = Math.round(0.9 * (toTime - fromTime) + fromTime);
      return `${getDateAndTime(st)} to ${getDateAndTime(toTime)}`;
    } else {
      let st = Math.round(((item - 1) / 10) * (toTime - fromTime) + fromTime);
      let et = Math.round((item / 10) * (toTime - fromTime) + fromTime);
      return `${getDateAndTime(st)} to ${getDateAndTime(et)}`;
    }
  };

  const reset = () => {
    setScaleArray(SCALES)
    setStartTime(fromTime);
    setEndTime(toTime);
  };

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
          className={clsx(classes.mt20, classes.mb50)}
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
                {timestamp !== 0 && (
                  <div className={classes.bottomDivStyles}>
                    <Typography
                      variant="body1"
                      style={{ color: "#fff", marginTop: 10 }}
                    >
                      {
                        // console.log("maindetails view -> ", timestamp)
                        timestamp !== 0 ? getDateAndTime(timestamp) : ""
                      }
                    </Typography>
                    <div style={{ margin: 0, padding: 0 }}>
                      <Button
                        type="primary"
                        variant="contained"
                        href={process.env.REACT_APP_IMAGE_URL + img}
                        // onClick={(e) => onImageDownload(e)}
                      >
                        Download this image
                        {/* Download this image */}
                      </Button>
                      <Button type="success" variant="contained">
                        Download All images
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Carousel>

          {!!formatCameraDetails().length && (
            <div className={classes.utilStyles}>
              <Typography variant="h6" className={classes.ts2}>
                From: {getDateAndTime(startTime)} --
              </Typography>{" "}
              &nbsp;
              <Typography variant="h6" className={classes.ts2}>
                To: {getDateAndTime(endTime)}
              </Typography>
            </div>
          )}

          {!!formatCameraDetails().length && (
            <>
              <Timeline
                cameraDetails={formatCameraDetails()}
                fromTime={startTime}
                toTime={endTime}
                getImageUrls={getImageUrls}
                getDateAndTime={getDateAndTime}
                changeFromTo={changeFromTo}
                scaleFromTo={scaleFromTo}
                scaleArray={scaleArray} 
              />
            </>
          )}
          {!!formatCameraDetails().length && (
            <div className={classes.utilStyles}>
              <Button variant="contained" type="primary" onClick={reset}>
                Reset Scales
              </Button>
            </div>
          )}
          <ThemeProvider theme={theme}>
            <div className={classes.timeSelectorDiv}>
              <DateTimePicker
                inputVariant="outlined"
                value={fromTime}
                size="small"
                onChange={(date) => handleDateTimeChange(date, "from")}
                label="From"
                showTodayButton
              />
              <div style={{ margin: 0, padding: 0 }}>
                <DateTimePicker
                  inputVariant="outlined"
                  value={toTime}
                  size="small"
                  onChange={(date) => handleDateTimeChange(date, "to")}
                  label="To"
                  showTodayButton
                />
              </div>
            </div>
          </ThemeProvider>
        </Grid>
      )}
    </>
  );
};

export default MainDetailsView;

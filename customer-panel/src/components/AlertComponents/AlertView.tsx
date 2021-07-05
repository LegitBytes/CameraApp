import React, { useState } from "react";
import { Grid, Typography, Fade, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useStyles } from "./Style";
import { cameraDetails } from "../interfaces";
import LoadingScreen from "../../shared/LoadingScreen";
import Button from "../../shared/Buttons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Folder, GetApp } from "@material-ui/icons";
interface AlertViewProps {
  dateTime: string;
  alert: cameraDetails;
  camera: string;
  site: string;
  loading: boolean;
  imageList: string[];
}

const AlertView: React.FC<AlertViewProps> = ({
  dateTime,
  alert,
  camera,
  site,
  loading,
  imageList,
}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState<boolean>(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(960));

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Typography variant="body2" className={classes.ts1}>
            {dateTime}/{camera} - {site} ({alert.fromemail}){" "}
          </Typography>
          <Fade in={checked}>
            <div className={classes.response}>
              <Typography variant="body2">
                Is this alarm true or false?
              </Typography>
              <div style={{ marginLeft: 50 }}>
                <Button
                  variant="contained"
                  type="success"
                  onClick={(e) => setChecked(false)}
                >
                  True
                </Button>
                <Button
                  variant="contained"
                  type="danger"
                  onClick={(e) => setChecked(false)}
                >
                  false
                </Button>
              </div>
            </div>
          </Fade>
          <Grid container direction="row" className={classes.mt20}>
            <Grid item xs={12} sm={12} md={5}>
              <Grid container direction="row">
                <Grid item xs={12} sm={12} md={3}>
                  <Typography variant="body1" className={classes.tsBold}>
                    Subject:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                  <Typography variant="body1" className={classes.ts2}>
                    {alert.subject}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography variant="body1" className={classes.tsBold}>
                    Date:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                  <Typography variant="body1" className={classes.ts2}>
                    {dateTime}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography variant="body1" className={classes.tsBold}>
                    Site:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                  <Typography variant="body1" className={classes.ts2}>
                    {site}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Typography variant="body1" className={classes.tsBold}>
                    Camera:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                  <Typography variant="body1" className={classes.ts2}>
                    {camera}({alert.fromemail})
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} className={classes.mt20}>
                  <Typography variant="body1" className={classes.tsBold}>
                    Received:
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={9}
                  className={isMobile ? "" : classes.mt20}
                >
                  <Typography
                    variant="body1"
                    style={{ color: alert.alert ? "#28A745" : "#DC3545" }}
                  >
                    {String(alert.alert).toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 30 }}>
                  <Typography variant="body1" className={classes.tsBold}>
                    Detected Information:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className={classes.mt20}>
                  <Typography variant="body1" className={classes.tsBold}>
                    Human Confidence:
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  className={isMobile ? "" : classes.mt20}
                >
                  <Typography variant="body1" className={classes.ts2}>
                    75% {isMobile ? "Confidence" : ""}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="body1" className={classes.tsBold}>
                    Vehicle Confidence:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="body1" className={classes.ts2}>
                    89% {isMobile ? "Confidence" : ""}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={7}
              className={isMobile ? classes.mt20 : ""}
            >
              <Carousel
                className={classes.carouselStyles}
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
              >
                {imageList.map((img) => (
                  <div key={img}>
                    <img
                      src={process.env.REACT_APP_IMAGE_URL + img}
                      alt={img}
                    />

                    {!!imageList.length && (
                      <div className={classes.bottomDivStyles}>
                        <Typography
                          variant="body1"
                          style={{ color: "#fff", marginTop: 10 }}
                        >
                          {dateTime}
                        </Typography>
                        <div style={{ margin: 0, padding: 0 }}>
                          <Button
                            type="primary"
                            variant="contained"
                            href={process.env.REACT_APP_IMAGE_URL + img}
                            size="small"
                          >
                            <GetApp />
                          </Button>
                          <Button
                            type="success"
                            variant="contained"
                            size="small"
                          >
                            <Folder />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </Carousel>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default AlertView;

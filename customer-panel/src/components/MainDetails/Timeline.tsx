import React from "react";
import { cameraDetails } from "../interfaces";
import Dot from "./Dot";
import { useTimeLineStyles } from "./Styles";
import { Tooltip } from "@material-ui/core";
interface TimelineProps {
  cameraDetails: cameraDetails[];
  getImageUrls: (data: cameraDetails) => void;
  fromTime: number;
  toTime: number;
  getDateAndTime: (timeStamp: number) => string;
  changeFromTo: (item: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  cameraDetails,
  getImageUrls,
  fromTime,
  toTime,
  getDateAndTime,
  changeFromTo,
}) => {
  const classes = useTimeLineStyles();

  const calculatePercentage = (data: cameraDetails, index: number): string => {
    const timeGap = toTime - fromTime;
    const timePassed = data.timestamp - fromTime;

    console.log("timeGap -> ", timeGap);
    console.log("timePassed -> ", timePassed);

    const percent = (timePassed / timeGap) * 100;
    console.log(index + " Percent -> ", percent);

    return Math.round(percent) === 100 ? 99 + "%" : percent + "%";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <>
      <br />

      <div className={classes.timelineStyles}>
        {cameraDetails.map(
          (cameraDetail, index) =>
            cameraDetail.timestamp >= fromTime &&
            cameraDetail.timestamp <= toTime && (
              <Dot
                alert={cameraDetail.alert}
                data={cameraDetail}
                left={calculatePercentage(cameraDetail, index)}
                onClick={getImageUrls}
                time={getDateAndTime(cameraDetail.timestamp)}
                key={cameraDetail.timestamp}
              />
            )
        )}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Tooltip title="Click to scale" arrow placement="bottom">
            <div
              style={{
                background: "rgba(0,0,0,0.8)",
                width: 7,
                height: 20,
                position: "absolute",
                top: "-80%",
                left: item === 10 ? "99%" : item * 10 + "%",
                cursor: "pointer",
              }}
              onClick={() => changeFromTo(item)}
            ></div>
          </Tooltip>
        ))}
      </div>
    </>
  );
};

export default Timeline;

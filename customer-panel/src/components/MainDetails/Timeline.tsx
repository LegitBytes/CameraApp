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
  scaleFromTo: (item: number) => string;
  scaleArray: number[];
}

const Timeline: React.FC<TimelineProps> = ({
  cameraDetails,
  getImageUrls,
  fromTime,
  toTime,
  getDateAndTime,
  changeFromTo,
  scaleFromTo,
  scaleArray,
}) => {
  const classes = useTimeLineStyles();

  const calculatePercentage = (data: cameraDetails, index: number): string => {
    const timeGap = toTime - fromTime;
    const timePassed = data.timestamp - fromTime;
    const percent = (timePassed / timeGap) * 100;
    return Math.round(percent) === 100 ? 99 + "%" : percent + "%";
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
        {!!scaleArray.length &&
          scaleArray.map((item) => (
            <Tooltip
              title={
                item === 0
                  ? "Click next scale"
                  : `Click to scale from ${scaleFromTo(item)}`
              }
              arrow
              placement="bottom"
              key={item}
            >
              <div
                style={{
                  background: "rgba(0,0,0,0.4)",
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

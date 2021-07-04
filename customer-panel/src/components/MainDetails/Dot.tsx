import { Tooltip } from "@material-ui/core";
import React from "react";
import { cameraDetails } from "../interfaces";
import { useDotStyles } from "./Styles";

interface DotProps {
  onClick: (data: cameraDetails) => void;
  left: string;
  alert: boolean | undefined;
  time: string;
  data: cameraDetails;
}

const Dot: React.FC<DotProps> = ({ left, alert, time, onClick, data }) => {
  const classes = useDotStyles({ left, alert });
  return (
    <Tooltip title={time } placement="bottom" arrow>
      <div className={classes.dotStyles} onClick={() => onClick(data)} />
    </Tooltip>
  );
};

export default Dot;

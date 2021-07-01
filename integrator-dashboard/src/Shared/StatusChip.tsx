import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { is_disabled } from "../Components/Interfaces";
import { ClassNameMap } from "@material-ui/styles";
const useStyles = makeStyles<Theme>((theme: Theme) => ({
  base: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 20,
    height: 25,
    padding: 5,
  },
  active: {
    background: "#28A745",
    color: "#fff",
  },
  inactive: {
    background: "#FFC107",
    color: "#fff",
  },
}));

interface StatusChipProps {
  is_disabled: is_disabled;
  handleChange: () => void;
}

const StatusChip: React.FC<StatusChipProps> = ({
  is_disabled,
  handleChange,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes: ClassNameMap<"base" | "active" | "inactive"> = useStyles();
  return (
    <>
      <div
        className={clsx(
          classes.base,
          classes[is_disabled === false ? "active" : "inactive"]
        )}
        onClick={handleChange}
      >
        <p>{(is_disabled === false ? "active" : "inactive").toUpperCase()}</p>
      </div>
    </>
  );
};

export default StatusChip;

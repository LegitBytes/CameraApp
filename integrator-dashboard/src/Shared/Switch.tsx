import React, { useState } from "react";
import SwitchComp from "react-switch";
import { Done, Clear } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
interface SwitchProps {
  is_disabled: "active" | "inactive";
  handleChange: (_: "active" | "inactive") => void;
}

const Switch: React.FC<SwitchProps> = ({ is_disabled, handleChange }) => {
  const [checked, setChecked] = useState<boolean>(
    is_disabled === "active" ? true : false
  );

  const handleSwitchChange = (checked) => {
    setChecked(checked);
    if (checked === true) {
      handleChange("active");
    } else {
      handleChange("inactive");
    }
  };

  return (
    <SwitchComp
      checked={checked}
      onChange={handleSwitchChange}
      handleDiameter={28}
      offColor="#FFC107"
      onColor="#28A745"
      offHandleColor="#fff"
      onHandleColor="#fff"
      height={40}
      width={150}
      borderRadius={20}
      activeBoxShadow="0px 0px 1px 2px #fffc35"
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 15,
            color: "#fff",
            paddingRight: 2,
          }}
        >
          <Typography variant="body1">Inactive</Typography>
        </div>
      }
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 15,
            color: "#fff",
            paddingRight: 2,
          }}
        >
          <Typography variant="body1">Active</Typography>
        </div>
      }
      uncheckedHandleIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 20,
            color: "#28A745",
          }}
        >
          <Done />
        </div>
      }
      checkedHandleIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "#FFC107",
            fontSize: 18,
          }}
        >
          <Clear />
        </div>
      }
      className="react-switch"
      id="small-radius-switch"
    />
  );
};

export default Switch;

import React from "react";
import { TransitionProps } from "./Slides";
import { IconButton, Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";

interface AlertProps {
  open: boolean;
  handleClose: () => void;
  transition: React.ComponentType<TransitionProps> | undefined;
  message: string;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}

const Alert: React.FC<AlertProps> = ({
  open,
  handleClose,
  transition,
  message,
  vertical,
  horizontal,
}) => {
  return (
    <Snackbar
      autoHideDuration={6000}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      TransitionComponent={transition}
      message={message}
      action={
        <IconButton onClick={handleClose} style={{color: "#F11D05"}}>
          <Close />
        </IconButton>
      }
    />
  );
};

export default Alert;

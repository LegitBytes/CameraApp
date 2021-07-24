import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Alert } from "../shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../shared/Slides";
import AlertComp from "../shared/Alert";
import ResetPasswordComp from "../components/Auth/ResetPassword";

interface ResetPasswordProps extends RouteComponentProps {}
const ResetPassword: React.FC<ResetPasswordProps> = () => {
  useEffect(() => window.scrollTo(0, 0), []);
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

  return (
    <>
      <ResetPasswordComp handleOpen={handleOpen} />
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

export default ResetPassword;

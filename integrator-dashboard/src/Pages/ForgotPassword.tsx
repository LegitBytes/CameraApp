import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Alert } from "../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../Shared/Slides";
import AlertComp from "../Shared/Alert";
import ForgotPasswordComp from "../Components/Auth/ForgotPassword";
interface ForgotPasswordProps extends RouteComponentProps {}
const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
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
      <ForgotPasswordComp handleOpen={handleOpen} />
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

export default ForgotPassword;

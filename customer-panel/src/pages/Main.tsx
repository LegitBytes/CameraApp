import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Alert } from "../shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../shared/Slides";
import AlertComp from "../shared/Alert";
import MainComponent from "../components/MainComponents/MainComponent";

interface MainProps extends RouteComponentProps {}

const Main: React.FC<MainProps> = () => {
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
    <MainComponent handleOpen={handleOpen}/>
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

export default Main;

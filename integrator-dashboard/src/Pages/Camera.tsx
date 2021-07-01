import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import AllCameras from "../Components/Camera/AllCameras";
interface CameraProps extends RouteComponentProps {}

const Camera: React.FC<CameraProps> = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return <AllCameras />;
};

export default Camera;

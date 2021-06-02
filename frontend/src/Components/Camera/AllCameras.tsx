import React, { useCallback, useEffect, useState } from "react";
import { Camera, rows } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { Alert } from "../../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import ButtonComp from "../../Shared/Buttons";
import { columns } from "./Util/Columns";
import CopyAble from "../../Shared/CopyAble";
import Functionalities, { args, retVal } from "../Main/Functionalities";
import { handleSwitchChange } from "../../Utilities/Helpers/handleSwitchChange";

const AllCameras: React.FC = () => {
  const [alertDetails, setAlertDetails] = useState<Alert>({
    open: false,
    horizontal: "center",
    vertical: "bottom",
    message: "",
  });

  const [transition, setTransition] =
    React.useState<React.ComponentType<TransitionProps> | undefined>(undefined);

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

  const url = "http://localhost:4000/camera-db";

  const [loading, setLoading] = useState<boolean>(true);

  const [activedata, setActiveData] = useState<Camera[]>([]);
  const [inactivedata, setInctiveData] = useState<Camera[]>([]);

  const getCameraData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<Camera[]> = await axios.get(url);
      let activeArr = response.data.filter((item) => item.status === "active");
      let inactiveArr = response.data.filter(
        (item) => item.status === "inactive"
      );
      setActiveData(activeArr);
      setInctiveData(inactiveArr);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handleOpen("left", "bottom", "Something went wrong!");
    }
  }, []);

  useEffect(() => {
    getCameraData();
    return () => {
      setActiveData([]);
      setInctiveData([]);
    };
  }, [getCameraData]);

  const formatData = (data: args, isActive: boolean): retVal => {
    return data.map((item) => ({
      name: item.name,
      ip_address: item.ip_address,
      smtp_username: (
        <CopyAble text={item.smtp_username} handleOpen={handleOpen} />
      ),
      smtp_password: (
        <CopyAble text={item.smtp_password} handleOpen={handleOpen} />
      ),
      site: item.site,
      location: item.location,
      total_requests: item.total_requests,
      group_name: item.group_name,
      number_of_users: item.number_of_users,
      actions: (
        <>
          {isActive && (
            <ButtonComp type="dark" size="small" variant="contained">
              Modify
            </ButtonComp>
          )}
          <ButtonComp
            type={!isActive ? "success" : "danger"}
            size="small"
            variant="contained"
            onClick={() =>
              handleSwitchChange(
                String(item.id),
                item,
                setLoading,
                url,
                getCameraData,
                handleOpen
              )
            }
          >
            {isActive ? "Delete" : "Recover"}
          </ButtonComp>
        </>
      ),
    }));
  };

  const onRowsDelete = (rows: rows): false => {
    handleOpen(
      "left",
      "bottom",
      "This action is prohibited as per business needs!"
    );
    return false;
  };

  return (
    <Functionalities
      alertDetails={alertDetails}
      columns={columns}
      activeData={activedata}
      inactiveData={inactivedata}
      formatData={formatData}
      handleClose={handleClose}
      loading={loading}
      onRowsDelete={onRowsDelete}
      transition={transition}
      title="Cameras"
    />
  );
};

export default AllCameras;

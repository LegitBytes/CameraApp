import React, { useCallback, useEffect, useState } from "react";
import { rows, User } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { Alert } from "../../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import ButtonComp from "../../Shared/Buttons";
import { columns } from "./Util/Columns";
import Functionalities, { args, retVal } from "../Main/Functionalities";
import { handleSwitchChange } from "../../Utilities/Helpers/handleSwitchChange";

const AllUsers: React.FC = () => {
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

  const url = "http://localhost:4004/user-db";

  const [loading, setLoading] = useState<boolean>(true);

  const [acticveData, setActiveData] = useState<User[]>([]);
  const [inacticveData, setInactiveData] = useState<User[]>([]);

  const getUserData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<User[]> = await axios.get(url);
      const activeArr = response.data.filter(
        (item) => item.status === "active"
      );
      const inactiveArr = response.data.filter(
        (item) => item.status === "inactive"
      );
      setActiveData(activeArr);
      setInactiveData(inactiveArr);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handleOpen("left", "bottom", "Something went wrong!");
    }
  }, []);

  useEffect(() => {
    getUserData();
    return () => {
      setActiveData([]);
      setInactiveData([]);
    };
  }, [getUserData]);

  const formatData = (data: args, isActive: boolean): retVal => {
    return data.map((item) => ({
      email: item.email,
      group_name: item.group_name,
      number_of_customers: item.number_of_customers,
      number_of_sites: item.number_of_sites,
      number_of_cameras: item.number_of_cameras,
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
                getUserData,
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
      activeData={acticveData}
      inactiveData={inacticveData}
      formatData={formatData}
      handleClose={handleClose}
      loading={loading}
      onRowsDelete={onRowsDelete}
      transition={transition}
      title="Users"
    />
  );
};

export default AllUsers;

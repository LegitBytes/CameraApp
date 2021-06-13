import React, { useCallback, useEffect, useState } from "react";
import { Site, rows } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { Alert } from "../../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import ButtonComp from "../../Shared/Buttons";
import { columns } from "./Util/Columns";
import Functionalities, { args, retVal } from "../Main/Functionalities";
import { handleSwitchChange } from "../../Utilities/Helpers/handleSwitchChange";

const AllSites: React.FC = () => {
  const [alertDetails, setAlertDetails] = useState<Alert>({
    open: false,
    horizontal: "center",
    vertical: "bottom",
    message: "",
  });

  const [transition, setTransition] =
    React.useState<React.ComponentType<TransitionProps> | undefined>(undefined);

  const handleOpen = (
    horizontal: "left" | "right" | "center",
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

  const url = "http://localhost:4001/site-db";

  const [loading, setLoading] = useState<boolean>(true);

  const [activeData, setActiveData] = useState<Site[]>([]);
  const [inactiveData, setInactiveData] = useState<Site[]>([]);

  const getSiteData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<Site[]> = await axios.get(url);
      const activeArr = response.data.filter(
        (item) => item.is_disabled === false
      );
      const inactiveArr = response.data.filter(
        (item) => item.is_disabled === true
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
    getSiteData();
    return () => {
      setActiveData([]);
      setInactiveData([]);
    };
  }, [getSiteData]);

  const formatData = (data: args, isActive: boolean): retVal => {
    return data.map((item) => ({
      name: item.name,
      group_name: item.group_name,
      user_count: item.user_count,
      customer_count: item.customer_count,
      camera_count: item.camera_count,
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
                getSiteData,
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
    // <Functionalities
    //   alertDetails={alertDetails}
    //   columns={columns}
    //   activeData={activeData}
    //   inactiveData={inactiveData}
    //   formatData={formatData}
    //   handleClose={handleClose}
    //   loading={loading}
    //   onRowsDelete={onRowsDelete}
    //   transition={transition}
    //   title="Sites"
    // />
    <div>test</div>
  );
};

export default AllSites;

import React, { useCallback, useEffect, useState } from "react";
import { Customer, rows } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { Alert } from "../../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import StatusChip from "../../Shared/StatusChip";
import ButtonComp from "../../Shared/Buttons";
import { columns } from "./Util/Columns";
import Functionalities, { args, retVal } from "../Main/Functionalities";
import { handleSwitchChange } from "../../Utilities/Helpers/handleSwitchChange";

const AllCustomers: React.FC = () => {
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

  const url = "http://localhost:4002/customer-db";

  const [loading, setLoading] = useState<boolean>(true);

  const [data, setData] = useState<Customer[]>([]);

  const getCustomerData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<Customer[]> = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handleOpen("left", "bottom", "Something went wrong!");
    }
  }, []);

  useEffect(() => {
    getCustomerData();
    return () => {
      setData([]);
    };
  }, [getCustomerData]);

  const formatData = (data: args): retVal => {
    return data.map((item) => ({
      name: item.name,
      group_name: item.group_name,
      number_of_users: item.number_of_users,
      number_of_sites: item.number_of_sites,
      number_of_cameras: item.number_of_cameras,
      status: (
        <StatusChip
          status={item.status}
          handleChange={() =>
            handleSwitchChange(
              String(item.id),
              item,
              setLoading,
              url,
              getCustomerData,
              handleOpen
            )
          }
        />
      ),
      actions: (
        <>
          <ButtonComp type="dark" size="small" variant="contained">
            Modify
          </ButtonComp>
          <ButtonComp type="danger" size="small" variant="contained">
            Delete
          </ButtonComp>
        </>
      ),
    }));
  };

  const onRowsDelete = (rows: rows): false => {
    console.log(rows);
    return false;
  };

  return (
    <Functionalities
      alertDetails={alertDetails}
      columns={columns}
      data={data}
      formatData={formatData}
      handleClose={handleClose}
      loading={loading}
      onRowsDelete={onRowsDelete}
      transition={transition}
      title="Customers"
    />
  );
};

export default AllCustomers;

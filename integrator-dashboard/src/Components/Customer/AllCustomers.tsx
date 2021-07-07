import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Customer, rows, xlsxCustomer } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { Alert } from "../../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import ButtonComp from "../../Shared/Buttons";
import { columns } from "./Util/Columns";
import Functionalities, { args, retVal } from "../Main/Functionalities";
import { handleSwitchChange } from "../../Utilities/Helpers/handleSwitchChange";
import AddCustomer from "./AddCustomer";

type title = "ADD NEW CUSTOMER" | "EDIT CUSTOMER";

const AllCustomers: React.FC = () => {
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

  const url = process.env.REACT_APP_API_URL + "customers";

  const [loading, setLoading] = useState<boolean>(true);

  const [wholeData, setWholeData] = useState<Customer[]>([]);
  const [activeData, setActiveData] = useState<Customer[]>([]);
  const [inactiveData, setInactiveData] = useState<Customer[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<title>("ADD NEW CUSTOMER");
  const [updateId, setUpdateId] = useState<string>("");
  const [action, setAction] = useState<"ADD" | "EDIT">("ADD");
  const [item, setItem] = useState<Customer | null>(null);

  const handleModalOpen = (): void => {
    setTitle("ADD NEW CUSTOMER");
    setAction("ADD");
    setItem(null);
    setUpdateId("");
    setModalOpen(true);
  };
  const handleEditModalOpen = (item: Customer): void => {
    setTitle("EDIT CUSTOMER");
    setAction("EDIT");
    setItem(item);
    setUpdateId(item.customer_id);
    setModalOpen(true);
  };
  const handleModalClose = (): void => {
    setModalOpen(false);
    setTitle("ADD NEW CUSTOMER");
  };

  const getCustomerData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ customers: Customer[] }> =
        await axios.get(url);
      setWholeData(response.data.customers);
      const activeArr = response.data.customers.filter(
        (item) => item.is_disabled === false
      );
      const inactiveArr = response.data.customers.filter(
        (item) => item.is_disabled === true
      );
      setActiveData(activeArr);
      setInactiveData(inactiveArr);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handleOpen("left", "bottom", "Something went wrong!");
    }
  }, [url]);

  useEffect(() => {
    getCustomerData();
    return () => {
      setActiveData([]);
      setInactiveData([]);
    };
  }, [getCustomerData]);

  const formatData = (data: args, isActive: boolean): retVal => {
    return data.map((item) => ({
      name: item.customer_name,
      group_name: item.groups.group_name,
      user_count: item.users.length,
      site_count: item.sites.length,
      camera_count: item.camera_count,
      actions: (
        <>
          {isActive && (
            <ButtonComp
              type="dark"
              size="small"
              variant="contained"
              onClick={() => handleEditModalOpen(item)}
            >
              Modify
            </ButtonComp>
          )}
          <ButtonComp
            type={!isActive ? "success" : "danger"}
            size="small"
            variant="contained"
            onClick={() =>
              handleSwitchChange(
                item.customer_id,
                item,
                setLoading,
                url + "/disable-customer",
                getCustomerData,
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

  const getXLSXData = (): xlsxCustomer[] => {
    return wholeData.map(customer => ({
      "Customer ID": customer.customer_id,
      "Customer Name": customer.customer_name,
      "Number of Sites": customer.sites.length,
      "Number of Users": customer.users.length,
      Disabled: customer.is_disabled
    }))
  }

  const onRowsDelete = (rows: rows): false => {
    handleOpen(
      "left",
      "bottom",
      "This action is prohibited as per business needs!"
    );
    return false;
  };

  const addCustomer = useMemo(
    () => (
      <AddCustomer
        action={action}
        getCustomerData={getCustomerData}
        handleModalClose={handleModalClose}
        handleOpen={handleOpen}
        item={item}
        setLoading={setLoading}
        updateId={updateId}
        url={url}
      />
    ),
    [action, getCustomerData, item, updateId, url]
  );

  return (
    <Functionalities
      alertDetails={alertDetails}
      columns={columns}
      activeData={activeData}
      inactiveData={inactiveData}
      wholeData={getXLSXData()}
      formatData={formatData}
      handleClose={handleClose}
      loading={loading}
      onRowsDelete={onRowsDelete}
      transition={transition}
      title="Customers"
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
      handleModalOpen={handleModalOpen}
      modalTop="20%"
      modalWidth="60%"
      modalTitle={title}
    >
      {addCustomer}
    </Functionalities>
  );
};

export default AllCustomers;

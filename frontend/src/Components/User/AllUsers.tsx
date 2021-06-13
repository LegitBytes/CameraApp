import React, { useCallback, useEffect, useState } from "react";
import { rows, User } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { Alert } from "../../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import ButtonComp from "../../Shared/Buttons";
import { columns } from "./Util/Columns";
import Functionalities, { args, retVal } from "../Main/Functionalities";
import { handleSwitchChange } from "../../Utilities/Helpers/handleSwitchChange";
import AddUser from "./AddUser";

export interface FormState {
  user_email: string;
  group_id: string;
  integrator_id: string;
  site_ids: [];
  customer_ids: [];
  camera_ids: [];
}

type title = "ADD NEW USER" | "EDIT USER";

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

  const url = process.env.REACT_APP_API_URL + "users";

  const [loading, setLoading] = useState<boolean>(true);

  const [acticveData, setActiveData] = useState<User[]>([]);
  const [inacticveData, setInactiveData] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [formState, setFormState] = useState<FormState>({
    user_email: "",
    group_id: "",
    integrator_id: "084c16fc-2b4d-4d2b-a335-7f7bc618d345",
    site_ids: [],
    customer_ids: [],
    camera_ids: [],
  });

  const [title, setTitle] = useState<title>("ADD NEW USER");

  const handleModalOpen = (): void => {
    setFormState({
      ...formState,
      user_email: "",
      group_id: "",
      site_ids: [],
      customer_ids: [],
      camera_ids: [],
    });
    setTitle("ADD NEW USER");
    setModalOpen(true);
  };
  const handleEditModalOpen = (item: User): void => {
    setFormState({
      ...formState,
      user_email: item.user_email,
      group_id: item.groups.group_id,
      site_ids: item.sites,
      customer_ids: item.customers,
      camera_ids: item.cameras,
    });
    setTitle("EDIT USER");
    setModalOpen(true);
  };
  const handleModalClose = (): void => {
    setModalOpen(false);
    setTitle("ADD NEW USER");
  };

  const getUserData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ users: User[] }> = await axios.get(url);
      console.log(response.data);
      const activeArr = response.data.users.filter(
        (item) => item.is_disabled === false
      );
      const inactiveArr = response.data.users.filter(
        (item) => item.is_disabled === true
      );
      setActiveData(activeArr);
      setInactiveData(inactiveArr);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handleOpen("left", "bottom", "Something went wrong!");
      console.log(err);
    }
  }, [url]);

  useEffect(() => {
    getUserData();
    return () => {
      setActiveData([]);
      setInactiveData([]);
    };
  }, [getUserData]);

  const handleSave = () => {
    console.log(formState);
    handleModalClose();
  };

  const formatData = (data: args, isActive: boolean): retVal => {
    return data.map((item) => ({
      user_email: item.user_email,
      group_name: item.groups.group_name,
      customer_count: item.customer_count,
      site_count: item.site_count,
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
                item.user_id,
                item,
                setLoading,
                url + "/disiable-user",
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
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
      handleModalOpen={handleModalOpen}
      modalTop="20%"
      modalWidth="60%"
      modalTitle={title}
    >
      <AddUser
        formState={formState}
        setFormState={setFormState}
        handleSave={handleSave}
      />
    </Functionalities>
  );
};

export default AllUsers;

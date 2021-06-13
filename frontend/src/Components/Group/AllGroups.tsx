import React, { useCallback, useEffect, useState } from "react";
import { rows, Group } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { Alert } from "../../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import ButtonComp from "../../Shared/Buttons";
import { columns } from "./Util/Columns";
import Functionalities, { args, retVal } from "../Main/Functionalities";
import { handleSwitchChange } from "../../Utilities/Helpers/handleSwitchChange";
// import { Typography } from "@material-ui/core";
import AddGroup from "./AddGroup";

export interface FormState {
  group_name: string;
  integrator_id: string;
}

type title = "ADD NEW GROUP" | "EDIT GROUP";

const AllGroups: React.FC = () => {
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

  const url = process.env.REACT_APP_API_URL + "groups";

  const [loading, setLoading] = useState<boolean>(true);

  const [acticveData, setActiveData] = useState<Group[]>([]);
  const [inacticveData, setInactiveData] = useState<Group[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [formState, setFormState] = useState<FormState>({
    group_name: "",
    integrator_id: "084c16fc-2b4d-4d2b-a335-7f7bc618d345",
  });

  const [title, setTitle] = useState<title>("ADD NEW GROUP");

  const handleModalOpen = (): void => {
    setFormState({ ...formState, group_name: "" });
    setTitle("ADD NEW GROUP");
    setModalOpen(true);
  };
  const handleEditModalOpen = (item: Group): void => {
    setFormState({ ...formState, group_name: item.group_name });
    setTitle("EDIT GROUP");
    setModalOpen(true);
  };
  const handleModalClose = (): void => {
    setModalOpen(false);
    setTitle("ADD NEW GROUP");
  };

  const getGroupData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ groups: Group[] }> = await axios.get(url);
      // console.log(response.data);

      const activeArr = response.data.groups.filter(
        (item) => item.is_disabled === false
      );
      const inactiveArr = response.data.groups.filter(
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
    getGroupData();
    return () => {
      setActiveData([]);
      setInactiveData([]);
    };
  }, [getGroupData]);

  const handleSave = async (): Promise<void> => {
    handleModalClose();
    setLoading(true);
    if (title === "ADD NEW GROUP") {
      try {
        const response: AxiosResponse<any> = await axios.post(
          url + "/add-group",
          formState
        );
        if (response.status === 201) {
          getGroupData();
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        handleOpen("left", "bottom", "Something went wrong!");
      }
    } else {
      console.log("Update pending...");
    }
  };

  const formatData = (data: args, isActive: boolean): retVal => {
    return data.map((item) => ({
      group_name: item.group_name,
      user_count: item.user_count,
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
                String(item.id),
                item,
                setLoading,
                url,
                getGroupData,
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
      title="Groups"
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
      handleModalOpen={handleModalOpen}
      modalTop="20%"
      modalWidth="60%"
      modalTitle={title}
    >
      <AddGroup
        formState={formState}
        setFormState={setFormState}
        handleSave={handleSave}
      />
    </Functionalities>
  );
};

export default AllGroups;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Camera, rows } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { Alert } from "../../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import ButtonComp from "../../Shared/Buttons";
import { columns } from "./Util/Columns";
import CopyAble from "../../Shared/CopyAble";
import Functionalities, { args, retVal } from "../Main/Functionalities";
import { handleSwitchChange } from "../../Utilities/Helpers/handleSwitchChange";
import AddCamera from "./AddCamera";

type title = "ADD NEW CAMERA" | "EDIT CAMERA";

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

  const url = process.env.REACT_APP_API_URL + "cameras";

  const [loading, setLoading] = useState<boolean>(true);

  const [activedata, setActiveData] = useState<Camera[]>([]);
  const [inactivedata, setInctiveData] = useState<Camera[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<title>("ADD NEW CAMERA");
  const [updateId, setUpdateId] = useState<string>("");
  const [action, setAction] = useState<"ADD" | "EDIT">("ADD");
  const [item, setItem] = useState<Camera | null>(null);

  const handleModalOpen = (): void => {
    setTitle("ADD NEW CAMERA");
    setAction("ADD");
    setItem(null);
    setUpdateId("");
    setModalOpen(true);
  };
  const handleEditModalOpen = (item: Camera): void => {
    setTitle("EDIT CAMERA");
    setAction("EDIT");
    setItem(item);
    setUpdateId(item.camera_id);
    setModalOpen(true);
  };
  const handleModalClose = (): void => {
    setModalOpen(false);
    setTitle("ADD NEW CAMERA");
  };

  const getCameraData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ cameras: Camera[] }> = await axios.get(
        url
      );
      let activeArr = response.data.cameras.filter(
        (item) => item.is_disabled === false
      );
      let inactiveArr = response.data.cameras.filter(
        (item) => item.is_disabled === true
      );
      setActiveData(activeArr);
      setInctiveData(inactiveArr);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handleOpen("left", "bottom", "Something went wrong!");
    }
  }, [url]);

  useEffect(() => {
    getCameraData();
    return () => {
      setActiveData([]);
      setInctiveData([]);
    };
  }, [getCameraData]);

  const formatData = (data: args, isActive: boolean): retVal => {
    return data.map((item) => ({
      name: item.camera_name,
      ip_address: item.ip_address,
      smtp_username: (
        <CopyAble text={item.smtp_user_name} handleOpen={handleOpen} />
      ),
      smtp_password: (
        <CopyAble text={item.smtp_password} handleOpen={handleOpen} />
      ),
      site: item.sites?.site_name,
      customer: item.customer,
      total_requests: item.total_request,
      group_name: item.groups.group_name,
      user_count: item.users.length,
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
                item.camera_id,
                item,
                setLoading,
                url + "/disable-camera",
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

  const addCamera = useMemo(
    () => (
      <AddCamera
        action={action}
        getCameraData={getCameraData}
        handleModalClose={handleModalClose}
        handleOpen={handleOpen}
        item={item}
        setLoading={setLoading}
        updateId={updateId}
        url={url}
      />
    ),
    [action, getCameraData, item, updateId, url]
  );

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
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
      handleModalOpen={handleModalOpen}
      modalTop="20%"
      modalWidth="60%"
      modalTitle={title}
    >
      {addCamera}
    </Functionalities>
  );
};

export default AllCameras;

import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Camera, rows, xlsxCamera } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { Alert } from "../../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import ButtonComp from "../../Shared/Buttons";
import { columns } from "./Util/Columns";
import CopyAble from "../../Shared/CopyAble";
import Functionalities, { args, retVal } from "../Main/Functionalities";
import { handleSwitchChange } from "../../Utilities/Helpers/handleSwitchChange";
import AddCamera from "./AddCamera";
import { AuthContext } from "../../Context/Auth";

type title = "ADD NEW CAMERA" | "EDIT CAMERA";

const AllCameras: React.FC = () => {
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

  const url = process.env.REACT_APP_API_URL + "cameras";

  const [loading, setLoading] = useState<boolean>(true);

  const [wholeData, setWholeData] = useState<Camera[]>([]);
  const [activedata, setActiveData] = useState<Camera[]>([]);
  const [inactivedata, setInctiveData] = useState<Camera[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<title>("ADD NEW CAMERA");
  const [updateId, setUpdateId] = useState<string>("");
  const [action, setAction] = useState<"ADD" | "EDIT">("ADD");
  const [item, setItem] = useState<Camera | null>(null);
  const { isSuperAdmin, userId } = useContext(AuthContext)

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
      let cameras: Camera[] = []
      if(!isSuperAdmin){
        cameras = response.data.cameras.filter(camera => camera.integrators.integrator_id === userId)
      }else{
        cameras = response.data.cameras
      }
      setWholeData(cameras);
      let activeArr = cameras.filter(
        (item) => item.is_disabled === false
      );
      let inactiveArr = cameras.filter(
        (item) => item.is_disabled === true
      );
      setActiveData(activeArr);
      setInctiveData(inactiveArr);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handleOpen("left", "bottom", "Something went wrong!");
    }
  }, [isSuperAdmin, url, userId]);

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
      change_name: item.change_name ? item.change_name : "",
      ip_address: item.ip_address,
      smtp_username: (
        <CopyAble text={item.smtp_user_name} handleOpen={handleOpen} />
      ),
      smtp_password: (
        <CopyAble text={item.smtp_password} handleOpen={handleOpen} />
      ),
      site: item.sites ? item.sites.site_name : "NO SITE ASSIGNED",
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

  const getXLSXData = (): xlsxCamera[] => {
    return wholeData.map((camera) => ({
      "Camera ID": camera.camera_id,
      "Camera Name": camera.camera_name,
      "Changed Name": camera.change_name ? camera.change_name : "",
      "IP Address": camera.ip_address,
      "SMTP Username": camera.smtp_password,
      "SMTP Password": camera.smtp_password,
      "Number of Users": camera.user_count,
      "Total Requests": camera.total_request,
      Group: camera.groups.group_name,
      Site: camera.sites ? camera.sites.site_name : "NO SITE ASSIGNED",
      Disabled: camera.is_disabled,
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
      wholeData={getXLSXData()}
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

import React, { useCallback, useEffect, useMemo, useState, useContext } from "react";
import { rows, Group, xlsxGroup } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { Alert } from "../../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import ButtonComp from "../../Shared/Buttons";
import { columns } from "./Util/Columns";
import Functionalities, { args, retVal } from "../Main/Functionalities";
import { handleSwitchChange } from "../../Utilities/Helpers/handleSwitchChange";
import AddGroup from "./AddGroup";
import { AuthContext } from "../../Context/Auth";

type title = "ADD NEW GROUP" | "EDIT GROUP";

const AllGroups: React.FC = () => {

  const { isSuperAdmin, userId } = useContext(AuthContext)

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

  const [wholeData, setWholeData] = useState<Group[]>([]);
  const [acticveData, setActiveData] = useState<Group[]>([]);
  const [inacticveData, setInactiveData] = useState<Group[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<title>("ADD NEW GROUP");
  const [updateId, setUpdateId] = useState<string>("");
  const [action, setAction] = useState<"ADD" | "EDIT">("ADD");
  const [item, setItem] = useState<Group | null>(null);

  const handleModalOpen = (): void => {
    setTitle("ADD NEW GROUP");
    setAction("ADD");
    setItem(null);
    setUpdateId("");
    setModalOpen(true);
  };
  const handleEditModalOpen = (item: Group): void => {
    setTitle("EDIT GROUP");
    setAction("EDIT");
    setItem(item);
    setUpdateId(item.group_id);
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

      let groups: Group[] = []

      if(!isSuperAdmin){
        groups = response.data.groups.filter(group => group.integrators.integrator_id === userId)
      }else{
        groups = response.data.groups
      }

      setWholeData(groups)
      const activeArr = groups.filter(
        (item) => item.is_disabled === false
      );
      const inactiveArr = groups.filter(
        (item) => item.is_disabled === true
      );
      setActiveData(activeArr);
      setInactiveData(inactiveArr);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handleOpen("left", "bottom", "Something went wrong!");
    }
  }, [isSuperAdmin, url, userId]);

  useEffect(() => {
    getGroupData();
    return () => {
      setActiveData([]);
      setInactiveData([]);
    };
  }, [getGroupData]);

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
                item.group_id,
                item,
                setLoading,
                url + "/disable-group",
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

  const getXLSXData = (): xlsxGroup[] => {
    return wholeData.map(group => ({
      "Group ID": group.group_id,
      "Group Name": group.group_name,
      "Number of Users": group.user_count,
      "Number of Customers": group.customer_count,
      "Number of Sites": group.site_count,
      "Number of Cameras": group.camera_count,
      Disabled: group.is_disabled
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

  const addGroups = useMemo(
    () => (
      <AddGroup
        action={action}
        getGroupData={getGroupData}
        handleModalClose={handleModalClose}
        handleOpen={handleOpen}
        item={item}
        setLoading={setLoading}
        updateId={updateId}
        url={url}
      />
    ),
    [action, getGroupData, item, updateId, url]
  );

  return (
    <Functionalities
      alertDetails={alertDetails}
      columns={columns}
      activeData={acticveData}
      inactiveData={inacticveData}
      wholeData={getXLSXData()}
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
      {addGroups}
    </Functionalities>
  );
};

export default AllGroups;

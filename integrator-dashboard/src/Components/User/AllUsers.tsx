import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { rows, User, xlsxUser } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { Alert } from "../../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import ButtonComp from "../../Shared/Buttons";
import { columns } from "./Util/Columns";
import Functionalities, { args, retVal } from "../Main/Functionalities";
import { handleSwitchChange } from "../../Utilities/Helpers/handleSwitchChange";
import AddUser from "./AddUser";
import { AuthContext } from "../../Context/Auth";

type title = "ADD NEW USER" | "EDIT USER";

const AllUsers: React.FC = () => {
  let { isSuperAdmin, userId } = useContext(AuthContext);

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

  const url = process.env.REACT_APP_API_URL + "users";

  const [loading, setLoading] = useState<boolean>(true);

  const [wholeData, setWholeData] = useState<User[]>([]);
  const [activeData, setActiveData] = useState<User[]>([]);
  const [inactiveData, setInactiveData] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<title>("ADD NEW USER");
  const [updateId, setUpdateId] = useState<string>("");
  const [action, setAction] = useState<"ADD" | "EDIT">("ADD");
  const [item, setItem] = useState<User | null>(null);

  const handleModalOpen = (): void => {
    setTitle("ADD NEW USER");
    setAction("ADD");
    setItem(null);
    setUpdateId("");
    setModalOpen(true);
  };
  const handleEditModalOpen = (item: User): void => {
    setTitle("EDIT USER");
    setAction("EDIT");
    setItem(item);
    setUpdateId(item.user_id);
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
      let users: User[] = [];
      if (!isSuperAdmin) {
        users = response.data.users.filter(
          (user) => user.integrators.integrator_id === userId
        );
      } else {
        users = response.data.users;
      }
      const activeArr = users.filter(
        (item) => item.is_disabled === false
      );
      const inactiveArr = users.filter(
        (item) => item.is_disabled === true
      );
      setWholeData(users);
      setActiveData(activeArr);
      setInactiveData(inactiveArr);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handleOpen("left", "bottom", "Something went wrong!");
      console.log(err);
    }
  }, [isSuperAdmin, url, userId]);

  useEffect(() => {
    getUserData();
    return () => {
      setActiveData([]);
      setInactiveData([]);
    };
  }, [getUserData]);

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
                url + "/disable-user",
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

  const getXLSXData = (): xlsxUser[] => {
    return wholeData.map((user) => ({
      "User ID": user.user_id,
      Email: user.user_email,
      "Group Name": user.groups.group_name,
      "Number of Customers": user.customer_count,
      "Number of Sites": user.site_count,
      "Number of Cameras": user.camera_count,
      Disabled: user.is_disabled,
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

  const addUsers = useMemo(
    () => (
      <AddUser
        action={action}
        getUserData={getUserData}
        handleModalClose={handleModalClose}
        handleOpen={handleOpen}
        item={item}
        setLoading={setLoading}
        updateId={updateId}
        url={url}
      />
    ),
    [action, getUserData, item, updateId, url]
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
      title="Users"
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
      handleModalOpen={handleModalOpen}
      modalTop="20%"
      modalWidth="60%"
      modalTitle={title}
    >
      {addUsers}
    </Functionalities>
  );
};

export default AllUsers;

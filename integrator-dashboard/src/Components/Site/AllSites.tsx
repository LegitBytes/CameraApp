import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Site, rows, xlsxSites } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { Alert } from "../../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import ButtonComp from "../../Shared/Buttons";
import { columns } from "./Util/Columns";
import Functionalities, { args, retVal } from "../Main/Functionalities";
import { handleSwitchChange } from "../../Utilities/Helpers/handleSwitchChange";
import AddSite from "./AddSite";
import { AuthContext } from "../../Context/Auth";

type title = "ADD NEW SITE" | "EDIT SITE";

const AllSites: React.FC = () => {
  const { isSuperAdmin, userId } = useContext(AuthContext);

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

  const url = process.env.REACT_APP_API_URL + "sites";

  const [loading, setLoading] = useState<boolean>(true);

  const [wholeData, setWholeData] = useState<Site[]>([]);
  const [activeData, setActiveData] = useState<Site[]>([]);
  const [inactiveData, setInactiveData] = useState<Site[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<title>("ADD NEW SITE");
  const [updateId, setUpdateId] = useState<string>("");
  const [action, setAction] = useState<"ADD" | "EDIT">("ADD");
  const [item, setItem] = useState<Site | null>(null);

  const handleModalOpen = (): void => {
    setTitle("ADD NEW SITE");
    setAction("ADD");
    setItem(null);
    setUpdateId("");
    setModalOpen(true);
  };
  const handleEditModalOpen = (item: Site): void => {
    setTitle("EDIT SITE");
    setAction("EDIT");
    setItem(item);
    setUpdateId(item.site_id);
    setModalOpen(true);
  };
  const handleModalClose = (): void => {
    setModalOpen(false);
    setTitle("ADD NEW SITE");
  };

  const getSiteData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ sites: Site[] }> = await axios.get(url);

      let sites: Site[] = []
      if(!isSuperAdmin){
        sites = response.data.sites.filter(site => site.integrators.integrator_id === userId)
      }else{
        sites = response.data.sites
      }

      const activeArr = sites.filter(
        (item) => item.is_disabled === false
      );
      const inactiveArr = sites.filter(
        (item) => item.is_disabled === true
      );
      setWholeData(sites);
      setActiveData(activeArr);
      setInactiveData(inactiveArr);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      handleOpen("left", "bottom", "Something went wrong!");
    }
  }, [isSuperAdmin, url, userId]);

  useEffect(() => {
    getSiteData();
    return () => {
      setActiveData([]);
      setInactiveData([]);
    };
  }, [getSiteData]);

  const formatData = (data: args, isActive: boolean): retVal => {
    return data.map((item) => ({
      name: item.site_name,
      change_name: item.change_name ? item.change_name : "",
      group_name: item.groups.group_name,
      user_count: item.users.length,
      customer_count: item.customers.length,
      camera_count: item.cameras.length,
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
                item.site_id,
                item,
                setLoading,
                url + "/disable-site",
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

  const getXLSXData = (): xlsxSites[] => {
    return wholeData.map((site) => ({
      "Site ID": site.site_id,
      "Site Name": site.site_name,
      "Changed Name": site.change_name? site.change_name : "",
      "Group Name": site.groups.group_name,
      "Number of Cameras": site.cameras.length,
      "Number of Customers": site.customers.length,
      "Number of Users": site.users.length,
      Disabled: site.is_disabled,
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

  const addSite = useMemo(
    () => (
      <AddSite
        action={action}
        getSiteData={getSiteData}
        handleModalClose={handleModalClose}
        handleOpen={handleOpen}
        item={item}
        setLoading={setLoading}
        updateId={updateId}
        url={url}
      />
    ),
    [action, getSiteData, item, updateId, url]
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
      title="Sites"
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
      handleModalOpen={handleModalOpen}
      modalTop="20%"
      modalWidth="60%"
      modalTitle={title}
    >
      {addSite}
    </Functionalities>
  );
};

export default AllSites;

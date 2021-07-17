import React, { useCallback, useEffect, useMemo, useState } from "react";
import { rows, Integrator, xlsxIntegrator } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { Alert } from "../../Shared/Interfaces";
import { TransitionLeft, TransitionProps } from "../../Shared/Slides";
import ButtonComp from "../../Shared/Buttons";
import { columns } from "./Util/Columns";
import Functionalities, { args, retVal } from "../Main/Functionalities";
import { handleSwitchChange } from "../../Utilities/Helpers/handleSwitchChange";
import AddIntegrator from "./AddIntegrator";

type title = "ADD NEW INTEGRATOR" | "EDIT INTEGRATOR";

const AllIntegrators: React.FC = () => {
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

  const url = process.env.REACT_APP_API_URL + "integrators";

  const [loading, setLoading] = useState<boolean>(true);

  const [wholeData, setWholeData] = useState<Integrator[]>([]);
  const [acticveData, setActiveData] = useState<Integrator[]>([]);
  const [inacticveData, setInactiveData] = useState<Integrator[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<title>("ADD NEW INTEGRATOR");
  const [updateId, setUpdateId] = useState<string>("");
  const [action, setAction] = useState<"ADD" | "EDIT">("ADD");
  const [item, setItem] = useState<Integrator | null>(null);

  const handleModalOpen = (): void => {
    setTitle("ADD NEW INTEGRATOR");
    setAction("ADD");
    setItem(null);
    setUpdateId("");
    setModalOpen(true);
  };
  const handleEditModalOpen = (item: Integrator): void => {
    setTitle("EDIT INTEGRATOR");
    setAction("EDIT");
    setItem(item);
    setUpdateId(item.integrator_id);
    setModalOpen(true);
  };
  const handleModalClose = (): void => {
    setModalOpen(false);
    setTitle("ADD NEW INTEGRATOR");
  };

  const getIntegratorData = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ integrators: Integrator[] }> = await axios.get(url);
      // console.log(response.data);
      setWholeData(response.data.integrators)
      const activeArr = response.data.integrators.filter(
        (item) => item.is_disabled === false
      );
      const inactiveArr = response.data.integrators.filter(
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
    getIntegratorData();
    return () => {
      setActiveData([]);
      setInactiveData([]);
    };
  }, [getIntegratorData]);

  const formatData = (data: args, isActive: boolean): retVal => {
    return data.map((item) => ({
      name: item.name,
      email: item.email,
      phone: item.phone,
      group_count: item.group_count,
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
                item.integrator_id,
                item,
                setLoading,
                url + "/disable-integrator",
                getIntegratorData,
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

  const getXLSXData = (): xlsxIntegrator[] => {
    return wholeData.map(integrator => ({
      "Integrator ID": integrator.integrator_id,
      Email: integrator.email,
      Phone: integrator.phone,
      "Number of Groups": integrator.group_count,
      "Number of Users": integrator.user_count,
      "Number of Customers": integrator.customer_count,
      "Number of Sites": integrator.site_count,
      "Number of Cameras": integrator.camera_count,
      Disabled: integrator.is_disabled
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

  const addIntegrator = useMemo(
    () => (
      <AddIntegrator
        action={action}
        getIntegratorData={getIntegratorData}
        handleModalClose={handleModalClose}
        handleOpen={handleOpen}
        item={item}
        setLoading={setLoading}
        updateId={updateId}
        url={url}
      />
    ),
    [action, getIntegratorData, item, updateId, url]
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
      title="Integrators"
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
      handleModalOpen={handleModalOpen}
      modalTop="20%"
      modalWidth="60%"
      modalTitle={title}
    >
      {addIntegrator}
    </Functionalities>
  );
};

export default AllIntegrators;

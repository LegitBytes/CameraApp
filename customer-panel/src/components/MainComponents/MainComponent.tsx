import { Grid } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState, useContext } from "react";
import LoadingScreen from "../../shared/LoadingScreen";
import { customer, user } from "../interfaces";
import { AuthContext } from "../../context/Auth"
import Tile from "./Tile";
interface MainComponentProps {
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
}

const MainComponent: React.FC<MainComponentProps> = ({ handleOpen }) => {
  const [loading, setLoading] = useState<boolean>(false);
  // const temporaryUser = "6029f127-d062-4ad3-9622-f55bf99e7ee8";
  const { userId } = useContext(AuthContext)
  const [customerDetails, setCustomerDetails] = useState<customer[]>([]);
  const getCustomerDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res: AxiosResponse<{ user: user }> = await axios.get(
        process.env.REACT_APP_API_URL + "users/" + userId
      );
      setCustomerDetails(res.data.user.customers);
      setLoading(false);
    } catch (err) {
      console.log(err);
      handleOpen(
        "left",
        "bottom",
        "Something went wrong! Cameras could not be fetched!"
      );
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCustomerDetails();
    return () => {
      setCustomerDetails([]);
    };
  }, [getCustomerDetails]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <Grid container direction="row" spacing={2}>
      {customerDetails.map((customer) =>
        customer.sites.map((site) =>
          site.cameras.map((camera) => (
            <Tile
              key={camera.camera_id}
              smtp_user_name={camera.smtp_user_name}
              camera={camera.change_name?camera.change_name:camera.camera_name}
              customer={customer.change_name?customer.change_name:customer.customer_name}
              site={site.change_name?site.change_name: site.site_name}
            />
          ))
        )
      )}
    </Grid>
  );
};

export default MainComponent;

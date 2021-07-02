import React, { useEffect, useCallback, useState } from "react";
import LoadingScreen from "../../shared/LoadingScreen";
import axios, { AxiosResponse } from "axios";
import { customer, site, user, camera } from "../interfaces";
import StyledTreeItem from "../../shared/StyledTreeItem";
import { TreeView } from "@material-ui/lab";
import { ChevronLeft, ExpandMore } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

interface MainDrawerProp {
  classes: ClassNameMap<"tvRoot">;
}

const MainDrawer: React.FC<MainDrawerProp> = ({ classes }) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const temporaryUser = "6029f127-d062-4ad3-9622-f55bf99e7ee8";
  const [customerDetails, setCustomerDetails] = useState<customer[]>([]);
  const getCustomerDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res: AxiosResponse<{ user: user }> = await axios.get(
        process.env.REACT_APP_API_URL + "users/" + temporaryUser
      );
      console.log("This is customers -> ", res.data.user.customers);
      setCustomerDetails(res.data.user.customers);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCustomerDetails();
    // history.push(
    //   `/main/${customerDetails[0]?.customer_name}/${customerDetails[0]?.sites[0]?.site_name}/${customerDetails[0]?.sites[0]?.cameras[0]?.camera_name}-${customerDetails[0]?.sites[0]?.cameras[0]?.smtp_user_name}`
    // );
    return () => {
      setCustomerDetails([]);
    };
  }, [getCustomerDetails]);
  const [expanded, setExpanded] = React.useState([]); 

  const handleChange = (event: any, nodes: any) => {
    setExpanded(nodes);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen white />
      ) : (
        <>
          <TreeView
            className={classes.tvRoot}
            defaultCollapseIcon={<ExpandMore style={{ color: "#fff" }} />}
            defaultExpandIcon={<ChevronLeft style={{ color: "#fff" }} />}
            expanded={expanded}
            onNodeToggle={handleChange}
          >
            {customerDetails.map((customer: customer) => (
              <StyledTreeItem
                labelText={customer.customer_name}
                nodeId={customer.customer_id}
                key={customer.customer_id}
              >
                {customer.sites.map((site: site) => (
                  <StyledTreeItem
                    labelText={site.site_name}
                    nodeId={site.site_id}
                    key={site.site_id}
                  >
                    {site.cameras.map((camera: camera) => (
                      <StyledTreeItem
                        labelText={camera.camera_name}
                        nodeId={camera.camera_name}
                        key={camera.camera_name}
                        onClick={() =>
                          history.push(
                            `/main/${customer.customer_name}/${site.site_name}/${camera.camera_name}-${camera.smtp_user_name}`
                          )
                        }
                      />
                    ))}
                  </StyledTreeItem>
                ))}
              </StyledTreeItem>
            ))}
          </TreeView>
        </>
      )}
    </>
  );
};

export default MainDrawer;

import React, { useEffect, useCallback, useState } from "react";
import LoadingScreen from "../../shared/LoadingScreen";
import axios, { AxiosResponse } from "axios";
import { customer, site, user, camera } from "../interfaces";
import StyledTreeItem from "../../shared/StyledTreeItem";
import { TreeView } from "@material-ui/lab";
import { ChevronLeft, ExpandMore } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { ChangeEvent } from "react";

interface MainDrawerProp {
  classes: ClassNameMap<"tvRoot" | "inputStyles">;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
}

const MainDrawer: React.FC<MainDrawerProp> = ({ classes, handleOpen }) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const temporaryUser = "6029f127-d062-4ad3-9622-f55bf99e7ee8";
  const [customerDetails, setCustomerDetails] = useState<customer[]>([]);
  const [filteredCustomerDetails, setFilteredCustomerDetails] = useState<
    customer[]
  >([]);
  const getCustomerDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res: AxiosResponse<{ user: user }> = await axios.get(
        process.env.REACT_APP_API_URL + "users/" + temporaryUser
      );
      setCustomerDetails(res.data.user.customers);
      setFilteredCustomerDetails(res.data.user.customers);
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
  const [expanded, setExpanded] = React.useState([]);

  const handleChange = (event: any, nodes: any) => {
    setExpanded(nodes);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    value= value.toLowerCase()
    let arr: customer[] = [];
    arr = customerDetails.filter((item) => item.customer_name.toLowerCase().includes(value));
    if (arr.length === 0) {
      arr = customerDetails.filter((customer) => {
        let crr = customer.sites.filter((site) =>
          site.site_name.toLowerCase().includes(value)
        );
        return !!crr.length ? true : false;
      });
    }
    if (arr.length === 0) {
      arr = customerDetails.filter((customer) => {
        let drr = customer.sites.filter((site) => {
          let frr = site.cameras.filter((camera) =>
            camera.camera_name.toLowerCase().includes(value)
          );
          return !!frr.length ? true : false;
        });
        return !!drr.length ? true : false;
      });
    }

    if (arr.length === 0) {
      setFilteredCustomerDetails(customerDetails);
    } else {
      setFilteredCustomerDetails(arr);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen white />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <input className={classes.inputStyles} onChange={onChange} placeholder="Filter for Customer / Site / Camera"/>
          </div>
          <TreeView
            className={classes.tvRoot}
            defaultCollapseIcon={<ExpandMore style={{ color: "#fff" }} />}
            defaultExpandIcon={<ChevronLeft style={{ color: "#fff" }} />}
            expanded={expanded}
            onNodeToggle={handleChange}
          >
            {filteredCustomerDetails.map((customer: customer) => (
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

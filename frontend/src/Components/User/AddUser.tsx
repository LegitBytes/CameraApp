import React, { useState, useCallback, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  Chip,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { FormState } from "./AllUsers";
// import { setter } from "../../Utilities/Helpers/setter";
import ButtonComp from "../../Shared/Buttons";
import { Customer, Group } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import LoadingScreen from "../../Shared/LoadingScreen";

interface AddUserProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  handleSave: () => void;
}

const AddUser: React.FC<AddUserProps> = ({
  formState,
  setFormState,
  handleSave,
}) => {
  const onChange = (e) => {
    let { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSelectChange = (e) => {
    let { name, value } = e.target;
    let arr = formState[name];
    let exists = arr.find((item) => item === value);
    if (exists) {
      return;
    }
    arr = [...arr, value];
    setFormState({ ...formState, [name]: arr });
  };

  const [loading1, setLoading1] = useState<boolean>(false);

  const [groupData, setGroupData] = useState<Group[]>([]);

  const getGroupData = useCallback(async (): Promise<void> => {
    setLoading1(true);
    try {
      const response: AxiosResponse<{ groups: Group[] }> = await axios.get(
        process.env.REACT_APP_API_URL + "groups"
      );
      // console.log(response.data);

      const activeArr = response.data.groups.filter(
        (item) => item.is_disabled === false
      );
      setGroupData(activeArr);
      setLoading1(false);
    } catch (err) {
      setLoading1(false);
    }
  }, []);

  const [loading2, setLoading2] = useState<boolean>(false);

  const [customerData, setCustomerData] = useState<Customer[]>([]);

  const getCustomerData = useCallback(async (): Promise<void> => {
    setLoading2(true);
    try {
      const response: AxiosResponse<{ customers: Customer[] }> =
        await axios.get(process.env.REACT_APP_API_URL + "customers");
      console.log(response.data);

      //   const activeArr = response.data.customers.filter(
      //     (item) => item.is_disabled === false
      //   );
      //   setCustomerData(activeArr);

      setCustomerData(response.data.customers);

      setLoading2(false);
    } catch (err) {
      setLoading2(false);
    }
  }, []);

  const getCustomerLabel = (id) => {
    const item = customerData.find((customer) => customer.customer_id === id);
    return item?.customer_name;
  };

  const handleDeleteCustomerId = (id) => {
    const i = formState.customer_ids.findIndex((item) => item === id);
    const newArr = formState.customer_ids;
    newArr.splice(i, 1);
    setFormState({ ...formState, customer_ids: newArr });
  };

  useEffect(() => {
    getGroupData();
    getCustomerData();
    return () => {
      setGroupData([]);
      setCustomerData([]);
    };
  }, [getGroupData, getCustomerData]);

  if (loading1 || loading2) {
    return (
      <div style={{ marginTop: 100 }}>
        <LoadingScreen />
      </div>
    );
  } else
    return (
      <Grid container direction="row" spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6">
            <label htmlFor="user_email">Email:</label>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="user_email"
            id="user_email"
            type="text"
            onChange={onChange}
            // size="small"
            variant="outlined"
            fullWidth={true}
            value={formState.user_email}
          />
        </Grid>

        {/* <Grid item xs={false} sm={2} /> */}

        <Grid item xs={12}>
          <Typography variant="h6">
            <label htmlFor="group_id">Group:</label>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Select
            variant="outlined"
            fullWidth={true}
            name="group_id"
            onChange={onChange}
            value={formState.group_id}
            id="group_id"
          >
            {groupData.map((item) => (
              <MenuItem key={item.group_id} value={item.group_id}>
                {item.group_name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">
            <label htmlFor="customer_ids">Customers:</label>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Select
            variant="outlined"
            fullWidth={true}
            name="customer_ids"
            onChange={onSelectChange}
            value="none"
            id="customer_ids"
          >
            <MenuItem value="none" disabled>
              ADD NEW CUSTOMER
            </MenuItem>

            {customerData.map((item) => (
              <MenuItem key={item.customer_id} value={item.customer_id}>
                {item.customer_name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12}>
          {formState.customer_ids.map((id) => (
            <Chip
              label={getCustomerLabel(id)}
              key={id}
              onDelete={() => handleDeleteCustomerId(id)}
              variant="outlined"
              style={{
                color: "#007BFF",
                border: "1px solid #007BFF",
                margin: 5,
              }}
              deleteIcon={<Delete style={{ color: "#007BFF" }} />}
            />
          ))}
        </Grid>

        

        <Grid item xs={false} sm={4} />
        <Grid item xs={12} sm={4} style={{ marginTop: 20 }}>
          <ButtonComp
            onClick={handleSave}
            type="primary"
            variant="contained"
            fullWidth={true}
          >
            Save
          </ButtonComp>
        </Grid>
        <Grid item xs={false} sm={4} />
      </Grid>
    );
};

export default AddUser;

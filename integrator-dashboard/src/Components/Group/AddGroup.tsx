import React, { useCallback, useState, useContext, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
} from "@material-ui/core";
// import { setter } from "../../Utilities/Helpers/setter";
import ButtonComp from "../../Shared/Buttons";
import { Group, Integrator } from "../Interfaces";
import axios, { AxiosResponse } from "axios";
import { AuthContext } from "../../Context/Auth";
import LoadingScreen from "../../Shared/LoadingScreen";

interface FormState {
  group_name: string | undefined;
  integrator_id: string | undefined;
}
interface FormError {
  group_name: boolean;
}

interface AddGroupProps {
  action: "ADD" | "EDIT";
  url: string;
  item: Group | null;
  handleModalClose: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getGroupData: () => void;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
  updateId: string;
}

const AddGroup: React.FC<AddGroupProps> = ({
  action,
  url,
  item,
  handleModalClose,
  setLoading,
  getGroupData,
  handleOpen,
  updateId,
}) => {
  const { userId, isSuperAdmin } = useContext(AuthContext);

  const initialState =
    action === "ADD"
      ? {
          group_name: "",
          integrator_id: !isSuperAdmin ? userId : "",
        }
      : {
          group_name: item?.group_name,
          integrator_id: isSuperAdmin
            ? item?.integrators.integrator_id
            : userId,
        };

  const [formState, setFormState] = useState<FormState>(initialState);

  const [formError, setFormError] = useState<FormError>({
    group_name: false,
  });

  const onChange:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    validateFormField(name, value);
  };

  const validateFormField = (name, value) => {
    //eslint-disable-next-line
    let regexp1 = /[~`!@#$%^&()_={}[\]:;,.<>+\/?-]/;
    let errors = { group_name: false };
    switch (name) {
      case "group_name":
        if (regexp1.test(value)) {
          errors.group_name = true;
        } else {
          errors.group_name = false;
        }
        break;
      default:
        break;
    }
    setFormError(errors);
  };

  const [loading1, setLoading1] = useState<boolean>(true);
  const [integrators, setIntegrators] = useState<Integrator[]>([]);

  const fetchAllIntegrators = useCallback(async () => {
    setLoading1(true);
    try {
      const response: AxiosResponse<{ integrators: Integrator[] }> =
        await axios.get(process.env.REACT_APP_API_URL + "integrators");
      setIntegrators(response.data.integrators);
      setLoading1(false);
    } catch (err) {
      setLoading1(false);
    }
  }, []);

  useEffect(() => {
    fetchAllIntegrators();
    return () => {
      setIntegrators([]);
    };
  }, [fetchAllIntegrators]);

  const onIntegratorChange = (e: any) => {
    setFormState({ ...formState, integrator_id: e.target.value });
  };

  const handleSave = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      handleModalClose();
      setLoading(true);
      if (action === "ADD") {
        try {
          const response: AxiosResponse<any> = await axios.post(
            url + "/add-group",
            formState
          );
          if (response.status === 201) {
            getGroupData();
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
          handleOpen("left", "bottom", "Something went wrong!");
        }
      } else {
        try {
          const response: AxiosResponse<any> = await axios.patch(
            url + "/" + updateId,
            formState
          );
          if (response.status === 200) {
            getGroupData();
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
          handleOpen("left", "bottom", "Something went wrong!");
        }
      }
    },
    [
      formState,
      getGroupData,
      updateId,
      url,
      action,
      handleModalClose,
      setLoading,
      handleOpen,
    ]
  );

  if (loading1) {
    return (
      <div style={{ marginTop: 100 }}>
        <LoadingScreen />
      </div>
    );
  } else {
    return (
      <form onSubmit={handleSave}>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">
              <label htmlFor="name">Name: <span style={{ color: "red" }}>*</span></label>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="group_name"
              id="name"
              type="text"
              onChange={onChange}
              // size="small"
              variant="outlined"
              fullWidth={true}
              value={formState.group_name}
              error={formError.group_name}
            />
            {formError.group_name && (
              <Typography variant="overline" style={{ color: "red" }}>
                Special characters are not allowed
              </Typography>
            )}
          </Grid>

          {isSuperAdmin && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <label htmlFor="integrator_id">
                    Integrator: <span style={{ color: "red" }}>*</span>
                  </label>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Select
                  variant="outlined"
                  fullWidth={true}
                  name="integrator_id"
                  onChange={onIntegratorChange}
                  value={formState.integrator_id}
                  id="integrator_id"
                >
                  {integrators.map((item) => (
                    <MenuItem
                      key={item.integrator_id}
                      value={item.integrator_id}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </>
          )}

          <Grid item xs={false} sm={4} />
          <Grid item xs={12} sm={4} style={{ marginTop: 20 }}>
            <ButtonComp
              // onClick={handleSave}
              htmlType="submit"
              type="primary"
              variant="contained"
              fullWidth={true}
              disabled={ formError.group_name || !formState["group_name"] || !formState.integrator_id}
            >
              Save
            </ButtonComp>
          </Grid>
          <Grid item xs={false} sm={4} />
        </Grid>
      </form>
    );
  }
};

export default AddGroup;

import axios, { AxiosResponse } from "axios";
import {
  Customer,
  Camera,
  Site,
  Group,
  User,
} from "../../Components/Interfaces";

export const handleSwitchChange = async (
  id: string,
  item: Customer | Camera | Site | Group | User,
  setLoading,
  url: string,
  getData: () => Promise<void>,
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void
): Promise<any> => {
  let body = {
    is_disabled: false,
  };
  if (item.is_disabled === false) {
    body.is_disabled = true;
  } else {
    body.is_disabled = false;
  }
  setLoading(true);
  try {
    const response: AxiosResponse<any> = await axios.patch(
      `${url}/${id}`,
      body
    );
    if (response.status === 200) {
      setLoading(false);
      getData();
    }
  } catch (err) {
    console.log(err);
    setLoading(false);
    handleOpen("left", "bottom", "Something went wrong!");
  }
};

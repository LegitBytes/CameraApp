import { Columns } from "../../Interfaces";

export const columns: Columns[] = [
  {
    name: "group_name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "user_count",
    label: "Users",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "customer_count",
    label: "Customers",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "site_count",
    label: "Sites",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "camera_count",
    label: "Cameras",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "actions",
    label: "Actions",
    options: {
      filter: false,
      sort: false,
    },
  },
];

import { Columns } from "../../Interfaces";

export const columns: Columns[] = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "group_name",
    label: "Group",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "number_of_users",
    label: "Users",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "number_of_customers",
    label: "Customers",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "number_of_cameras",
    label: "Cameras",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "status",
    label: "Status",
    options: {
      filter: false,
      sort: false,
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

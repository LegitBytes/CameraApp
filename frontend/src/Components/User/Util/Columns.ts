import { Columns } from "../../Interfaces";

export const columns: Columns[] = [
  {
    name: "email",
    label: "Email", 
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
    name: "number_of_customers",
    label: "Customers",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "number_of_sites",
    label: "Sites",
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
    name: "actions",
    label: "Actions",
    options: {
      filter: false,
      sort: false,
    },
  },
];

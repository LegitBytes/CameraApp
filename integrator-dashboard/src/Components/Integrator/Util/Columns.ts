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
    name: "email",
    label: "Email",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "phone",
    label: "Phone",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "group_count",
    label: "Groups",
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

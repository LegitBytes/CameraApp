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
    name: "number_of_users",
    label: "Users",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "number_of_locations",
    label: "Locations",
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

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
      name: "ip_address",
      label: "IP",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "smtp_username",
      label: "SMTP Username",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "smtp_password",
      label: "SMTP Password",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "site",
      label: "Site",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "location",
      label: "Location",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "total_requests",
      label: "Requests",
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
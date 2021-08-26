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
      name: "change_name",
      label: "Changed Name",
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
    // {
    //   name: "customer",
    //   label: "Customer",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
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
      name: "user_count",
      label: "Users",
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
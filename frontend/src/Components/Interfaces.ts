export type status = "active" | "inactive";

export interface Camera {
  id: number;
  name: string;
  ip_address: string;
  smtp_username: string;
  smtp_password: string;
  site: string;
  location: string;
  total_requests: number;
  group_name: number;
  number_of_users: number;
  status: status;
}

export interface Site {
  id: number;
  name: string;
  group_name: string;
  number_of_users: number;
  number_of_customers: number;
  number_of_cameras: number;
  status: status;
}

export interface Customer {
  id: number;
  name: string;
  group_name: string;
  number_of_users: number;
  number_of_sites: number;
  number_of_cameras: number;
  status: status;
}

export interface FormattedCamera {
  name: string;
  ip_address: string;
  smtp_username: JSX.Element;
  smtp_password: JSX.Element;
  site: string;
  location: string;
  total_requests: number;
  group_name: number;
  number_of_users: number;
  status: JSX.Element;
  actions: JSX.Element;
}

export interface FormattedSite {
  name: string;
  group_name: string;
  number_of_users: number;
  number_of_customers: number;
  number_of_cameras: number;
  status: JSX.Element;
  actions: JSX.Element;
}

export interface FormattedCustomer {
  name: string;
  group_name: string;
  number_of_users: number;
  number_of_sites: number;
  number_of_cameras: number;
  status: JSX.Element;
  actions: JSX.Element;
}

interface options {
  filter: boolean;
  sort: boolean;
}

export interface Columns {
  name: string;
  label: string;
  options?: options;
}

export interface rows {
  lookup: {
    [dataIndex: number]: boolean;
  };
  data: {
    index: number;
    dataIndex: number;
  }[];
}

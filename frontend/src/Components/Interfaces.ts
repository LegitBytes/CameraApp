export type is_disabled = true | false;
interface groups {
  group_name: string;
}
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
  user_count: number;
  is_disabled: is_disabled;
}

export interface Site {
  id: number;
  name: string;
  group_name: string;
  user_count: number;
  customer_count: number;
  camera_count: number;
  is_disabled: is_disabled;
}

export interface Customer {
  id: number;
  name: string;
  group_name: string;
  user_count: number;
  site_count: number;
  camera_count: number;
  is_disabled: is_disabled;
}

export interface User {
  id: number;
  user_email: string;
  groups: groups;
  customer_count: number;
  site_count: number;
  camera_count: number;
  is_disabled: is_disabled;
}

export interface Group {
  id: number;
  group_name: string;
  user_count: number;
  customer_count: number;
  site_count: number;
  camera_count: number;
  is_disabled: is_disabled;
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
  user_count: number;
  actions: JSX.Element;
}

export interface FormattedSite {
  name: string;
  group_name: string;
  user_count: number;
  customer_count: number;
  camera_count: number;
  actions: JSX.Element;
}

export interface FormattedCustomer {
  name: string;
  group_name: string;
  user_count: number;
  site_count: number;
  camera_count: number;
  actions: JSX.Element;
}

export interface FormattedUser {
  user_email: string;
  group_name: string;
  customer_count: number;
  site_count: number;
  camera_count: number;
  actions: JSX.Element;
}

export interface FormattedGroup {
  group_name: string;
  user_count: number;
  customer_count: number;
  site_count: number;
  camera_count: number;
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

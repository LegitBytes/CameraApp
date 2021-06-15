export type is_disabled = true | false;
interface groups {
  group_name: string;
  group_id: string;
}
interface sites {
  site_name: string;
  site_id: string;
}
interface integrators {
  integrator_id: string;
}
export interface Camera {
  camera_id: string;
  camera_name: string;
  ip_address: string;
  smtp_user_name: string;
  smtp_password: string;
  site: string;
  customer: string;
  total_request: number;
  groups: groups
  user_count: number;
  is_disabled: is_disabled;
  users: [],
  sites: sites
}

export interface Site {
  site_id: string;
  site_name: string;
  groups: groups;
  // user_count: number;
  // customer_count: number;
  // camera_count: number;
  users: []
  customers: []
  cameras: []
  is_disabled: is_disabled;
}

export interface Customer {
  customer_id: string;
  customer_name: string;
  groups: groups;
  // user_count: number;
  // site_count: number;
  // camera_count: number;
  is_disabled: is_disabled;
  sites: [];
  users: [];
}

export interface User {
  user_id: string;
  user_email: string;
  groups: groups;
  customer_count: number;
  site_count: number;
  camera_count: number;
  is_disabled: is_disabled;
  sites: [];
  cameras: [];
  customers: [];
}

export interface Group {
  group_id: string;
  group_name: string;
  integrators: integrators;
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
  customer: string;
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

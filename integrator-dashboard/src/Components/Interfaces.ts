export type is_disabled = true | false;
interface groups {
  group_name: string;
  group_id: string;
  integrators: integrators;
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
  total_request: number;
  groups: groups;
  user_count: number;
  is_disabled: is_disabled;
  users: [];
  sites: sites;
  deleteDisabled: boolean;
  integrators: integrators;
  change_name: string;
}

export interface Site {
  site_id: string;
  site_name: string;
  groups: groups;
  // user_count: number;
  // customer_count: number;
  // camera_count: number;
  users: [];
  customers: [];
  cameras: [];
  is_disabled: is_disabled;
  deleteDisabled: boolean;
  integrators: integrators;
  change_name: string;
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
  deleteDisabled: boolean;
  integrators: integrators;
  change_name: string;
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
  integrators: integrators;
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
  cameras: Camera[]
}

export interface Integrator {
  integrator_id: string;
  name: string;
  email: string;
  phone: string;
  is_disabled: boolean;
  group_count: number;
  user_count: number;
  customer_count: number;
  site_count: number;
  camera_count: number;
  cameras: Camera[]
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
  change_name: string;
}

export interface FormattedSite {
  name: string;
  group_name: string;
  user_count: number;
  customer_count: number;
  camera_count: number;
  actions: JSX.Element;
  change_name: string;
}

export interface FormattedCustomer {
  name: string;
  group_name: string;
  user_count: number;
  site_count: number;
  camera_count: number;
  actions: JSX.Element;
  change_name: string;
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

export interface FormattedIntegrator {
  name: string;
  email: string;
  phone: string;
  group_count: number;
  user_count: number;
  customer_count: number;
  site_count: number;
  camera_count: number;
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

export interface CameraStats {
  smtp_email: string;
  alert: number;
  request_count: number;
}

export interface SiteStats {
  site_name: string;
  alert: number;
  total_requests: number;
}
export interface GroupStats {
  group_name: string;
  alert: number;
  total_requests: number;
}
export interface IntegratorStats {
  name: string;
  alert: number;
  total_requests: number;
}

export interface xlsxSites {
  "Site ID": string;
  "Site Name": string;
  "Group Name": string;
  "Number of Users": number;
  "Number of Customers": number;
  "Number of Cameras": number;
  Disabled: boolean;
  "Changed Name": string;
}

export interface xlsxCamera {
  "Camera ID": string;
  "Camera Name": string;
  "IP Address": string;
  "SMTP Username": string;
  "SMTP Password": string;
  Site: string;
  Group: string;
  "Number of Users": number;
  "Total Requests": number;
  Disabled: boolean;
  "Changed Name": string;
}

export interface xlsxCustomer {
  "Customer ID": string;
  "Customer Name": string;
  "Number of Users": number;
  "Number of Sites": number;
  Disabled: boolean;
  "Changed Name": string;
}

export interface xlsxUser {
  "User ID": string;
  Email: string;
  "Group Name": string;
  "Number of Customers": number;
  "Number of Sites": number;
  "Number of Cameras": number;
  Disabled: boolean;
}

export interface xlsxGroup {
  "Group ID": string;
  "Group Name": string;
  "Number of Users": number;
  "Number of Customers": number;
  "Number of Sites": number;
  "Number of Cameras": number;
  Disabled: boolean;
}

export interface xlsxIntegrator {
  "Integrator ID": string;
  Email: string;
  Phone: string;
  Disabled: boolean;
  "Number of Groups": number;
  "Number of Users": number;
  "Number of Customers": number;
  "Number of Sites": number;
  "Number of Cameras": number;
}

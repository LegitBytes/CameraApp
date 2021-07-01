export interface camera {
  camera_id: string;
  smtp_user_name: string;
  camera_name: string;
}
export interface site {
  site_id: string;
  site_name: string;
  cameras: camera[];
}
export interface customer {
  customer_id: string;
  customer_name: string;
  sites: site[];
}
export interface user{
    user_id: string,
    user_email: string,
    customers: customer[]
}
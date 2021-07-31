export interface camera {
  camera_id: string;
  smtp_user_name: string;
  camera_name: string;
  change_name: null | string;
}
export interface site {
  site_id: string;
  site_name: string;
  change_name: null | string;
  cameras: camera[];
}
export interface customer {
  customer_id: string;
  customer_name: string;
  change_name: null | string;
  sites: site[];
}
export interface user {
  user_id: string;
  user_email: string;
  customers: customer[];
  sites: site[],
  cameras: camera[]
}

interface Label {
  Confidence: number;
  Name: string;
}

interface rekognitionData {
  [key: string]: {
    Labels: Label[];
  };
}

export interface cameraDetails {
  subject: string;
  toemail: string;
  alert?: boolean;
  timestamp: number;
  fromemail: string;
  HTMLbody: string;
  rekognitionData: rekognitionData[];
}

export interface alertUser {
  user_id: string;
  user_email: string;
  cameras: Array<{
    camera_id: string;
    smtp_user_name: string;
    camera_name: string;
    site_id: string;
  }>;
  sites: Array<{
    site_id: string;
    site_name: string;
  }>;
  camera_details: cameraDetails[][];
}

export type modalAction = "EDIT CUSTOMER" | "EDIT SITE" | "EDIT CAMERA" | "";

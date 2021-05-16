export interface GroupResponse {
  id: string;
  groupName: string;
  isDisabled: boolean;
  users?: UserResponse[];
}

export interface UserResponse {
  id: string;
  userEmail: string;
  isDisabled: boolean;
  customers: CustomerResponse[];
  sites: SiteResponse[];
  cameras: CameraResponse[];
}

export interface CustomerResponse {
  id: string;
  customerName: string;
  isDisabled: boolean;
}

export interface SiteResponse {
  id: string;
  siteName: string;
  isDisabled: boolean;
}

export interface CameraResponse {
  id: string;
  cameraName: string;
  isDisabled: boolean;
  totalRequest: number;
}

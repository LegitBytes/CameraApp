export interface CameraResponse {
  cameraId?: string;
  cameraAliases: string;
  cameraIp?: string;
  emailId: string;
  totalRequest: number;
  smtpUserName: string;
  smtpPassword: string;
  users?: UserResponse[];
  sites?: SiteResponse[];
  group?: GroupResponse;
  integrator?: IntegratorResponse;
}

export interface GroupResponse {
  id: string;
  groupName: string;
  isDisabled: boolean;
}

export interface IntegratorResponse {
  integratorId: string;
  integratorName: string;
  integratorEmail: string;
  phone: string;
}

export interface UserResponse {
  id: string;
  userEmail: string;
  isDisabled: boolean;
  // customers: CustomerResponse[];
  // sites: SiteResponse[];
  // cameras: CameraResponse[];
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

export default interface CameraRequest {
  cameraId?: string;
  cameraAliases: string;
  cameraIp?: string;
  emailId: string;
  totalRequest: number;
  smtpUserName: string;
  smtpPassword: string;
}

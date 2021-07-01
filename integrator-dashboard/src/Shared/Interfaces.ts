export interface Alert {
  open: boolean;
  message: string;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}

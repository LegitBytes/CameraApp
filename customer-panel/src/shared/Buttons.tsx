import React from "react";
import { Button, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

interface ButtonsProps {
  type: "dark" | "danger" | "primary" | "success";
  size?: "large" | "medium" | "small";
  onClick?: (e: any) => void;
  href?: string;
  variant: "contained" | "outlined" | "text";
  margin?: number | undefined;
  fullWidth?: boolean;
  htmlType?: "submit" | "button";
}

const useButtonStyles = (
  margin: number | undefined
): ClassNameMap<"dark" | "danger" | "primary" | "success"> => {
  const useStyles = makeStyles<Theme>((theme: Theme) => ({
    dark: {
      background: "#676767",
      color: "#fff",
      margin: margin ? margin : 5,
    },
    danger: {
      background: "#DC3545",
      color: "#fff",
      margin: margin ? margin : 5,
    },
    primary: {
      background: "#0079FE",
      color: "#fff",
      margin: margin ? margin : 5,
    },
    success: {
      background: "#28A745",
      color: "#fff",
      margin: margin ? margin : 5,
    },
  }));
  const classes = useStyles();
  return classes;
};

const Buttons: React.FC<ButtonsProps> = ({
  type,
  size,
  children,
  onClick,
  variant,
  margin,
  fullWidth,
  htmlType,
  href
}) => {
  const classes: ClassNameMap<"dark" | "danger" | "primary" | "success"> =
    useButtonStyles(margin);

  return (
    <Button
      type={htmlType ? htmlType : "button"}
      variant={variant}
      className={classes[type]}
      size={size}
      onClick={onClick}
      fullWidth={fullWidth}
      href={href}
    >
      {children}
    </Button>
  );
};

export default Buttons;

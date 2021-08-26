import React from "react";
import { Button, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

interface ButtonsProps {
  type: "dark" | "danger" | "primary" | "success";
  size?: "large" | "medium" | "small";
  onClick?: () => void;
  href?: string;
  variant: "contained" | "outlined" | "text";
  margin?: number | undefined;
  fullWidth?: boolean;
  htmlType?: "submit" | "button";
  disabled?: boolean;
}

const useButtonStyles = (
  margin: number | undefined
): ClassNameMap<"dark" | "danger" | "primary" | "success"> => {
  const useStyles = makeStyles<Theme>((theme: Theme) => ({
    dark: {
      background: "#676767",
      color: "#fff",
      margin: margin ? margin : 5,
      "&:hover": {
        background: "#676767",
        color: "#fff",
      },
    },
    danger: {
      background: "#F11D05",
      color: "#fff",
      margin: margin ? margin : 5,
      "&:hover": {
        background: "#F11D05",
        color: "#fff",
      },
    },
    primary: {
      background: "#007BFF",
      color: "#fff",
      margin: margin ? margin : 5,
      "&:hover": {
        background: "#007BFF",
        color: "#fff",
      },
    },
    success: {
      background: "#29a329",
      color: "#fff",
      margin: margin ? margin : 5,
      "&:hover": {
        background: "#29a329",
        color: "#fff",
      },
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
  disabled,
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
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default Buttons;

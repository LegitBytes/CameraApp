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
  fullWidth?: boolean
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
      background: "#F11D05",
      color: "#fff",
      margin: margin ? margin : 5,
    },
    primary: {
      background: "#007BFF",
      color: "#fff",
      margin: margin ? margin : 5,
    },
    success: {
      background: "#29a329",
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
  fullWidth
}) => {
  const classes: ClassNameMap<"dark" | "danger" | "primary" | "success"> =
    useButtonStyles(margin);

  return (
    <Button
      variant={variant}
      className={classes[type]}
      size={size}
      onClick={onClick}
      fullWidth={fullWidth}
    >
      {children}
    </Button>
  );
};

export default Buttons;

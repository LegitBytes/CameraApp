import React from "react";
import { Button, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

interface ButtonsProps {
  type: "dark" | "danger" | "primary";
  size?: "large" | "medium" | "small";
  onClick?: () => void;
  href?: string;
  variant: "contained" | "outlined" | "text"
  margin?: number | undefined
}

const useButtonStyles = (margin: number | undefined): ClassNameMap<"dark" | "danger" | "primary"> => {
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
  }));
  const classes = useStyles();
  return classes;
};

const Buttons: React.FC<ButtonsProps> = ({ type, size, children, onClick, variant, margin }) => {
  const classes: ClassNameMap<"dark" | "danger" | "primary"> =
    useButtonStyles(margin);

  return (
    <Button variant={variant} className={classes[type]} size={size} onClick={onClick}>
      {children}
    </Button>
  );
};

export default Buttons;

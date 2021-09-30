import React, { useRef } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
import { ClassNameMap } from "@material-ui/styles";
const useCopyAbleStyles = (): ClassNameMap<"root" | "input"> => {
  const useStyles = makeStyles<Theme>((theme: Theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
    },
    input: {
      background: "#dce0e0e0", 
      border: "none",
      padding: 5,
      fontSize: 14,
    },
  }));
  const classes = useStyles();
  return classes;
};

interface CopyAbleProps {
  text: string;
  handleOpen: (
    horizontal: "left" | "center" | "right",
    vertical: "top" | "bottom",
    message: string
  ) => void;
}

const CopyAble: React.FC<CopyAbleProps> = ({ text, handleOpen }) => {
  const classes: ClassNameMap<"root" | "input"> = useCopyAbleStyles();

  const ref = useRef<HTMLInputElement>(null);

  const onClick = (): void => {
    ref.current?.select();
    document.execCommand("copy");
    handleOpen("right", "bottom", "Copied!");
  };

  return (
    <div className={classes.root}>
      <input
        type="text"
        value={text}
        ref={ref}
        readOnly
        className={classes.input}
      />

      <IconButton size="small" onClick={onClick}>
        <FileCopy fontSize="small" />
      </IconButton>
    </div>
  );
};

export default CopyAble;

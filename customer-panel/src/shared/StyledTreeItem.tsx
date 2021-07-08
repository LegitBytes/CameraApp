import React, { useState } from "react";
import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
// type component = "customers" | "sites" | "camera"
interface StyledTreeItemProps {
  nodeId: string;
  labelText: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
  labelIcon: JSX.Element;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexDirection: "row-reverse",
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0.5, 0),
    },
    labelText: {
      fontWeight: "inherit",
      color: "#fff",
      flexGrow: 1,
    },
  })
);

const StyledTreeItem: React.FC<StyledTreeItemProps> = ({
  nodeId,
  labelText,
  onClick,
  onDoubleClick,
  labelIcon,
  ...others
}) => {
  const classes = useStyles();
  const [ visible, setVisible ] = useState<boolean>(false)
  return (
    <TreeItem
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      label={
        <div className={classes.labelRoot}>
          {visible && labelIcon}
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
        </div>
      }
      nodeId={nodeId}
      classes={{
        content: classes.content,
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      {...others}
    />
  );
};

export default StyledTreeItem;

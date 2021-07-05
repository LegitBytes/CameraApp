import React from "react";
import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import { TreeItem } from "@material-ui/lab";
interface StyledTreeItemProps {
  nodeId: string;
  labelText: string;
  onClick?: () => void
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
    labelIcon: {
      marginRight: theme.spacing(1),
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
  ...others
}) => {
  const classes = useStyles();
  return (
    <TreeItem 
      label={
        <div className={classes.labelRoot}>
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
      {...others}
    />
  );
};

export default StyledTreeItem;

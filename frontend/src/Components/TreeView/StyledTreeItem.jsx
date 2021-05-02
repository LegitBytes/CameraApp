import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { TreeItem } from "@material-ui/lab";
import { Typography } from "@material-ui/core"

const useTreeItemStyles = makeStyles(theme => ({
    content: {
      flexDirection: "row-reverse",
      color: "#fff"
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0.5, 0),
    },
    labelText: { 
      fontWeight: "inherit",
      flexGrow: 1,
    }
  }));
  
 const StyledTreeItem = (props) => {
    const classes = useTreeItemStyles();
    const { labelText, ...other } = props;
  
    return (
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            <Typography variant="body1" className={classes.labelText}>
              {labelText}
            </Typography>
          </div>
        }
        classes={{
          content: classes.content
        }}
        {...other}
      />
    );
  }


export default StyledTreeItem;
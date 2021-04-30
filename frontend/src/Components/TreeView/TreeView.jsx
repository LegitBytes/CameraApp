import React from "react";
import { ExpandMore, ChevronLeft } from "@material-ui/icons"
import { TreeView} from "@material-ui/lab";
import { data } from "../../Data/TreeViewData"
import { makeStyles } from "@material-ui/core/styles";

import StyledTreeItem from "./StyledTreeItem"

const useStyles = makeStyles(theme => ({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 230
  }
}));



export default function RecursiveTreeView() {
  const classes = useStyles();

  const renderTree = (nodes) => (
    <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMore />}
      defaultExpanded={["root1", "root2", "root3"]}
      defaultExpandIcon={<ChevronLeft />}
    >
      {data.map((datum) => renderTree(datum))}
    </TreeView>
  );
}

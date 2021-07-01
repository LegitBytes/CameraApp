import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Paper } from "@material-ui/core"
import { ReactElement } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Paper >{children}</Paper>}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appbarStyles: {
    background: "#007BFF",
  },
}));

interface SimpleTabsProps {
  activeRecords: ReactElement<any, any> | null;
  inactiveRecords: ReactElement<any, any> | null;
}

export default function SimpleTabs(props: SimpleTabsProps) {
  const { activeRecords, inactiveRecords } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbarStyles}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Active Records" />
          <Tab label="Inactive Records" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {activeRecords}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {inactiveRecords}
      </TabPanel>
    </div>
  );
}

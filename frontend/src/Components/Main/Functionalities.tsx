import React from "react";
import AlertComp from "../../Shared/Alert";
import ButtonComp from "../../Shared/Buttons";
import LoadingScreen from "../../Shared/LoadingScreen";
import Table from "../../Shared/Table/Table";
import { Grid } from "@material-ui/core";
import { Alert } from "../../Shared/Interfaces";
import {
  Camera,
  Columns,
  Customer,
  FormattedCamera,
  Site,
  rows,
  FormattedSite,
  FormattedCustomer,
  User,
  FormattedUser,
  FormattedGroup,
  Group,
} from "../Interfaces";
import { TransitionProps } from "../../Shared/Slides";
import SimpleTabs from "../../Shared/SimpleTabs";

export type args = Camera[] | Site[] | Customer[] | User[] | Group[];
export type retVal =
  | FormattedCamera[]
  | FormattedSite[]
  | FormattedCustomer[]
  | FormattedUser[]
  | FormattedGroup[];

interface FunctionalitiesProps {
  loading: boolean;
  alertDetails: Alert;
  columns: Columns[];
  activeData: args;
  inactiveData: args;
  formatData: (data: args, isActive: boolean) => retVal;
  onRowsDelete: (rows: rows) => false;
  handleClose: () => void;
  transition: React.ComponentType<TransitionProps> | undefined;
  title: string;
}

const Functionalities: React.FC<FunctionalitiesProps> = ({
  loading,
  alertDetails,
  columns,
  activeData,
  inactiveData,
  formatData,
  onRowsDelete,
  transition,
  handleClose,
  title,
}) => {
  return (
    <>
      <Grid container direction="row" justify="flex-end">
        <Grid item xs={false} sm={6} md={8} />
        {/* <Grid item xs={6} sm={3} md={2} style={{ marginTop: 80 }}>
          <ButtonComp
            type="primary"
            variant="contained"
            margin={0}
            size="large"
          >
            Download CSV
          </ButtonComp>
        </Grid>
        <Grid item xs={6} sm={3} md={2} style={{ marginTop: 80 }}>
          <ButtonComp
            type="primary"
            variant="contained"
            margin={0}
            size="large"
          >
            Add new Camera
          </ButtonComp>
        </Grid> */}
        <div style={{ marginTop: 80 }}>
          <ButtonComp
            type="primary"
            variant="contained"
            margin={10}
            size="large"
          >
            Download CSV
          </ButtonComp>
          <ButtonComp
            type="primary"
            variant="contained"
            margin={10}
            size="large"
          >
            Add new {title.substr(0, title.length - 1)}
          </ButtonComp>
        </div>
      </Grid>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div style={{ margin: 20, height: "100%" }}>
          <SimpleTabs
            activeRecords={
              <Table
                data={formatData(activeData, true)}
                columns={columns}
                title={"Active " + title}
                onRowsDelete={onRowsDelete}
              />
            }
            inactiveRecords={
              <Table
                data={formatData(inactiveData, false)}
                columns={columns}
                title={"Inactive " + title}
                onRowsDelete={onRowsDelete}
              />
            }
          />
        </div>
      )}
      <AlertComp
        open={alertDetails.open}
        vertical={alertDetails.vertical}
        horizontal={alertDetails.horizontal}
        transition={transition}
        message={alertDetails.message}
        handleClose={handleClose}
      />
    </>
  );
};

export default Functionalities;

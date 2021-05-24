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
} from "../Interfaces";
import { TransitionProps } from "../../Shared/Slides";

export type args = Camera[] | Site[] | Customer[];
export type retVal = FormattedCamera[] | FormattedSite[] | FormattedCustomer[];

interface FunctionalitiesProps {
  loading: boolean;
  alertDetails: Alert;
  columns: Columns[];
  data: args;
  formatData: (data: args) => retVal;
  onRowsDelete: (rows: rows) => false;
  handleClose: () => void;
  transition: React.ComponentType<TransitionProps> | undefined;
  title: string
}

const Functionalities: React.FC<FunctionalitiesProps> = ({
  loading,
  alertDetails,
  columns,
  data,
  formatData,
  onRowsDelete,
  transition,
  handleClose,
  title
}) => {
  return (
    <>
      <Grid container direction="row" justify="flex-end">
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
            Add new Camera
          </ButtonComp>
        </div>
      </Grid>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div style={{ margin: 20, height: "100%" }}>
          <Table
            data={formatData(data)}
            columns={columns}
            title={title}
            onRowsDelete={onRowsDelete}
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

import React from "react";
import MUIDataTable from "mui-datatables";
import { Theme, ThemeProvider } from "@material-ui/core/styles";
import {
  Columns,
  FormattedCamera,
  FormattedCustomer,
  FormattedGroup,
  FormattedIntegrator,
  FormattedSite,
  FormattedUser,
  rows,
} from "../../Components/Interfaces";
import { getMuiTheme } from "./MuiOverrides";

export interface TableProps {
  data: FormattedCamera[] | FormattedSite[] | FormattedCustomer[] | FormattedUser[] | FormattedGroup[] | FormattedIntegrator[];
  columns: Columns[];
  title: string;
  onRowsDelete: (rows: rows) => void | false;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  title,
  onRowsDelete,
}) => {
  const theme: Theme = getMuiTheme();

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={{
          filter: true,
          filterType: "textField",
          print: false,
          download: false,
          draggableColumns: {
            enabled: true,
          },
          pagination: true,
          rowsPerPageOptions: [5, 10, 20],
          search: true,
          onRowsDelete: onRowsDelete,
        }}
      />
    </ThemeProvider>
  );
};

export default Table;

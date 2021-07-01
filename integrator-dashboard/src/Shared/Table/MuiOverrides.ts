import { createMuiTheme } from "@material-ui/core";

export const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {},
        paper: {
            boxShadow: "none",
          //   backgroundColor: "#dce0e0e0",
          //   boxShadow: "none",
          backgroundColor: "#fff",
          color: "#4D4C4C",
          padding: 10,
        },
      },
      MUIDataTableHeadRow: {
        root: {
          backgroundColor: "#28344B",
          color: "#fff",
        },
      },
      MUIDataTableHeadCell: {
        fixedHeader: {
          backgroundColor: "#28344B",
          color: "#fff",
          fontSize: 16,
          //   fontWeight: "bolder",
        },
        data: {
          color: "#fff",
          fontSize: 16,
          //   fontWeight: "bolder",
        },
        sortActive: {
          color: "#fff",
          fontSize: 16,
          //   fontWeight: "bolder",
        },
        contentWrapper: {
          display: "block",
        },
      },
      MUIDataTableSelectCell: {
        headerCell: {
          backgroundColor: "#28344B",
        },
      },
      MuiTableCell: {
        root: {
          textAlign: "center",
          padding: 5,
        },
        body: {
          color: "#6C757D",
          fontSize: "1rem",
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: "0.00938em",
        },
      },
      MUIDataTableToolbar: {
        titleText: {
          color: "#6C757D",
          fontSize: 24,
        },
      },
    },
  });
